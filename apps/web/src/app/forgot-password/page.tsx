'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { api, ApiRequestError } from '@/lib/api';
import { AuthCard, Field, FormError, buttonClass, inputClass } from '@/components/auth-form';

const schema = z.object({ email: z.string().email('Invalid email address') });
type FormValues = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    setServerError(null);
    try {
      await api('/api/v1/auth/forgot-password', { method: 'POST', body: values });
      setSent(true);
    } catch (err) {
      setServerError(err instanceof ApiRequestError ? err.message : 'Something went wrong');
    }
  }

  return (
    <AuthCard title="Reset your password">
      {sent ? (
        <p className="text-center text-zinc-300">
          If that email exists, a reset link has been sent. Check your inbox.
        </p>
      ) : (
        <>
          <FormError message={serverError} />
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Field label="Email" error={errors.email?.message}>
              <input
                className={inputClass}
                type="email"
                autoComplete="email"
                {...register('email')}
              />
            </Field>
            <button className={buttonClass} type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending…' : 'Send reset link'}
            </button>
          </form>
        </>
      )}
      <p className="mt-4 text-center text-sm text-zinc-400">
        <Link className="text-emerald-400 hover:underline" href="/login">
          Back to sign in
        </Link>
      </p>
    </AuthCard>
  );
}
