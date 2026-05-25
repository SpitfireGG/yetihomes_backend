'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';
import { Eye, EyeOff, Loader2, ArrowRight } from 'lucide-react';

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
import { authService } from '@/api/auth';
import { useAuth } from '@/hooks/use-auth';
import { cn } from '@/lib/utils';

const Page = () => {
  const { isAuthenticated, loading } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && isAuthenticated) window.location.href = '/dashboard';
  }, [loading, isAuthenticated]);

  if (loading || isAuthenticated) return null;

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      await authService.login(formData);
      toast.success('Welcome back');
      window.location.href = '/dashboard';
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

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
                Welcome back
              </h1>
              <p className="text-xs text-muted-foreground">
                Sign in to the Yeti Homes management console
              </p>
            </div>
          </div>

          <Card className="border-border/60 bg-card/80 shadow-sm backdrop-blur-xl supports-[backdrop-filter]:bg-card/60">
            <CardHeader className="space-y-1 pb-4 pt-6">
              <CardTitle className="text-sm font-medium tracking-tight">
                Sign in
              </CardTitle>
              <CardDescription className="text-xs">
                Use the credentials provided to your account
              </CardDescription>
            </CardHeader>

            <CardContent className="pb-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="email"
                    className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground"
                  >
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={formData.email}
                    onChange={handleOnChange}
                    placeholder="admin@yetihomes.com"
                    required
                    disabled={submitting}
                    className="h-10 text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="password"
                      className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground"
                    >
                      Password
                    </Label>
                    <Link
                      href="/auth/forgot-password"
                      className="text-[11px] font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                    >
                      Forgot?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      autoComplete="current-password"
                      value={formData.password}
                      onChange={handleOnChange}
                      placeholder="••••••••"
                      required
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
                      Signing in…
                    </>
                  ) : (
                    <>
                      Sign in
                      <ArrowRight
                        className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                        strokeWidth={2}
                      />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-muted-foreground">
            <span className="h-1 w-1 rounded-full bg-emerald-500" />
            <span>Encrypted connection</span>
            <span className="opacity-30">·</span>
            <Link
              href="/support"
              className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              Need help?
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
