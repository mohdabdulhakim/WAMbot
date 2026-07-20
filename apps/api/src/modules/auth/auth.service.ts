import bcrypt from 'bcrypt';
import { env } from '../../config/env.js';
import { ApiError } from '../../lib/errors.js';
import { generateOpaqueToken, hashToken, signAccessToken } from '../../lib/tokens.js';
import { mailer } from '../../mailer/mailer.js';
import { userRepository } from '../user/user.repository.js';
import { toPublicUser, type PublicUser } from '../user/user.types.js';
import { authRepository } from './auth.repository.js';
import type { LoginInput, RegisterInput } from './auth.validators.js';

const BCRYPT_ROUNDS = 12;
const EMAIL_VERIFICATION_TTL_HOURS = 24;
const PASSWORD_RESET_TTL_MINUTES = 30;

export interface ClientContext {
  userAgent: string | null;
  ipAddress: string | null;
}

export interface AuthResult {
  user: PublicUser;
  accessToken: string;
  refreshToken: string;
  refreshTokenExpiresAt: Date;
}

function refreshExpiry(): Date {
  return new Date(Date.now() + env.refreshTokenTtlDays * 24 * 60 * 60 * 1000);
}

export class AuthService {
  async register(input: RegisterInput, ctx: ClientContext): Promise<AuthResult> {
    const existing = await userRepository.findByEmail(input.email);
    if (existing) throw ApiError.conflict('An account with this email already exists', 'email_taken');

    const passwordHash = await bcrypt.hash(input.password, BCRYPT_ROUNDS);
    const user = await userRepository.create({ name: input.name, email: input.email, passwordHash });

    await this.sendVerificationEmail(user.id, user.email);
    return this.issueSession(user.id, ctx, toPublicUser(user));
  }

  async login(input: LoginInput, ctx: ClientContext): Promise<AuthResult> {
    const user = await userRepository.findByEmail(input.email);
    // Same error for unknown email and wrong password: no account enumeration.
    const invalid = ApiError.unauthorized('Invalid email or password', 'invalid_credentials');
    if (!user) throw invalid;
    const ok = await bcrypt.compare(input.password, user.passwordHash);
    if (!ok) throw invalid;
    if (user.status !== 'active') throw ApiError.forbidden('Account is suspended', 'account_suspended');

    await userRepository.updateLastLogin(user.id);
    return this.issueSession(user.id, ctx, toPublicUser(user));
  }

  async refresh(rawRefreshToken: string, ctx: ClientContext): Promise<AuthResult> {
    const session = await authRepository.findSessionByTokenHash(hashToken(rawRefreshToken));
    const invalid = ApiError.unauthorized('Invalid refresh token', 'refresh_invalid');
    if (!session) throw invalid;
    if (session.revokedAt) {
      // Reuse of a rotated token: treat as compromise, revoke everything.
      await authRepository.revokeAllSessionsForUser(session.userId);
      throw invalid;
    }
    if (session.expiresAt.getTime() <= Date.now()) throw invalid;

    const user = await userRepository.findById(session.userId);
    if (!user || user.status !== 'active') throw invalid;

    const next = generateOpaqueToken();
    const expiresAt = refreshExpiry();
    await authRepository.rotateSession(session.id, {
      userId: user.id,
      refreshTokenHash: next.hash,
      userAgent: ctx.userAgent,
      ipAddress: ctx.ipAddress,
      expiresAt,
    });

    return {
      user: toPublicUser(user),
      accessToken: signAccessToken(user.id),
      refreshToken: next.raw,
      refreshTokenExpiresAt: expiresAt,
    };
  }

  async logout(rawRefreshToken: string | null): Promise<void> {
    if (!rawRefreshToken) return;
    const session = await authRepository.findSessionByTokenHash(hashToken(rawRefreshToken));
    if (session) await authRepository.revokeSession(session.id);
  }

  async me(userId: string): Promise<PublicUser> {
    const user = await userRepository.findById(userId);
    if (!user) throw ApiError.unauthorized('User not found', 'user_not_found');
    return toPublicUser(user);
  }

  async verifyEmail(rawToken: string): Promise<void> {
    const userId = await authRepository.consumeAuthToken(hashToken(rawToken), 'email_verification');
    if (!userId) throw ApiError.badRequest('Invalid or expired verification link', 'token_invalid');
    await userRepository.markEmailVerified(userId);
  }

  async forgotPassword(email: string): Promise<void> {
    const user = await userRepository.findByEmail(email);
    // Always succeed from the caller's perspective: no account enumeration.
    if (!user) return;

    const { raw, hash } = generateOpaqueToken();
    await authRepository.createAuthToken({
      userId: user.id,
      type: 'password_reset',
      tokenHash: hash,
      expiresAt: new Date(Date.now() + PASSWORD_RESET_TTL_MINUTES * 60 * 1000),
    });
    await mailer.send({
      to: user.email,
      subject: 'Reset your WAMbot password',
      text: `Reset your password: ${env.appUrl}/reset-password?token=${raw}\nThis link expires in ${PASSWORD_RESET_TTL_MINUTES} minutes. If you did not request this, you can ignore this email.`,
    });
  }

  async resetPassword(rawToken: string, newPassword: string): Promise<void> {
    const userId = await authRepository.consumeAuthToken(hashToken(rawToken), 'password_reset');
    if (!userId) throw ApiError.badRequest('Invalid or expired reset link', 'token_invalid');

    const passwordHash = await bcrypt.hash(newPassword, BCRYPT_ROUNDS);
    await userRepository.updatePassword(userId, passwordHash);
    // Force re-login everywhere after a password change.
    await authRepository.revokeAllSessionsForUser(userId);
  }

  private async sendVerificationEmail(userId: string, email: string): Promise<void> {
    const { raw, hash } = generateOpaqueToken();
    await authRepository.createAuthToken({
      userId,
      type: 'email_verification',
      tokenHash: hash,
      expiresAt: new Date(Date.now() + EMAIL_VERIFICATION_TTL_HOURS * 60 * 60 * 1000),
    });
    await mailer.send({
      to: email,
      subject: 'Verify your WAMbot email',
      text: `Welcome to WAMbot! Verify your email: ${env.appUrl}/verify-email?token=${raw}\nThis link expires in ${EMAIL_VERIFICATION_TTL_HOURS} hours.`,
    });
  }

  private async issueSession(
    userId: string,
    ctx: ClientContext,
    user: PublicUser,
  ): Promise<AuthResult> {
    const { raw, hash } = generateOpaqueToken();
    const expiresAt = refreshExpiry();
    await authRepository.createSession({
      userId,
      refreshTokenHash: hash,
      userAgent: ctx.userAgent,
      ipAddress: ctx.ipAddress,
      expiresAt,
    });
    return {
      user,
      accessToken: signAccessToken(userId),
      refreshToken: raw,
      refreshTokenExpiresAt: expiresAt,
    };
  }
}

export const authService = new AuthService();
