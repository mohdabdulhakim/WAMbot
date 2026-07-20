-- Sprint 2: authentication schema
-- Conventions per docs/05_Database_Design.md: snake_case, plural tables,
-- created_at/updated_at, soft delete via deleted_at.

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TYPE user_status AS ENUM ('active', 'suspended');
CREATE TYPE auth_token_type AS ENUM ('email_verification', 'password_reset');

CREATE TABLE users (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name              text NOT NULL,
  email             text NOT NULL UNIQUE,
  password_hash     text NOT NULL,
  status            user_status NOT NULL DEFAULT 'active',
  email_verified_at timestamptz,
  last_login_at     timestamptz,
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now(),
  deleted_at        timestamptz
);

CREATE TABLE sessions (
  id                 uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id            uuid NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  refresh_token_hash text NOT NULL UNIQUE,
  user_agent         text,
  ip_address         text,
  expires_at         timestamptz NOT NULL,
  revoked_at         timestamptz,
  last_used_at       timestamptz,
  created_at         timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX sessions_user_id_idx ON sessions (user_id);

CREATE TABLE auth_tokens (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    uuid NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  type       auth_token_type NOT NULL,
  token_hash text NOT NULL UNIQUE,
  expires_at timestamptz NOT NULL,
  used_at    timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX auth_tokens_user_id_type_idx ON auth_tokens (user_id, type);
