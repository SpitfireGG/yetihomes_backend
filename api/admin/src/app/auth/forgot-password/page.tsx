'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';
import { Loader2, ArrowRight, ArrowLeft, MailCheck } from 'lucide-react';
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

const Page = () => {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
        },
        body: JSON.stringify({ email }),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result?.message || 'Request failed');

      setSent(true);
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
                Reset your password
              </h1>
              <p className="text-xs text-muted-foreground">
                {sent
                  ? 'Check your email for the reset link'
                  : "Enter your email and we'll send you a reset link"
                }
              </p>
            </div>
          </div>

          <Card className="border-border/60 bg-card/80 shadow-sm backdrop-blur-xl supports-[backdrop-filter]:bg-card/60">
            <CardHeader className="space-y-1 pb-4 pt-6">
              <CardTitle className="text-sm font-medium tracking-tight">
                {sent ? 'Email sent' : 'Forgot password'}
              </CardTitle>
              <CardDescription className="text-xs">
                {sent
                  ? 'If an account exists, you will receive a password reset email shortly'
                  : 'Enter the email associated with your account'
                }
              </CardDescription>
            </CardHeader>

            <CardContent className="pb-6">
              {sent ? (
                <div className="space-y-4">
                  <div className="flex flex-col items-center gap-3 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-4 py-6 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10">
                      <MailCheck className="h-6 w-6 text-emerald-500" strokeWidth={1.75} />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      We have sent a password reset link to{' '}
                      <span className="font-medium text-foreground">{email}</span>. Please
                      check your inbox and follow the instructions.
                    </p>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setSent(false)}
                    className="h-10 w-full gap-2 text-sm font-medium"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
                    Send again
                  </Button>
                </div>
              ) : (
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@yetihomes.com"
                      required
                      disabled={submitting}
                      className="h-10 text-sm"
                    />
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
                        Sending link…
                      </>
                    ) : (
                      <>
                        Send reset link
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

export default Page;
