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
    const adapter = new PrismaPg(databaseUrl);
    super({
      adapter,
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'stdout', level: 'warn' },
        { emit: 'stdout', level: 'error' },
        { emit: 'event', level: 'info' },
      ],
    });

    this.$on('query' as never, (e: any) => {
      this.logger.debug(`query -> ${e.query}`);
      this.logger.debug('params -> ${e.params}');
      this.logger.debug('duration -> ${e.duration}ms');
    });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      console.log('Prisma connected to postgres');
    } catch (error) {
      console.error('Prisma connection error:', error);
      throw error;
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log('Prisma disconnected from postgres');
  }
}
