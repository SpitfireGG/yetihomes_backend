const isSecure = typeof window !== 'undefined' && window.location.protocol === 'https:';

export function setCookie(name: string, value: string, maxAge: number) {
  if (typeof window === 'undefined') return;
  document.cookie = `${name}=${value}; path=/; max-age=${maxAge}; secure=${isSecure}; samesite=strict`;
}

export function getCookie(name: string): string | null {
  if (typeof window === 'undefined') return null;
  const match = document.cookie.match(new RegExp(`(^|;\\s*)${name}=([^;]+)`));
  return match ? match[2] : null;
}

export function removeCookie(name: string) {
  if (typeof window === 'undefined') return;
  document.cookie = `${name}=; path=/; max-age=0`;
}
