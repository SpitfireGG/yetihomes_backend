import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { StaticPageType } from '@prisma/client';
import { CreateStaticPageDto } from './dto/create-static.dto';

@Injectable()
export class StaticPageService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateStaticPageDto) {
    const existing = await this.prisma.staticPage.findUnique({
      where: { slug: dto.slug },
    });

    if (existing) {
      throw new ConflictException('A page with this slug already exists.');
    }

    return this.prisma.staticPage.create({ data: dto });
  }

  async findAll() {
    return this.prisma.staticPage.findMany({
      orderBy: { displayOrder: 'asc' },
    });
  }

  async findBySlug(slug: string) {
    const page = await this.prisma.staticPage.findUnique({
      where: { slug },
    });

    if (!page) {
      throw new NotFoundException('Page not found.');
    }

    return page;
  }

  async findByType(type: StaticPageType) {
    const page = await this.prisma.staticPage.findFirst({
      where: { pageType: type, isActive: true },
    });

    if (!page) {
      throw new NotFoundException(`${type} page not found.`);
    }

    return page;
  }

  async findOne(id: string) {
    const page = await this.prisma.staticPage.findUnique({
      where: { id },
    });

    if (!page) {
      throw new NotFoundException('Page not found.');
    }

    return page;
  }

  async update(id: string, dto: CreateStaticPageDto) {
    const page = await this.prisma.staticPage.findUnique({
      where: { id },
    });
    if (!page) throw new NotFoundException('Page not found');

    return this.prisma.staticPage.update({
      where: { id },
      data: dto,
    });
  }

  async delete(id: string) {
    const page = await this.prisma.staticPage.findUnique({
      where: { id },
    });
    if (!page) throw new NotFoundException('Page not found');

    return this.prisma.staticPage.delete({ where: { id } });
  }
}
