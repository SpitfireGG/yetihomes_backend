import { API_KEY, API_URL } from "@/utils/main";
import { setCookie, getCookie, removeCookie } from "@/utils/cookies";

type ApiResponse<T> = {
  success: boolean;
  message: string;
  statusCode: number;
  data: T;
  timestamp?: string;
};

type LoginResponse = {
  admin: {
    id: string;
    email: string;
    fullName: string;
    isActive: boolean;
  };
  accessToken: string;
  refreshToken: string;
};

type AdminProfile = {
  id: string;
  email: string;
  fullName: string;
  isActive: boolean;
  lastLogin: string | null;
  createdAt: string;
  updatedAt: string;
};

export class Auth {
  private baseUrl = `${API_URL}/api/auth`;

  private getAccessToken(): string | null {
    return getCookie("accessToken");
  }

  private setAccessToken(token: string) {
    setCookie("accessToken", token, 900);
  }

  private clearAccessToken() {
    removeCookie("accessToken");
  }

  private getRefreshToken(): string | null {
    return getCookie("refreshToken");
  }

  private setRefreshToken(token: string) {
    setCookie("refreshToken", token, 7 * 24 * 60 * 60);
  }

  private clearRefreshToken() {
    removeCookie("refreshToken");
  }

  private async request<T>(
    path: string,
    options: RequestInit = {},
  ): Promise<ApiResponse<T>> {
    const token = this.getAccessToken();
    const headers: Record<string, string> = {
      "x-api-key": API_KEY,
      ...(options.headers as Record<string, string>),
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    if (
      options.body &&
      !(options.body instanceof FormData)
    ) {
      headers["Content-Type"] = "application/json";
    }

    const res = await fetch(`${this.baseUrl}${path}`, {
      ...options,
      headers,
      credentials: "include",
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result?.message || "Request failed");
    }

    return result;
  }

  async login(data: { email: string; password: string }): Promise<LoginResponse> {
    const res = await this.request<LoginResponse>("/login", {
      method: "POST",
      body: JSON.stringify(data),
    });

    this.setAccessToken(res.data.accessToken);
    this.setRefreshToken(res.data.refreshToken);

    return res.data;
  }

  async register(data: { email: string; password: string; fullName: string }): Promise<LoginResponse> {
    const res = await this.request<LoginResponse>("/register", {
      method: "POST",
      body: JSON.stringify(data),
    });

    this.setAccessToken(res.data.accessToken);
    this.setRefreshToken(res.data.refreshToken);

    return res.data;
  }

  async getProfile(): Promise<AdminProfile> {
    const res = await this.request<AdminProfile>("/me", {
      method: "GET",
    });
    return res.data;
  }

  async refreshTokens(): Promise<{ accessToken: string; refreshToken: string } | null> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) return null;

    try {
      const res = await fetch(`${this.baseUrl}/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
        },
        body: JSON.stringify({ refreshToken }),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result?.message || "Refresh failed");

      this.setAccessToken(result.data.accessToken);
      this.setRefreshToken(result.data.refreshToken);

      return result.data;
    } catch {
      this.clearAccessToken();
      this.clearRefreshToken();
      return null;
    }
  }

  async logout(): Promise<void> {
    const refreshToken = this.getRefreshToken();
    try {
      if (refreshToken) {
        await fetch(`${this.baseUrl}/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY,
          },
          body: JSON.stringify({ refreshToken }),
        });
      }
    } catch {
    } finally {
      this.clearAccessToken();
      this.clearRefreshToken();
    }
  }

  getAccessTokenForCookie(): string | null {
    return this.getAccessToken();
  }

  getStoredRefreshToken(): string | null {
    return this.getRefreshToken();
  }
}

export const authService = new Auth();
export type { LoginResponse, AdminProfile, ApiResponse };
