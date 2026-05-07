import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateInquiryDto } from './dtos/create-enquiries.dto';
import { UpdateInquiryStatusDto } from './dtos/update-enquiries.dto';

@Injectable()
export class InquiriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateInquiryDto) {
    if (dto.propertyId) {
      const propertyExists = await this.prisma.property.findUnique({
        where: { id: dto.propertyId },
      });

      if (!propertyExists) {
        throw new BadRequestException(
          `Cannot create inquiry. Property with ID ${dto.propertyId} does not exist.`,
        );
      }
    }

    return this.prisma.inquiry.create({
      data: dto,
    });
  }

  async findAll() {
    return this.prisma.inquiry.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        property: {
          select: {
            title: true,
            slug: true,
            propertyType: true,
            listingType: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const inquiry = await this.prisma.inquiry.findUnique({
      where: { id },
      include: {
        property: {
          select: {
            title: true,
            slug: true,
            propertyType: true,
            listingType: true,
          },
        },
      },
    });

    if (!inquiry) {
      throw new NotFoundException(`Inquiry with ID ${id} not found.`);
    }

    return inquiry;
  }

  async updateStatus(id: string, dto: UpdateInquiryStatusDto) {
    await this.findOne(id);

    return this.prisma.inquiry.update({
      where: { id },
      data: {
        status: dto.status,
      },
    });
  }

  async delete(id: string) {
    await this.findOne(id);

    return this.prisma.inquiry.delete({
      where: { id },
    });
  }
}
