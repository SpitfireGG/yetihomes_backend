import { Module } from '@nestjs/common';
import { LegalDocumentController, TermsController, PrivacyController, CookieController } from './document.controller';
import { LegalDocumentService } from './document.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [LegalDocumentController, TermsController, PrivacyController, CookieController],
  providers: [LegalDocumentService, PrismaService],
})
export class DocumentModule {}
