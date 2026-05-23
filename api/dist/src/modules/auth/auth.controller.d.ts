import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import type { AuthenticatedAdmin } from './auth_types';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        accessToken: string;
        refreshToken: string;
        admin: {
            id: string;
            createdAt: Date;
            email: string;
            isActive: boolean;
            fullName: string;
        };
    }>;
    login(dto: LoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
        admin: {
            id: string;
            email: string;
            fullName: string;
            isActive: true;
        };
    }>;
    refresh(dto: RefreshTokenDto): Promise<import("./auth_types").AuthTokens>;
    logout(dto: RefreshTokenDto): Promise<void>;
    logoutAll(adminId: string): Promise<void>;
    getProfile(admin: AuthenticatedAdmin): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        isActive: boolean;
        fullName: string;
        lastLogin: Date | null;
    }>;
    changePassword(adminId: string, body: {
        current_password: string;
        new_password: string;
    }): Promise<{
        message: string;
    }>;
}
