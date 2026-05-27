import { Module } from '@nestjs/common';
import { FaqsController } from './faq.controller';
import { FaqService } from './faq.service';
@Module({
  controllers: [FaqsController],
  providers: [FaqService],
})
export class FaqModule {}
