import { Module } from '@nestjs/common';
import { FaqsController } from './faq.controller';
import { FaqService } from './faq.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [FaqsController],
  providers: [FaqService, PrismaService],
})
export class FaqModule {}
