import { Module } from '@nestjs/common';
import { PropertiesController } from './properties.controller';
import { AnalyticsModule } from 'src/modules/analytics/analytics.module';

@Module({
  imports: [AnalyticsModule],
  controllers: [PropertiesController],
})
export class PropertiesModule {}