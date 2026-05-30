import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function isTokenExpired(token: string): boolean {
  try {
    const payload = token.split('.')[1];
    if (!payload) return true;
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64.padEnd(base64.length + (4 - base64.length % 4) % 4, '=');
    const decoded = JSON.parse(Buffer.from(padded, 'base64').toString('utf-8'));
    return decoded.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

export function middleware(req: NextRequest) {
  const token = req.cookies.get('accessToken');
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname === '/favicon.ico' ||
    pathname.match(/\.(svg|png|jpg|jpeg|gif|ico|webp|woff2?|css|js)$/)
  ) {
    return NextResponse.next();
  }

  const isAuthRoute = pathname.startsWith('/auth/');
  const hasValidToken = token && !isTokenExpired(token.value);

  if (isAuthRoute && hasValidToken) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  if (isAuthRoute) {
    return NextResponse.next();
  }

  if (!token && pathname === '/') {
    return NextResponse.next();
  }

  if (!hasValidToken) {
    const loginUrl = new URL('/auth/login', req.url);
    loginUrl.searchParams.set('redirect', pathname);
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete('accessToken');
    response.cookies.delete('refreshToken');
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
};
