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
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'At least 8 characters'),
});
type FormValues = z.infer<typeof schema>;

export default function RegisterPage() {
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
      const data = await api<{ user: AuthUser; accessToken: string }>('/api/v1/auth/register', {
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
    <AuthCard title="Create your account">
      <FormError message={serverError} />
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Field label="Name" error={errors.name?.message}>
          <input className={inputClass} type="text" autoComplete="name" {...register('name')} />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <input className={inputClass} type="email" autoComplete="email" {...register('email')} />
        </Field>
        <Field label="Password" error={errors.password?.message}>
          <input
            className={inputClass}
            type="password"
            autoComplete="new-password"
            {...register('password')}
          />
        </Field>
        <button className={buttonClass} type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating account…' : 'Sign up'}
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-zinc-400">
        Already have an account?{' '}
        <Link className="text-emerald-400 hover:underline" href="/login">
          Sign in
        </Link>
      </p>
    </AuthCard>
  );
}
