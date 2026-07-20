import { pool } from '../../db/pool.js';
import type { User } from './user.types.js';

interface UserRow {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  status: User['status'];
  email_verified_at: Date | null;
  last_login_at: Date | null;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

function toUser(row: UserRow): User {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    passwordHash: row.password_hash,
    status: row.status,
    emailVerifiedAt: row.email_verified_at,
    lastLoginAt: row.last_login_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    deletedAt: row.deleted_at,
  };
}

export class UserRepository {
  async create(input: { name: string; email: string; passwordHash: string }): Promise<User> {
    const { rows } = await pool.query<UserRow>(
      `INSERT INTO users (name, email, password_hash)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [input.name, input.email, input.passwordHash],
    );
    return toUser(rows[0]);
  }

  async findByEmail(email: string): Promise<User | null> {
    const { rows } = await pool.query<UserRow>(
      `SELECT * FROM users WHERE email = $1 AND deleted_at IS NULL`,
      [email],
    );
    return rows[0] ? toUser(rows[0]) : null;
  }

  async findById(id: string): Promise<User | null> {
    const { rows } = await pool.query<UserRow>(
      `SELECT * FROM users WHERE id = $1 AND deleted_at IS NULL`,
      [id],
    );
    return rows[0] ? toUser(rows[0]) : null;
  }

  async markEmailVerified(id: string): Promise<void> {
    await pool.query(
      `UPDATE users SET email_verified_at = now(), updated_at = now() WHERE id = $1`,
      [id],
    );
  }

  async updateLastLogin(id: string): Promise<void> {
    await pool.query(`UPDATE users SET last_login_at = now(), updated_at = now() WHERE id = $1`, [
      id,
    ]);
  }

  async updatePassword(id: string, passwordHash: string): Promise<void> {
    await pool.query(`UPDATE users SET password_hash = $2, updated_at = now() WHERE id = $1`, [
      id,
      passwordHash,
    ]);
  }
}

export const userRepository = new UserRepository();
