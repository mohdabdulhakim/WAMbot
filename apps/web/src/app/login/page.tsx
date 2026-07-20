'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { api, ApiRequestError } from '@/lib/api';
import { useAuthStore, type AuthUser } from '@/stores/auth';
import { AuthCard, Field, FormError, buttonClass, inputClass } from '@/components/auth-form';

const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});
type FormValues = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    setServerError(null);
    try {
      const data = await api<{ user: AuthUser; accessToken: string }>('/api/v1/auth/login', {
        method: 'POST',
        body: values,
      });
      setAuth(data.user, data.accessToken);
      router.push('/dashboard');
    } catch (err) {
      setServerError(err instanceof ApiRequestError ? err.message : 'Something went wrong');
    }
  }

  return (
    <AuthCard title="Sign in to WAMbot">
      <FormError message={serverError} />
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Field label="Email" error={errors.email?.message}>
          <input className={inputClass} type="email" autoComplete="email" {...register('email')} />
        </Field>
        <Field label="Password" error={errors.password?.message}>
          <input
            className={inputClass}
            type="password"
            autoComplete="current-password"
            {...register('password')}
          />
        </Field>
        <button className={buttonClass} type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-zinc-400">
        <Link className="text-emerald-400 hover:underline" href="/forgot-password">
          Forgot password?
        </Link>
      </p>
      <p className="mt-2 text-center text-sm text-zinc-400">
        New to WAMbot?{' '}
        <Link className="text-emerald-400 hover:underline" href="/register">
          Create an account
        </Link>
      </p>
    </AuthCard>
  );
}
