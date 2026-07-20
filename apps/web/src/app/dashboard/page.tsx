'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api, tryRefresh } from '@/lib/api';
import { useAuthStore } from '@/stores/auth';

export default function DashboardPage() {
  const router = useRouter();
  const { user, accessToken, clearAuth } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function ensureSession() {
      if (!useAuthStore.getState().accessToken) {
        const ok = await tryRefresh();
        if (!ok) {
          router.replace('/login');
          return;
        }
      }
      setLoading(false);
    }
    void ensureSession();
  }, [router]);

  async function handleLogout() {
    await api('/api/v1/auth/logout', { method: 'POST' }).catch(() => undefined);
    clearAuth();
    router.replace('/login');
  }

  if (loading || !accessToken) {
    return (
      <main className="flex min-h-screen items-center justify-center text-zinc-400">Loading…</main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-900"
        >
          Sign out
        </button>
      </div>
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6">
        <p className="mb-1 text-lg">Welcome, {user?.name} 👋</p>
        <p className="text-sm text-zinc-400">{user?.email}</p>
        {!user?.emailVerified && (
          <p className="mt-4 rounded-lg border border-amber-900 bg-amber-950/40 p-3 text-sm text-amber-300">
            Your email is not verified yet. Check your inbox for the verification link.
          </p>
        )}
      </div>
    </main>
  );
}
