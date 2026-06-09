'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

function isTokenExpired(token: string): boolean {
  try {
    const payload = token.split('.')[1];
    if (!payload) return true;
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64.padEnd(
      base64.length + ((4 - (base64.length % 4)) % 4),
      '=',
    );
    const decoded = JSON.parse(atob(padded));
    return decoded.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp(`(^|;\\s*)${name}=([^;]+)`));
  return match ? match[2] : null;
}

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    if (window.location.pathname !== '/' && window.location.pathname !== '')
      return;

    const accessToken = getCookie('accessToken');
    if (accessToken && !isTokenExpired(accessToken)) {
      router.replace('/dashboard');
    } else {
      router.replace('/auth/login');
    }
  }, [router]);

  return null;
}
