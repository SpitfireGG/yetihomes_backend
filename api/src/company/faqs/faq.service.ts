import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFaqDto } from './dtos/create-faqs.dto';
import { UpdateFaqsDto } from './dtos/update-faqs.dto';

@Injectable()
export class FaqService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateFaqDto) {
    return this.prisma.faq.create({
      data: dto,
    });
  }
  async findOne(id: string) {
    const faq = this.prisma.faq.findUnique({
      where: { id },
    });
    if (!faq)
      throw new NotFoundException(`request id could not be found #id-> ${id}`);
    return faq;
  }
  async findAll() {
    return this.prisma.faq.findMany();
  }

  async update(id: string, updateFaqsDto: UpdateFaqsDto) {
    await this.findOne(id);
    return this.prisma.faq.update({ where: { id }, data: updateFaqsDto });
  }

  async delete(id: string) {
    await this.findOne(id);
    return this.prisma.faq.delete({
      where: { id },
    });
  }
}
