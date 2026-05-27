import { Module } from '@nestjs/common';
import { InquiriesController } from './enquiries.controller';
import { InquiriesService } from './enquiries.service';
@Module({
  controllers: [InquiriesController],
  providers: [InquiriesService],
})
export class InquiriesModule {}
