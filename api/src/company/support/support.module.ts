import { Module } from '@nestjs/common';
import { ContactController } from './support.controller';
import { ContactService } from './support.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ContactController],
  providers: [ContactService, PrismaService],
})
export class ContactModule {}
