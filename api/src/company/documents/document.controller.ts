import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LegalDocType } from '@prisma/client';
import { LegalDocumentService } from './document.service';
import { CreateLegalDocumentDto } from './dtos/create-document.dto';

@Controller('company/legal-documents')
export class LegalDocumentController {
  constructor(private readonly legalDocumentService: LegalDocumentService) {}

  @Post()
  async create(@Body() createLegalDocumentDto: CreateLegalDocumentDto) {
    return this.legalDocumentService.create(createLegalDocumentDto);
  }

  @Get()
  async findAll() {
    return this.legalDocumentService.findAll();
  }

  @Get('type/:type')
  async findByType(@Param('type') type: LegalDocType) {
    return this.legalDocumentService.findByType(type);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLegalDocumentDto: CreateLegalDocumentDto,
  ) {
    return this.legalDocumentService.update(id, updateLegalDocumentDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.legalDocumentService.delete(id);
  }
}

@Controller('company/terms-and-conditions')
export class TermsController {
  constructor(private readonly legalDocumentService: LegalDocumentService) {}

  @Get()
  async find() {
    return this.legalDocumentService.findByType('TERMS_AND_CONDITIONS');
  }

  @Post()
  async create(@Body() dto: CreateLegalDocumentDto) {
    return this.legalDocumentService.create({ ...dto, type: 'TERMS_AND_CONDITIONS' });
  }
}

@Controller('company/privacy-policy')
export class PrivacyController {
  constructor(private readonly legalDocumentService: LegalDocumentService) {}

  @Get()
  async find() {
    return this.legalDocumentService.findByType('PRIVACY_POLICY');
  }

  @Post()
  async create(@Body() dto: CreateLegalDocumentDto) {
    return this.legalDocumentService.create({ ...dto, type: 'PRIVACY_POLICY' });
  }
}

@Controller('company/cookie-policy')
export class CookieController {
  constructor(private readonly legalDocumentService: LegalDocumentService) {}

  @Get()
  async find() {
    return this.legalDocumentService.findByType('COOKIE_POLICY');
  }

  @Post()
  async create(@Body() dto: CreateLegalDocumentDto) {
    return this.legalDocumentService.create({ ...dto, type: 'COOKIE_POLICY' });
  }
}
