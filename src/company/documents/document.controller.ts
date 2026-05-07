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
