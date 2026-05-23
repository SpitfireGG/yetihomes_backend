import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateReviewDto } from './dto/create-reviews.dto';
import { UpdateReviewDto } from './dto/update-reviews.dto';

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateReviewDto & { image?: string }) {
    try {
      return await this.prisma.review.create({
        data: dto,
      });
    } catch (error) {
      throw new InternalServerErrorException(`Failed to create review.`);
    }
  }

  async findAll() {
    return this.prisma.review.findMany({
      orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }],
    });
  }

  async findById(id: string) {
    try {
      return await this.prisma.review.findUniqueOrThrow({ where: { id } });
    } catch (error) {
      throw new NotFoundException(`Review with ID ${id} not found.`);
    }
  }

  async update(id: string, dto: UpdateReviewDto & { image?: string }) {
    try {
      return await this.prisma.review.update({
        where: { id },
        data: dto,
      });
    } catch (error) {
      throw new InternalServerErrorException(`Failed to update review.`);
    }
  }

  async delete(id: string) {
    try {
      return await this.prisma.review.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Review ID not found -> ${id}`);
        }
      }
      throw new InternalServerErrorException(`Failed to delete review.`);
    }
  }
}
