import { Module } from '@nestjs/common';
import { AffiliationsController } from './affilation.controller';
import { AffiliationsService } from './affilation.service';
@Module({
  controllers: [AffiliationsController],
  providers: [AffiliationsService],
})
export class AffiliationsModule {}
