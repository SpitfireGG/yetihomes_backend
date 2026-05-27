import { Module } from '@nestjs/common';
import { ContactController } from './support.controller';
import { ContactService } from './support.service';
@Module({
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
