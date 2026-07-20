import { pool } from '../../db/pool.js';

export type AuthTokenType = 'email_verification' | 'password_reset';

export interface Session {
  id: string;
  userId: string;
  refreshTokenHash: string;
  expiresAt: Date;
  revokedAt: Date | null;
}

export class AuthRepository {
  async createSession(input: {
    userId: string;
    refreshTokenHash: string;
    userAgent: string | null;
    ipAddress: string | null;
    expiresAt: Date;
  }): Promise<void> {
    await pool.query(
      `INSERT INTO sessions (user_id, refresh_token_hash, user_agent, ip_address, expires_at)
       VALUES ($1, $2, $3, $4, $5)`,
      [input.userId, input.refreshTokenHash, input.userAgent, input.ipAddress, input.expiresAt],
    );
  }

  async findSessionByTokenHash(refreshTokenHash: string): Promise<Session | null> {
    const { rows } = await pool.query(
      `SELECT id, user_id, refresh_token_hash, expires_at, revoked_at
       FROM sessions WHERE refresh_token_hash = $1`,
      [refreshTokenHash],
    );
    const row = rows[0];
    if (!row) return null;
    return {
      id: row.id,
      userId: row.user_id,
      refreshTokenHash: row.refresh_token_hash,
      expiresAt: row.expires_at,
      revokedAt: row.revoked_at,
    };
  }

  /** Rotation: revoke the old session and create the replacement atomically. */
  async rotateSession(
    oldSessionId: string,
    input: {
      userId: string;
      refreshTokenHash: string;
      userAgent: string | null;
      ipAddress: string | null;
      expiresAt: Date;
    },
  ): Promise<void> {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      await client.query(`UPDATE sessions SET revoked_at = now(), last_used_at = now() WHERE id = $1`, [
        oldSessionId,
      ]);
      await client.query(
        `INSERT INTO sessions (user_id, refresh_token_hash, user_agent, ip_address, expires_at)
         VALUES ($1, $2, $3, $4, $5)`,
        [input.userId, input.refreshTokenHash, input.userAgent, input.ipAddress, input.expiresAt],
      );
      await client.query('COMMIT');
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  }

  async revokeSession(id: string): Promise<void> {
    await pool.query(`UPDATE sessions SET revoked_at = now() WHERE id = $1 AND revoked_at IS NULL`, [id]);
  }

  async revokeAllSessionsForUser(userId: string): Promise<void> {
    await pool.query(`UPDATE sessions SET revoked_at = now() WHERE user_id = $1 AND revoked_at IS NULL`, [
      userId,
    ]);
  }

  async createAuthToken(input: {
    userId: string;
    type: AuthTokenType;
    tokenHash: string;
    expiresAt: Date;
  }): Promise<void> {
    await pool.query(
      `INSERT INTO auth_tokens (user_id, type, token_hash, expires_at)
       VALUES ($1, $2, $3, $4)`,
      [input.userId, input.type, input.tokenHash, input.expiresAt],
    );
  }

  /** Atomically consumes a valid, unused, unexpired token. Returns the user id, or null. */
  async consumeAuthToken(tokenHash: string, type: AuthTokenType): Promise<string | null> {
    const { rows } = await pool.query(
      `UPDATE auth_tokens SET used_at = now()
       WHERE token_hash = $1 AND type = $2 AND used_at IS NULL AND expires_at > now()
       RETURNING user_id`,
      [tokenHash, type],
    );
    return rows[0]?.user_id ?? null;
  }
}

export const authRepository = new AuthRepository();
