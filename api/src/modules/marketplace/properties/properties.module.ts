import { Module } from '@nestjs/common';
import { PropertiesController } from './properties.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AnalyticsModule } from 'src/modules/analytics/analytics.module';

@Module({
  imports: [AnalyticsModule],
  controllers: [PropertiesController],
  providers: [PrismaService],
})
export class PropertiesModule {}