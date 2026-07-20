'use client';

import { useAuthStore } from '@/stores/auth';

export class ApiRequestError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly code?: string,
  ) {
    super(message);
  }
}

interface ApiOptions {
  method?: 'GET' | 'POST';
  body?: unknown;
  auth?: boolean;
}

async function rawRequest<T>(
  path: string,
  options: ApiOptions,
  accessToken: string | null,
): Promise<T> {
  const res = await fetch(path, {
    method: options.method ?? 'GET',
    headers: {
      ...(options.body !== undefined ? { 'Content-Type': 'application/json' } : {}),
      ...(options.auth && accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
    credentials: 'include',
  });

  if (res.status === 204) return undefined as T;
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new ApiRequestError(
      res.status,
      data?.error?.message ?? 'Request failed',
      data?.error?.code,
    );
  }
  return data as T;
}

/**
 * API client with automatic access-token refresh: on a 401 for an
 * authenticated call, attempt POST /api/v1/auth/refresh once, then retry.
 */
export async function api<T>(path: string, options: ApiOptions = {}): Promise<T> {
  const store = useAuthStore.getState();
  try {
    return await rawRequest<T>(path, options, store.accessToken);
  } catch (err) {
    if (!(err instanceof ApiRequestError) || err.status !== 401 || !options.auth) throw err;
    const refreshed = await tryRefresh();
    if (!refreshed) throw err;
    return rawRequest<T>(path, options, useAuthStore.getState().accessToken);
  }
}

export async function tryRefresh(): Promise<boolean> {
  try {
    const data = await rawRequest<{ user: import('@/stores/auth').AuthUser; accessToken: string }>(
      '/api/v1/auth/refresh',
      { method: 'POST' },
      null,
    );
    useAuthStore.getState().setAuth(data.user, data.accessToken);
    return true;
  } catch {
    useAuthStore.getState().clearAuth();
    return false;
  }
}
