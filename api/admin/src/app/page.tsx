import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

function isTokenExpired(token: string): boolean {
  try {
    const payload = token.split('.')[1];
    if (!payload) return true;
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64.padEnd(base64.length + (4 - base64.length % 4) % 4, '=');
    const decoded = JSON.parse(atob(padded));
    return decoded.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

export default async function Page() {
  const accessToken = (await cookies()).get('accessToken');

  if (accessToken && !isTokenExpired(accessToken.value)) {
    redirect('/dashboard');
  }

  redirect('/auth/login');
}
