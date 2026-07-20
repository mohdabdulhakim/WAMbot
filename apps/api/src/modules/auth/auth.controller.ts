import { Router, type Request, type Response } from 'express';
import { env } from '../../config/env.js';
import { requireAuth } from '../../middleware/auth.js';
import { validateBody } from '../../middleware/validate.js';
import { ApiError } from '../../lib/errors.js';
import { authService, type AuthResult, type ClientContext } from './auth.service.js';
import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  verifyEmailSchema,
} from './auth.validators.js';

export const REFRESH_COOKIE = 'wambot_refresh';
const REFRESH_COOKIE_PATH = '/api/v1/auth';

function clientContext(req: Request): ClientContext {
  return {
    userAgent: req.headers['user-agent'] ?? null,
    ipAddress: req.ip ?? null,
  };
}

function setRefreshCookie(res: Response, result: AuthResult) {
  res.cookie(REFRESH_COOKIE, result.refreshToken, {
    httpOnly: true,
    secure: env.isProduction,
    sameSite: 'lax',
    path: REFRESH_COOKIE_PATH,
    expires: result.refreshTokenExpiresAt,
  });
}

function clearRefreshCookie(res: Response) {
  res.clearCookie(REFRESH_COOKIE, { path: REFRESH_COOKIE_PATH });
}

function authResponse(result: AuthResult) {
  return { user: result.user, accessToken: result.accessToken };
}

export const authRouter = Router();

authRouter.post('/register', validateBody(registerSchema), async (req, res, next) => {
  try {
    const result = await authService.register(req.body, clientContext(req));
    setRefreshCookie(res, result);
    res.status(201).json(authResponse(result));
  } catch (err) {
    next(err);
  }
});

authRouter.post('/login', validateBody(loginSchema), async (req, res, next) => {
  try {
    const result = await authService.login(req.body, clientContext(req));
    setRefreshCookie(res, result);
    res.status(200).json(authResponse(result));
  } catch (err) {
    next(err);
  }
});

authRouter.post('/refresh', async (req, res, next) => {
  try {
    const raw: string | undefined = req.cookies?.[REFRESH_COOKIE];
    if (!raw) throw ApiError.unauthorized('Missing refresh token', 'refresh_missing');
    const result = await authService.refresh(raw, clientContext(req));
    setRefreshCookie(res, result);
    res.status(200).json(authResponse(result));
  } catch (err) {
    clearRefreshCookie(res);
    next(err);
  }
});

authRouter.post('/logout', async (req, res, next) => {
  try {
    await authService.logout(req.cookies?.[REFRESH_COOKIE] ?? null);
    clearRefreshCookie(res);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

authRouter.get('/me', requireAuth, async (req, res, next) => {
  try {
    const user = await authService.me(req.userId as string);
    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
});

authRouter.post('/verify-email', validateBody(verifyEmailSchema), async (req, res, next) => {
  try {
    await authService.verifyEmail(req.body.token);
    res.status(200).json({ message: 'Email verified' });
  } catch (err) {
    next(err);
  }
});

authRouter.post('/forgot-password', validateBody(forgotPasswordSchema), async (req, res, next) => {
  try {
    await authService.forgotPassword(req.body.email);
    res.status(200).json({ message: 'If that email exists, a reset link has been sent' });
  } catch (err) {
    next(err);
  }
});

authRouter.post('/reset-password', validateBody(resetPasswordSchema), async (req, res, next) => {
  try {
    await authService.resetPassword(req.body.token, req.body.password);
    res.status(200).json({ message: 'Password updated. Please sign in again.' });
  } catch (err) {
    next(err);
  }
});
