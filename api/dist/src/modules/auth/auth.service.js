"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const bcrypt = __importStar(require("bcrypt"));
const crypto = __importStar(require("crypto"));
const prisma_service_1 = require("../../prisma/prisma.service");
let AuthService = AuthService_1 = class AuthService {
    prisma;
    jwtService;
    configService;
    logger = new common_1.Logger(AuthService_1.name);
    BCRYPT_ROUNDS = 12;
    constructor(prisma, jwtService, configService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async register(dto) {
        const existing = await this.prisma.admin.findUnique({
            where: { email: dto.email },
            select: { id: true },
        });
        if (existing) {
            throw new common_1.ConflictException('An account with this email already exists');
        }
        const hashedPassword = await bcrypt.hash(dto.password, this.BCRYPT_ROUNDS);
        const admin = await this.prisma.admin.create({
            data: {
                email: dto.email,
                password: hashedPassword,
                fullName: dto.fullName,
            },
            select: {
                id: true,
                email: true,
                fullName: true,
                isActive: true,
                createdAt: true,
            },
        });
        this.logger.log(`New admin registered: ${admin.email}`);
        const tokens = await this.issueTokens(admin.id, admin.email);
        return {
            admin,
            ...tokens,
        };
    }
    async login(dto) {
        const admin = await this.prisma.admin.findUnique({
            where: { email: dto.email },
        });
        if (!admin) {
            await bcrypt.compare(dto.password, '$2b$12$invalidinvalidinvalidinvalidinvalidinvalidinvalidinvalid');
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        const passwordValid = await bcrypt.compare(dto.password, admin.password);
        if (!passwordValid) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        if (!admin.isActive) {
            throw new common_1.ForbiddenException('Your account has been deactivated');
        }
        await this.prisma.admin.update({
            where: { id: admin.id },
            data: { lastLogin: new Date() },
        });
        const tokens = await this.issueTokens(admin.id, admin.email);
        this.logger.log(`Admin logged in: ${admin.email}`);
        return {
            admin: {
                id: admin.id,
                email: admin.email,
                fullName: admin.fullName,
                isActive: admin.isActive,
            },
            ...tokens,
        };
    }
    async refreshTokens(refreshToken) {
        let payload;
        try {
            payload = await this.jwtService.verifyAsync(refreshToken, {
                secret: this.configService.getOrThrow('JWT_REFRESH_SECRET'),
            });
        }
        catch {
            throw new common_1.UnauthorizedException('Invalid or expired refresh token');
        }
        const tokenHash = this.hashToken(refreshToken);
        const storedToken = await this.prisma.refreshToken.findUnique({
            where: { tokenHash },
            include: { admin: true },
        });
        if (!storedToken) {
            throw new common_1.UnauthorizedException('Refresh token not recognized');
        }
        if (storedToken.revokedAt) {
            await this.revokeAllTokens(storedToken.adminId);
            this.logger.warn(`Refresh token reuse detected for admin ${storedToken.adminId}. All sessions revoked.`);
            throw new common_1.UnauthorizedException('Refresh token has been revoked. Please log in again.');
        }
        if (storedToken.expiresAt < new Date()) {
            throw new common_1.UnauthorizedException('Refresh token has expired');
        }
        if (!storedToken.admin.isActive) {
            throw new common_1.ForbiddenException('Account has been deactivated');
        }
        await this.prisma.refreshToken.update({
            where: { id: storedToken.id },
            data: { revokedAt: new Date() },
        });
        return this.issueTokens(storedToken.admin.id, storedToken.admin.email);
    }
    async logout(refreshToken) {
        const tokenHash = this.hashToken(refreshToken);
        await this.prisma.refreshToken.updateMany({
            where: { tokenHash, revokedAt: null },
            data: { revokedAt: new Date() },
        });
    }
    async logoutAll(adminId) {
        await this.revokeAllTokens(adminId);
    }
    async getProfile(adminId) {
        const admin = await this.prisma.admin.findUnique({
            where: { id: adminId },
            select: {
                id: true,
                email: true,
                fullName: true,
                isActive: true,
                lastLogin: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        if (!admin) {
            throw new common_1.NotFoundException('Admin not found');
        }
        return admin;
    }
    async issueTokens(adminId, email) {
        const payload = { sub: adminId, email };
        const accessToken = await this.jwtService.signAsync(payload, {
            secret: this.configService.getOrThrow('JWT_ACCESS_SECRET'),
            expiresIn: this.configService.get('JWT_ACCESS_EXPIRES_IN', '15m'),
        });
        const refreshToken = await this.jwtService.signAsync(payload, {
            secret: this.configService.getOrThrow('JWT_REFRESH_SECRET'),
            expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN', '7d'),
        });
        const refreshExpiresMs = this.parseExpiry(this.configService.get('JWT_REFRESH_EXPIRES_IN', '7d'));
        await this.prisma.refreshToken.create({
            data: {
                tokenHash: this.hashToken(refreshToken),
                adminId,
                expiresAt: new Date(Date.now() + refreshExpiresMs),
            },
        });
        return { accessToken, refreshToken };
    }
    async changePassword(adminId, currentPassword, newPassword) {
        const admin = await this.prisma.admin.findUnique({
            where: { id: adminId },
            select: { password: true },
        });
        if (!admin) {
            throw new common_1.NotFoundException('Admin not found');
        }
        const isValid = await bcrypt.compare(currentPassword, admin.password);
        if (!isValid) {
            throw new common_1.UnauthorizedException('Current password is incorrect');
        }
        const hashedPassword = await bcrypt.hash(newPassword, this.BCRYPT_ROUNDS);
        await this.prisma.admin.update({
            where: { id: adminId },
            data: { password: hashedPassword },
        });
        await this.revokeAllTokens(adminId);
        this.logger.log(`Password changed for admin: ${adminId}`);
    }
    async revokeAllTokens(adminId) {
        await this.prisma.refreshToken.updateMany({
            where: { adminId, revokedAt: null },
            data: { revokedAt: new Date() },
        });
    }
    hashToken(token) {
        return crypto.createHash('sha256').update(token).digest('hex');
    }
    parseExpiry(expiresIn) {
        const match = expiresIn.match(/^(\d+)([smhd])$/);
        if (!match) {
            return 7 * 24 * 60 * 60 * 1000;
        }
        const value = parseInt(match[1], 10);
        const unit = match[2];
        const multipliers = {
            s: 1000,
            m: 60 * 1000,
            h: 60 * 60 * 1000,
            d: 24 * 60 * 60 * 1000,
        };
        return value * multipliers[unit];
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map