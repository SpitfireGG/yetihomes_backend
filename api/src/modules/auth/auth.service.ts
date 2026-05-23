import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthTokens, JwtTokenPayload } from './auth_types';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private readonly BCRYPT_ROUNDS = 12;

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.prisma.admin.findUnique({
      where: { email: dto.email },
      select: { id: true },
    });

    if (existing) {
      throw new ConflictException('An account with this email already exists');
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

  async login(dto: LoginDto) {
    const admin = await this.prisma.admin.findUnique({
      where: { email: dto.email },
    });

    if (!admin) {
      await bcrypt.compare(
        dto.password,
        '$2b$12$invalidinvalidinvalidinvalidinvalidinvalidinvalidinvalid',
      );
      throw new UnauthorizedException('Invalid email or password');
    }

    const passwordValid = await bcrypt.compare(dto.password, admin.password);
    if (!passwordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (!admin.isActive) {
      throw new ForbiddenException('Your account has been deactivated');
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

  async refreshTokens(refreshToken: string): Promise<AuthTokens> {
    let payload: JwtTokenPayload;
    try {
      payload = await this.jwtService.verifyAsync<JwtTokenPayload>(refreshToken, {
        secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
      });
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    const tokenHash = this.hashToken(refreshToken);

    const storedToken = await this.prisma.refreshToken.findUnique({
      where: { tokenHash },
      include: { admin: true },
    });

    if (!storedToken) {
      throw new UnauthorizedException('Refresh token not recognized');
    }

    if (storedToken.revokedAt) {
      await this.revokeAllTokens(storedToken.adminId);
      this.logger.warn(
        `Refresh token reuse detected for admin ${storedToken.adminId}. All sessions revoked.`,
      );
      throw new UnauthorizedException(
        'Refresh token has been revoked. Please log in again.',
      );
    }

    if (storedToken.expiresAt < new Date()) {
      throw new UnauthorizedException('Refresh token has expired');
    }

    if (!storedToken.admin.isActive) {
      throw new ForbiddenException('Account has been deactivated');
    }

    await this.prisma.refreshToken.update({
      where: { id: storedToken.id },
      data: { revokedAt: new Date() },
    });

    return this.issueTokens(storedToken.admin.id, storedToken.admin.email);
  }

  async logout(refreshToken: string): Promise<void> {
    const tokenHash = this.hashToken(refreshToken);

    await this.prisma.refreshToken.updateMany({
      where: { tokenHash, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }

  async logoutAll(adminId: string): Promise<void> {
    await this.revokeAllTokens(adminId);
  }

  async getProfile(adminId: string) {
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
      throw new NotFoundException('Admin not found');
    }

    return admin;
  }

  private async issueTokens(
    adminId: string,
    email: string,
  ): Promise<AuthTokens> {
    const payload: JwtTokenPayload = { sub: adminId, email };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.getOrThrow<string>('JWT_ACCESS_SECRET'),
      expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRES_IN', '15m') as any,
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN', '7d') as any,
    });

    const refreshExpiresMs = this.parseExpiry(
      this.configService.get<string>('JWT_REFRESH_EXPIRES_IN', '7d'),
    );

    await this.prisma.refreshToken.create({
      data: {
        tokenHash: this.hashToken(refreshToken),
        adminId,
        expiresAt: new Date(Date.now() + refreshExpiresMs),
      },
    });

    return { accessToken, refreshToken };
  }

  async changePassword(
    adminId: string,
    currentPassword: string,
    newPassword: string,
  ): Promise<void> {
    const admin = await this.prisma.admin.findUnique({
      where: { id: adminId },
      select: { password: true },
    });

    if (!admin) {
      throw new NotFoundException('Admin not found');
    }

    const isValid = await bcrypt.compare(currentPassword, admin.password);
    if (!isValid) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    const hashedPassword = await bcrypt.hash(newPassword, this.BCRYPT_ROUNDS);
    await this.prisma.admin.update({
      where: { id: adminId },
      data: { password: hashedPassword },
    });
    await this.revokeAllTokens(adminId);
    this.logger.log(`Password changed for admin: ${adminId}`);
  }

  private async revokeAllTokens(adminId: string): Promise<void> {
    await this.prisma.refreshToken.updateMany({
      where: { adminId, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }

  private hashToken(token: string): string {
    return crypto.createHash('sha256').update(token).digest('hex');
  }

  private parseExpiry(expiresIn: string): number {
    const match = expiresIn.match(/^(\d+)([smhd])$/);
    if (!match) {
      return 7 * 24 * 60 * 60 * 1000;
    }

    const value = parseInt(match[1], 10);
    const unit = match[2];

    const multipliers: Record<string, number> = {
      s: 1000,
      m: 60 * 1000,
      h: 60 * 60 * 1000,
      d: 24 * 60 * 60 * 1000,
    };

    return value * multipliers[unit];
  }
}
