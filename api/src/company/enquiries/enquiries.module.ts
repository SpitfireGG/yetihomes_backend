import { Module } from '@nestjs/common';
import { InquiriesController } from './enquiries.controller';
import { InquiriesService } from './enquiries.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [InquiriesController],
  providers: [InquiriesService, PrismaService],
})
export class InquiriesModule {}
