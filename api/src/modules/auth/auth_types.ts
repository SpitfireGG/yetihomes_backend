export interface JwtTokenPayload {
  sub: string;
  email: string;
  iat?: number;
  exp?: number;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthenticatedAdmin {
  id: string;
  email: string;
  fullName: string;
  isActive: boolean;
}
