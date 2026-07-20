'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { api, ApiRequestError } from '@/lib/api';
import { AuthCard } from '@/components/auth-form';

type Status = 'verifying' | 'success' | 'error';

function VerifyEmail() {
  const token = useSearchParams().get('token') ?? '';
  const [status, setStatus] = useState<Status>('verifying');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('This verification link is invalid or incomplete.');
      return;
    }
    api('/api/v1/auth/verify-email', { method: 'POST', body: { token } })
      .then(() => setStatus('success'))
      .catch((err) => {
        setStatus('error');
        setMessage(err instanceof ApiRequestError ? err.message : 'Something went wrong');
      });
  }, [token]);

  return (
    <div className="text-center text-zinc-300">
      {status === 'verifying' && <p>Verifying your email…</p>}
      {status === 'success' && (
        <>
          <p className="mb-4">Your email has been verified. 🎉</p>
          <Link className="text-emerald-400 hover:underline" href="/dashboard">
            Go to dashboard
          </Link>
        </>
      )}
      {status === 'error' && <p>{message}</p>}
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <AuthCard title="Email verification">
      <Suspense fallback={null}>
        <VerifyEmail />
      </Suspense>
    </AuthCard>
  );
}
