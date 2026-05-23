import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);
  constructor(configService: ConfigService) {
    const databaseUrl = configService.getOrThrow('DATABASE_URL');
    const poolMin = configService.get<number>('DATABASE_POOL_MIN', 2);
    const poolMax = configService.get<number>('DATABASE_POOL_MAX', 10);
    const adapter = new PrismaPg({
      connectionString: databaseUrl,
      min: poolMin,
      max: poolMax,
    });
    super({
      adapter,
      log: [
        { emit: 'event', level: 'warn' },
        { emit: 'event', level: 'error' },
      ],
    });

    this.$on('error' as never, (e: any) => {
      this.logger.error(`Database error: ${e.message}`, e.stack);
    });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('Database connected successfully');
      const result = await this.$queryRaw`SELECT 1`;
      this.logger.verbose('Database health check passed');
    } catch (error) {
      this.logger.error('Database connection failed', error);
      throw error;
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('Database disconnected');
  }
}
