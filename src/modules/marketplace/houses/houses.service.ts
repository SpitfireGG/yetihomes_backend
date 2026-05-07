import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateHouseDto } from './dto/create-houses.dto';
import { Prisma } from '@prisma/client';
import { UpdateHouseDto } from './dto/update-house.dto';

@Injectable()
export class HouseService {
  constructor(private readonly prisma: PrismaService) {}

  async createHouses(dto: CreateHouseDto) {
    const { details, images, ...propertyData } = dto;

    try {
      const newHouse = await this.prisma.property.create({
        data: {
          ...propertyData,
          propertyType: 'HOUSE',
          houseDetails: {
            create: details,
          },
          images:
            images && images.length > 0
              ? {
                  create: images,
                }
              : undefined,
        },
        include: { houseDetails: true, images: true },
      });
      return newHouse;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(
            `a property with this slug already exists.`,
          );
        }
      }
      throw new InternalServerErrorException(`failed to create house listing`);
    }
  }

  async findById(id: string) {
    const house = this.prisma.property.findUniqueOrThrow({ where: { id } });
    return house;
  }

  async findBySlug(slug: string) {
    const house = this.prisma.property.findUniqueOrThrow({ where: { slug } });
    return house;
  }

  async update(id: string, dto: UpdateHouseDto & { images?: any }) {
    const { details, images, ...propertydata } = dto;

    try {
      return this.prisma.$transaction(async (tx) => {
        const property = await tx.property.update({
          where: { id },
          data: { ...propertydata },
        });
        if (details) {
          await tx.houseDetails.upsert({
            where: { propertyId: id },
            create: { propertyId: id, ...details },
            update: details,
          });
        }
        if (images && images.length > 0) {
          await tx.propertyImage.deleteMany({ where: { propertyId: id } });
          await tx.propertyImage.createMany({
            data: images.map((img) => ({ ...img, propertyId: id })),
          });
        }
        return tx.property.findUniqueOrThrow({
          where: { id },
          include: { houseDetails: true, images: true },
        });
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new ConflictException(
            `An apartment with this slug already exists, please choose a unique title.`,
          );
        }
      }
      throw new InternalServerErrorException(
        `Failed to update apartment listing.`,
      );
    }
  }

  async findAll() {
    return this.prisma.property.findMany({
      where: { propertyType: 'HOUSE' },
      include: { houseDetails: true, images: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async delete(id: string) {
    try {
      return this.prisma.property.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`House id was nto found -> ${id}`);
        }
      }
      throw new InternalServerErrorException(
        `failed to delete property apartment`,
      );
    }
  }
}
