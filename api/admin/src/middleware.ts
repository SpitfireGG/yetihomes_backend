import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function isTokenExpired(token: string): boolean {
  try {
    const payload = token.split('.')[1];
    if (!payload) return true;
    const decoded = JSON.parse(atob(payload));
    return decoded.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

export function middleware(req: NextRequest) {
    const token = req.cookies.get('accessToken');
    const { pathname } = req.nextUrl;

    const authRoutes = new Set([
        '/auth/login',
        '/auth/signup',
        '/auth/forgot-password',
        '/auth/reset-password'
    ]);

    if (authRoutes.has(pathname) || pathname.startsWith('/auth/')) {
        return NextResponse.next();
    }

    if (
        pathname.startsWith('/_next/') ||
        pathname.startsWith('/api/') ||
        pathname === '/favicon.ico' ||
        pathname.match(/\.(svg|png|jpg|jpeg|gif|ico|webp|woff2?|css|js)$/)
    ) {
        return NextResponse.next();
    }

    if (!token && pathname === '/') {
        return NextResponse.next();
    }

    if (!token || isTokenExpired(token)) {
        const response = NextResponse.redirect(new URL('/auth/login', req.url));
        response.cookies.delete('accessToken');
        response.cookies.delete('refreshToken');
        return response;
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image).*)',
    ],
};
