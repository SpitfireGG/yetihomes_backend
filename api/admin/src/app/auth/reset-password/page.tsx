'use client';

import React, { Suspense, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Eye, EyeOff, Loader2, ArrowRight, CheckCircle } from 'lucide-react';
import { API_KEY, API_URL } from '@/utils/main';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

const ResetPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const missingToken = !token;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
        },
        body: JSON.stringify({ token, password }),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result?.message || 'Request failed');

      setSuccess(true);
      toast.success('Password reset successfully');
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <main className="relative min-h-svh w-full overflow-hidden bg-background">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle_at_1px_1px,hsl(var(--foreground)/0.07)_1px,transparent_0)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-primary/[0.04] blur-3xl dark:bg-primary/[0.06]"
        />
        <div className="relative flex min-h-svh items-center justify-center px-4 py-10">
          <div className="w-full max-w-[400px]">
            <div className="mb-8 flex flex-col items-center gap-4">
              <div className="relative h-36 w-56 flex items-center justify-center rounded-2xl border border-border/30 bg-white/95 shadow-lg shadow-white/10 backdrop-blur">
                <Image
                  src="/Yeti-Logo-01.svg"
                  alt="Yeti Homes"
                  fill
                  className="object-contain p-4"
                  priority
                />
              </div>
              <div className="space-y-1 text-center">
                <h1 className="text-lg font-medium tracking-tight text-foreground">
                  Password reset
                </h1>
                <p className="text-xs text-muted-foreground">
                  Your password has been successfully reset
                </p>
              </div>
            </div>

            <Card className="border-border/60 bg-card/80 shadow-sm backdrop-blur-xl supports-[backdrop-filter]:bg-card/60">
              <CardContent className="pt-6 pb-6">
                <div className="flex flex-col items-center gap-3 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-4 py-6 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10">
                    <CheckCircle className="h-6 w-6 text-emerald-500" strokeWidth={1.75} />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Your password has been updated successfully. You can now sign in
                    with your new password.
                  </p>
                </div>

                <Button
                  type="button"
                  onClick={() => router.push('/auth/login')}
                  className="mt-4 h-10 w-full gap-2 text-sm font-medium"
                >
                  Sign in
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-svh w-full overflow-hidden bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle_at_1px_1px,hsl(var(--foreground)/0.07)_1px,transparent_0)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent)]"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-primary/[0.04] blur-3xl dark:bg-primary/[0.06]"
      />

      <div className="relative flex min-h-svh items-center justify-center px-4 py-10">
        <div className="w-full max-w-[400px]">
          <div className="mb-8 flex flex-col items-center gap-4">
            <div className="relative h-36 w-56 flex items-center justify-center rounded-2xl border border-border/30 bg-white/95 shadow-lg shadow-white/10 backdrop-blur">
              <Image
                src="/Yeti-Logo-01.svg"
                alt="Yeti Homes"
                fill
                className="object-contain p-4"
                priority
              />
            </div>
            <div className="space-y-1 text-center">
              <h1 className="text-lg font-medium tracking-tight text-foreground">
                Set new password
              </h1>
              <p className="text-xs text-muted-foreground">
                {missingToken
                  ? 'Invalid or missing reset token'
                  : 'Enter your new password below'
                }
              </p>
            </div>
          </div>

          <Card className="border-border/60 bg-card/80 shadow-sm backdrop-blur-xl supports-[backdrop-filter]:bg-card/60">
            <CardHeader className="space-y-1 pb-4 pt-6">
              <CardTitle className="text-sm font-medium tracking-tight">
                Reset password
              </CardTitle>
              <CardDescription className="text-xs">
                {missingToken
                  ? 'The password reset link is invalid or has expired'
                  : 'Choose a strong password you have not used before'
                }
              </CardDescription>
            </CardHeader>

            <CardContent className="pb-6">
              {missingToken ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push('/auth/forgot-password')}
                  className="h-10 w-full gap-2 text-sm font-medium"
                >
                  Request new reset link
                </Button>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="password"
                      className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground"
                    >
                      New password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        autoComplete="new-password"
                        autoFocus
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        minLength={8}
                        disabled={submitting}
                        className="h-10 pr-10 text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((s) => !s)}
                        tabIndex={-1}
                        aria-label={
                          showPassword ? 'Hide password' : 'Show password'
                        }
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1.5 text-muted-foreground/70 transition-colors hover:bg-muted/60 hover:text-foreground"
                      >
                        {showPassword ? (
                          <EyeOff className="h-3.5 w-3.5" strokeWidth={1.75} />
                        ) : (
                          <Eye className="h-3.5 w-3.5" strokeWidth={1.75} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label
                      htmlFor="confirmPassword"
                      className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground"
                    >
                      Confirm password
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirm ? 'text' : 'password'}
                        name="confirmPassword"
                        autoComplete="new-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        minLength={8}
                        disabled={submitting}
                        className="h-10 pr-10 text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm((s) => !s)}
                        tabIndex={-1}
                        aria-label={
                          showConfirm ? 'Hide password' : 'Show password'
                        }
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1.5 text-muted-foreground/70 transition-colors hover:bg-muted/60 hover:text-foreground"
                      >
                        {showConfirm ? (
                          <EyeOff className="h-3.5 w-3.5" strokeWidth={1.75} />
                        ) : (
                          <Eye className="h-3.5 w-3.5" strokeWidth={1.75} />
                        )}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={submitting}
                    className={cn(
                      'group h-10 w-full gap-2 text-sm font-medium',
                      'transition-all duration-200',
                    )}
                  >
                    {submitting ? (
                      <>
                        <Loader2
                          className="h-3.5 w-3.5 animate-spin"
                          strokeWidth={2}
                        />
                        Resetting password…
                      </>
                    ) : (
                      <>
                        Reset password
                        <ArrowRight
                          className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                          strokeWidth={2}
                        />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-muted-foreground">
            <span className="h-1 w-1 rounded-full bg-emerald-500" />
            <Link
              href="/auth/login"
              className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              Back to sign in
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

const Page = () => (
  <Suspense fallback={null}>
    <ResetPasswordForm />
  </Suspense>
);

export default Page;
