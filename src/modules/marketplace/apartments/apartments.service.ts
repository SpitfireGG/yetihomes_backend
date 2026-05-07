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

@Injectable()
export class ApartmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async createApartment(dto: CreateApartmentDtos & { images?: any[] }) {
    const { details, images, ...propertyData } = dto;

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
        },
        include: { apartmentDetails: true, images: true },
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
      include: { apartmentDetails: true, images: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const apartment = await this.prisma.property.findUnique({
      where: { id },
      include: { apartmentDetails: true, images: true },
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
        const property = await tx.property.update({
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

        return tx.property.findUnique({
          where: { id },
          include: { apartmentDetails: true, images: true },
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

  async delete(id: string) {
    try {
      return this.prisma.property.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Apartment id was nto found -> ${id}`);
        }
      }
      throw new InternalServerErrorException(
        `failed to delete property apartment`,
      );
    }
  }
}
