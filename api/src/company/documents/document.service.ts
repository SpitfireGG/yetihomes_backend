import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LegalDocType } from '@prisma/client';
import { CreateLegalDocumentDto } from './dtos/create-document.dto';

@Injectable()
export class LegalDocumentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateLegalDocumentDto) {
    const existing = await this.prisma.legalDocument.findUnique({
      where: { type: dto.type },
    });

    if (existing) {
      throw new ConflictException(
        `A ${dto.type} document already exists. Please update it instead.`,
      );
    }

    return this.prisma.legalDocument.create({ data: dto });
  }

  async findAll() {
    return this.prisma.legalDocument.findMany();
  }

  async findByType(type: LegalDocType) {
    const document = await this.prisma.legalDocument.findUnique({
      where: { type },
    });

    if (!document) {
      throw new NotFoundException(`${type} document not found.`);
    }

    return document;
  }

  async update(id: string, dto: CreateLegalDocumentDto) {
    const document = await this.prisma.legalDocument.findUnique({
      where: { id },
    });
    if (!document) throw new NotFoundException('Document not found');

    return this.prisma.legalDocument.update({
      where: { id },
      data: dto,
    });
  }

  async delete(id: string) {
    const document = await this.prisma.legalDocument.findUnique({
      where: { id },
    });
    if (!document) throw new NotFoundException('Document not found');

    return this.prisma.legalDocument.delete({ where: { id } });
  }
}
