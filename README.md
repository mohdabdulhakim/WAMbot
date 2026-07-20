# WAMbot

WhatsApp AI Automation Platform — monorepo.

## Structure

- `apps/api` — Express + TypeScript backend (port 4000)
- `apps/web` — Next.js + TypeScript frontend (port 3000)
- `docs/` — product and architecture documentation (source of truth)

## Getting Started

Requires Node.js >= 22 and PostgreSQL 16.

```bash
createdb wambot_dev   # or create a database and set DATABASE_URL accordingly
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
npm install
npm run db:migrate -w @wambot/api
npm run dev
```

- Frontend: http://localhost:3000
- API health: http://localhost:3000/api/health (proxied) or http://localhost:4000/api/health

## Scripts

- `npm run dev` — start both apps in watch mode
- `npm run db:migrate -w @wambot/api` — apply pending SQL migrations
- `npm run build` — build both apps
- `npm run lint` / `npm run typecheck` / `npm run format` — quality checks
