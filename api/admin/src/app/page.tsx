import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Page() {
  const accessToken = (await cookies()).get('accessToken');

  if (accessToken) {
    redirect('/dashboard');
  }

  redirect('/auth/login');
}
