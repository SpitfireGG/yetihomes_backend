'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { authService } from '@/api/auth';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    authService
      .getProfile()
      .then(() => setChecking(false))
      .catch(() => {
        const loginUrl = `/auth/login?redirect=${encodeURIComponent(pathname)}`;
        router.replace(loginUrl);
      });
  }, [router, pathname]);

  if (checking) return null;

  return <>{children}</>;
}
