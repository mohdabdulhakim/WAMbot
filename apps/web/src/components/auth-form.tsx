'use client';

import type { ReactNode } from 'react';

export function AuthCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-sm rounded-xl border border-zinc-800 bg-zinc-900/60 p-8">
        <h1 className="mb-6 text-center text-2xl font-bold tracking-tight">{title}</h1>
        {children}
      </div>
    </main>
  );
}

export function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="mb-4 block">
      <span className="mb-1 block text-sm text-zinc-400">{label}</span>
      {children}
      {error ? <span className="mt-1 block text-sm text-red-400">{error}</span> : null}
    </label>
  );
}

export const inputClass =
  'w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100 outline-none focus:border-zinc-400';

export const buttonClass =
  'w-full rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-500 disabled:opacity-50';

export function FormError({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <p className="mb-4 rounded-lg border border-red-900 bg-red-950/50 p-3 text-sm text-red-300">
      {message}
    </p>
  );
}
