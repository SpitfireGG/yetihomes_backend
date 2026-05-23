import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from "../../prisma/prisma.service";
import { AuthTokens } from './auth_types';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    private readonly configService;
    private readonly logger;
    private readonly BCRYPT_ROUNDS;
    constructor(prisma: PrismaService, jwtService: JwtService, configService: ConfigService);
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
    refreshTokens(refreshToken: string): Promise<AuthTokens>;
    logout(refreshToken: string): Promise<void>;
    logoutAll(adminId: string): Promise<void>;
    getProfile(adminId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        isActive: boolean;
        fullName: string;
        lastLogin: Date | null;
    }>;
    private issueTokens;
    changePassword(adminId: string, currentPassword: string, newPassword: string): Promise<void>;
    private revokeAllTokens;
    private hashToken;
    private parseExpiry;
}
