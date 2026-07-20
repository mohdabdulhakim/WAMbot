'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { api, ApiRequestError } from '@/lib/api';
import { AuthCard, Field, FormError, buttonClass, inputClass } from '@/components/auth-form';

const schema = z.object({ password: z.string().min(8, 'At least 8 characters') });
type FormValues = z.infer<typeof schema>;

function ResetPasswordForm() {
  const router = useRouter();
  const token = useSearchParams().get('token') ?? '';
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    setServerError(null);
    try {
      await api('/api/v1/auth/reset-password', {
        method: 'POST',
        body: { token, password: values.password },
      });
      router.push('/login');
    } catch (err) {
      setServerError(err instanceof ApiRequestError ? err.message : 'Something went wrong');
    }
  }

  if (!token) {
    return <p className="text-center text-zinc-300">This reset link is invalid or incomplete.</p>;
  }

  return (
    <>
      <FormError message={serverError} />
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Field label="New password" error={errors.password?.message}>
          <input
            className={inputClass}
            type="password"
            autoComplete="new-password"
            {...register('password')}
          />
        </Field>
        <button className={buttonClass} type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Updating…' : 'Set new password'}
        </button>
      </form>
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <AuthCard title="Choose a new password">
      <Suspense fallback={null}>
        <ResetPasswordForm />
      </Suspense>
    </AuthCard>
  );
}
