import { Controller, Get, Inject } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  @Get()
  async getApiHealth() {
    let dbStatus = 'disconnected';
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      dbStatus = 'connected';
    } catch {
      dbStatus = 'error';
    }

    return {
      status: 'up',
      description: 'Yeti Homes API',
      version: '1.0.0',
      database: dbStatus,
      timestamp: new Date().toISOString(),
    };
  }
}
