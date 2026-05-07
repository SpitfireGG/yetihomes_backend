import { Module } from '@nestjs/common';
import { LegalDocumentController } from './document.controller';
import { LegalDocumentService } from './document.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [LegalDocumentController],
  providers: [LegalDocumentService, PrismaService],
})
export class DocumentModule {}
