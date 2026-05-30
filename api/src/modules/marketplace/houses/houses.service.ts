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

const HOUSE_INCLUDE = {
  houseDetails: true,
  images: { orderBy: { sortOrder: 'asc' as const } },
  propertyAmenities: { include: { amenity: true } },
};

@Injectable()
export class HouseService {
  constructor(private readonly prisma: PrismaService) {}

  async createHouses(dto: CreateHouseDto) {
    const { details, images, amenityIds, ...propertyData } = dto;

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
          propertyAmenities:
            amenityIds && amenityIds.length > 0
              ? {
                  create: amenityIds.map((amenityId) => ({ amenityId })),
                }
              : undefined,
        },
        include: HOUSE_INCLUDE,
      });
      return newHouse;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(
            `A property with this slug already exists.`,
          );
        }
      }
      throw new InternalServerErrorException(`Failed to create house listing`);
    }
  }

  async findById(id: string) {
    const house = await this.prisma.property.findUniqueOrThrow({
      where: { id },
      include: HOUSE_INCLUDE,
    });
    return house;
  }

  async findBySlug(slug: string) {
    const house = await this.prisma.property.findUniqueOrThrow({
      where: { slug },
      include: HOUSE_INCLUDE,
    });
    return house;
  }

  async update(id: string, dto: UpdateHouseDto & { images?: any }) {
    const { details, images, ...propertydata } = dto;

    try {
      return await this.prisma.$transaction(async (tx) => {
        await tx.property.update({
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
          include: HOUSE_INCLUDE,
        });
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`House with id ${id} was not found.`);
        }
      }
      throw new InternalServerErrorException(
        `Failed to update house listing.`,
      );
    }
  }

  async findAll() {
    return this.prisma.property.findMany({
      where: { propertyType: 'HOUSE' },
      include: HOUSE_INCLUDE,
      orderBy: { createdAt: 'desc' },
    });
  }

  async delete(id: string) {
    try {
      return await this.prisma.property.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`House with id ${id} was not found.`);
        }
      }
      throw new InternalServerErrorException(
        `Failed to delete house listing.`,
      );
    }
  }
}
