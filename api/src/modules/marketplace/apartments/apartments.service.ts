import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, PropertyType } from '@prisma/client';
import { CreateApartmentDtos } from './dto/create-apartment.dto';
import { UpdateApartmentDto } from './dto/update-apartment.dto';

const APARTMENT_INCLUDE = {
  apartmentDetails: true,
  images: { orderBy: { sortOrder: 'asc' as const } },
  propertyAmenities: { include: { amenity: true } },
};

@Injectable()
export class ApartmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async createApartment(dto: CreateApartmentDtos & { images?: any[] }) {
    const { details, images, amenityIds, ...propertyData } = dto;

    try {
      const newApartment = await this.prisma.property.create({
        data: {
          ...propertyData,
          propertyType: PropertyType.APARTMENT,
          apartmentDetails: {
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
        include: APARTMENT_INCLUDE,
      });
      return newApartment;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(
            `An apartment with this slug already exists.`,
          );
        }
      }
      throw new InternalServerErrorException(
        `Failed to create apartment listing.`,
      );
    }
  }

  async findAll() {
    return this.prisma.property.findMany({
      where: { propertyType: PropertyType.APARTMENT },
      include: APARTMENT_INCLUDE,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const apartment = await this.prisma.property.findUnique({
      where: { id },
      include: APARTMENT_INCLUDE,
    });

    if (!apartment || apartment.propertyType !== PropertyType.APARTMENT) {
      throw new NotFoundException(
        `Requested apartment ID was not found: ${id}`,
      );
    }

    return apartment;
  }

  async update(id: string, dto: UpdateApartmentDto & { images?: any[] }) {
    await this.findOne(id);

    const { details, images, ...propertyData } = dto;

    try {
      return await this.prisma.$transaction(async (tx) => {
        await tx.property.update({
          where: { id },
          data: { ...propertyData },
        });

        if (details) {
          await tx.apartmentDetails.upsert({
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
          include: APARTMENT_INCLUDE,
        });
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(
            `Apartment with id ${id} was not found.`,
          );
        }
      }
      throw new InternalServerErrorException(
        `Failed to update apartment listing.`,
      );
    }
  }

  async delete(id: string) {
    try {
      return await this.prisma.property.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Apartment with id ${id} was not found.`);
        }
      }
      throw new InternalServerErrorException(
        `Failed to delete apartment listing.`,
      );
    }
  }
}
