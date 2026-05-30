import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { LegalDocType } from '@prisma/client';
import { LegalDocumentService } from './document.service';
import { CreateLegalDocumentDto } from './dtos/create-document.dto';
import { Public } from 'src/modules/auth/public.decorator';

@Controller('company/legal-documents')
export class LegalDocumentController {
  constructor(private readonly legalDocumentService: LegalDocumentService) {}

  @Post()
  async create(@Body() createLegalDocumentDto: CreateLegalDocumentDto) {
    return this.legalDocumentService.create(createLegalDocumentDto);
  }

  @Public()
  @Get()
  async findAll() {
    return this.legalDocumentService.findAll();
  }

  @Public()
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

  @Public()
  @Get()
  async find() {
    return this.legalDocumentService.findByType('TERMS_AND_CONDITIONS');
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.legalDocumentService.findOne(id);
  }

  @Post()
  async create(@Body() dto: CreateLegalDocumentDto) {
    return this.legalDocumentService.create({ ...dto, type: 'TERMS_AND_CONDITIONS' });
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: CreateLegalDocumentDto,
  ) {
    return this.legalDocumentService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.legalDocumentService.delete(id);
  }
}

@Controller('company/privacy-policy')
export class PrivacyController {
  constructor(private readonly legalDocumentService: LegalDocumentService) {}

  @Public()
  @Get()
  async find() {
    return this.legalDocumentService.findByType('PRIVACY_POLICY');
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.legalDocumentService.findOne(id);
  }

  @Post()
  async create(@Body() dto: CreateLegalDocumentDto) {
    return this.legalDocumentService.create({ ...dto, type: 'PRIVACY_POLICY' });
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: CreateLegalDocumentDto,
  ) {
    return this.legalDocumentService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.legalDocumentService.delete(id);
  }
}

@Controller('company/cookie-policy')
export class CookieController {
  constructor(private readonly legalDocumentService: LegalDocumentService) {}

  @Public()
  @Get()
  async find() {
    return this.legalDocumentService.findByType('COOKIE_POLICY');
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.legalDocumentService.findOne(id);
  }

  @Post()
  async create(@Body() dto: CreateLegalDocumentDto) {
    return this.legalDocumentService.create({ ...dto, type: 'COOKIE_POLICY' });
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: CreateLegalDocumentDto,
  ) {
    return this.legalDocumentService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.legalDocumentService.delete(id);
  }
}


