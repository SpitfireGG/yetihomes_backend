export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://api.yetihomesestate.com.np';

export const API_KEY: string =
  process.env.NEXT_PUBLIC_API_KEY ||
  (() => {
    if (
      typeof window !== 'undefined' &&
      process.env.NODE_ENV === 'production'
    ) {
    }
    return '';
  })();
