import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class BlogsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    dto: CreateBlogDto & { coverImage?: string; authorImage?: string },
  ) {
    try {
      if (dto.isFeatured) {
        await this.prisma.blogArticle.updateMany({
          where: { isFeatured: true },
          data: { isFeatured: false },
        });
      }

      return await this.prisma.blogArticle.create({
        data: dto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(
            `A blog article with this slug already exists.`,
          );
        }
      }
      throw new InternalServerErrorException(`Failed to create blog article.`);
    }
  }

  async findAll() {
    return this.prisma.blogArticle.findMany({
      orderBy: [{ isFeatured: 'desc' }, { publishDate: 'desc' }],
    });
  }

  async findBySlug(slug: string) {
    try {
      return await this.prisma.blogArticle.findUniqueOrThrow({
        where: { slug },
      });
    } catch (error) {
      throw new NotFoundException(`Article with slug '${slug}' not found.`);
    }
  }

  async update(
    id: string,
    dto: UpdateBlogDto & { coverImage?: string; authorImage?: string },
  ) {
    try {
      if (dto.isFeatured) {
        await this.prisma.blogArticle.updateMany({
          where: { isFeatured: true, NOT: { id } },
          data: { isFeatured: false },
        });
      }

      return await this.prisma.blogArticle.update({
        where: { id },
        data: dto,
      });
    } catch (error) {
      throw new InternalServerErrorException(`Failed to update blog article.`);
    }
  }

  async delete(id: string) {
    try {
      return await this.prisma.blogArticle.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Article ID not found -> ${id}`);
        }
      }
      throw new InternalServerErrorException(`Failed to delete blog article.`);
    }
  }
}
