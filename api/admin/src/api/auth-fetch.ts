import { API_KEY, API_URL } from '@/utils/main';
import { setCookie, getCookie, removeCookie } from '@/utils/cookies';

export class AuthFetch {
    private baseUrl = `${API_URL}/api/auth`;

    private setAccessToken(token: string) {
        setCookie('accessToken', token, 900);
    }

    private getAccessToken(): string | null {
        return getCookie('accessToken');
    }

    private setRefreshToken(token: string) {
        setCookie('refreshToken', token, 7 * 24 * 60 * 60);
    }

    private getRefreshToken(): string | null {
        return getCookie('refreshToken');
    }

    public clearAccessToken() {
        removeCookie('accessToken');
        removeCookie('refreshToken');
    }

    private redirectToLogin() {
        this.clearAccessToken();
        const redirect = encodeURIComponent(window.location.pathname);
        window.location.href = `/auth/login?redirect=${redirect}`;
    }

    private async refreshAccessToken(): Promise<string | null> {
        const refreshToken = this.getRefreshToken();
        if (!refreshToken) {
            this.redirectToLogin();
            return null;
        }

        try {
            const res = await fetch(`${this.baseUrl}/refresh`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': API_KEY,
                },
                body: JSON.stringify({ refreshToken }),
            });

            const result = await res.json();

            if (!res.ok) throw new Error(result.message || 'Refresh token failed');

            const newAccessToken = result.data?.accessToken;
            const newRefreshToken = result.data?.refreshToken;
            if (!newAccessToken) throw new Error('No access token received from refresh');

            this.setAccessToken(newAccessToken);
            if (newRefreshToken) this.setRefreshToken(newRefreshToken);
            return newAccessToken;
        } catch (err) {
            console.error('Failed to refresh token', err);
            this.redirectToLogin();
            return null;
        }
    }

    public async fetch(input: RequestInfo, init?: RequestInit): Promise<Response> {
        const makeHeaders = (token: string | null) => {
            const headers: Record<string, string> = {
                'x-api-key': API_KEY,
            };
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }
            return {
                ...headers,
                ...(init?.headers as Record<string, string> || {}),
            };
        };

        let token = this.getAccessToken();
        if (!token) {
            this.redirectToLogin();
            throw new Error('Unauthorized, no access token. redirecting to login');
        }

        let response = await fetch(input, {
            ...init,
            headers: makeHeaders(token),
            credentials: 'include',
        });

        if (response.status === 401) {
            token = await this.refreshAccessToken();
            if (!token) {
                throw new Error('Unauthorized, redirecting to login');
            }

            response = await fetch(input, {
                ...init,
                headers: makeHeaders(token),
                credentials: 'include',
            });
        }

        return response;
    }
}
