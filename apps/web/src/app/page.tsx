'use client';

import { useEffect, useState } from 'react';

type HealthState = 'checking' | 'ok' | 'error';

export default function HomePage() {
  const [health, setHealth] = useState<HealthState>('checking');

  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => setHealth(data.status === 'ok' ? 'ok' : 'error'))
      .catch(() => setHealth('error'));
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-4xl font-bold tracking-tight">WAMbot</h1>
      <p className="text-zinc-400">WhatsApp AI Automation Platform</p>
      <div className="flex gap-3">
        <a
          href="/login"
          className="rounded-lg bg-emerald-600 px-5 py-2 font-medium text-white hover:bg-emerald-500"
        >
          Sign in
        </a>
        <a
          href="/register"
          className="rounded-lg border border-zinc-700 px-5 py-2 text-zinc-300 hover:bg-zinc-900"
        >
          Create account
        </a>
      </div>
      <div className="flex items-center gap-2 rounded-full border border-zinc-800 px-4 py-2 text-sm">
        <span
          className={
            health === 'ok'
              ? 'h-2 w-2 rounded-full bg-emerald-500'
              : health === 'error'
                ? 'h-2 w-2 rounded-full bg-red-500'
                : 'h-2 w-2 animate-pulse rounded-full bg-zinc-500'
          }
        />
        <span className="text-zinc-300">
          API: {health === 'checking' ? 'checking…' : health === 'ok' ? 'connected' : 'unreachable'}
        </span>
      </div>
    </main>
  );
}
