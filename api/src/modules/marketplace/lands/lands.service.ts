import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateLandDto } from './dto/create-land.dto';
import { UpdateLandDto } from './dto/update-land.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

const LAND_INCLUDE = {
  landDetails: true,
  images: { orderBy: { sortOrder: 'asc' as const } },
  propertyAmenities: { include: { amenity: true } },
};

@Injectable()
export class LandService {
  constructor(private readonly prisma: PrismaService) {}

  async createLands(dto: CreateLandDto) {
    const { details, images, amenityIds, ...propertyData } = dto;

    try {
      const newLand = await this.prisma.property.create({
        data: {
          ...propertyData,
          propertyType: 'LAND',
          landDetails: {
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
        include: LAND_INCLUDE,
      });
      return newLand;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(
            `A property with this slug already exists.`,
          );
        }
      }
      throw new InternalServerErrorException(`Failed to create land listing`);
    }
  }

  async findAll() {
    return this.prisma.property.findMany({
      where: { propertyType: 'LAND' },
      include: LAND_INCLUDE,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const land = await this.prisma.property.findUnique({
      where: { id },
      include: LAND_INCLUDE,
    });
    if (!land)
      throw new NotFoundException(
        `Requested land id was not found #id -> ${id}`,
      );

    return land;
  }

  async update(id: string, dto: UpdateLandDto) {
    await this.findOne(id);
    const { details, images, ...propertyData } = dto;
    try {
      return await this.prisma.$transaction(async (tx) => {
        await tx.property.update({
          where: { id },
          data: { ...propertyData },
        });

        if (details) {
          await tx.landDetails.upsert({
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
          include: LAND_INCLUDE,
        });
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(
            `A property with the slug already exists, please choose a unique title`,
          );
        }
      }
      throw new InternalServerErrorException(`Failed to update land listing`);
    }
  }

  async delete(id: string) {
    await this.findOne(id);
    return this.prisma.property.delete({
      where: { id },
    });
  }
}
