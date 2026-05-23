export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

export const API_KEY: string =
  process.env.NEXT_PUBLIC_API_KEY ||
  (() => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
      console.error('NEXT_PUBLIC_API_KEY is not set');
    }
    return '';
  })();

