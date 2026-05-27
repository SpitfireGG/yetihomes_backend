import { Module } from '@nestjs/common';
import { LegalDocumentController, TermsController, PrivacyController, CookieController } from './document.controller';
import { LegalDocumentService } from './document.service';
@Module({
  controllers: [LegalDocumentController, TermsController, PrivacyController, CookieController],
  providers: [LegalDocumentService],
})
export class DocumentModule {}
