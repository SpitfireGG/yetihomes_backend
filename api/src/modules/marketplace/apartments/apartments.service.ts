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
  servicesNearby: true,
};

@Injectable()
export class ApartmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async createApartment(dto: CreateApartmentDtos) {
    const {
      details,
      images,
      amenityIds,
      servicesNearby,
      ...propertyDataWithSeo
    } = dto as CreateApartmentDtos & { seo?: unknown };
    const propertyData = { ...propertyDataWithSeo };
    delete propertyData.seo;

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
          servicesNearby:
            servicesNearby && servicesNearby.length > 0
              ? {
                  create: servicesNearby.map((s) => ({
                    serviceType: s.serviceType,
                    name: s.name,
                  })),
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

  async findAll(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.property.findMany({
        where: { propertyType: PropertyType.APARTMENT },
        include: APARTMENT_INCLUDE,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.property.count({
        where: { propertyType: PropertyType.APARTMENT },
      }),
    ]);
    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
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

  async update(id: string, dto: UpdateApartmentDto) {
    await this.findOne(id);

    const { details, images, servicesNearby, ...propertyDataWithSeo } =
      dto as UpdateApartmentDto & { seo?: unknown };
    const propertyData = { ...propertyDataWithSeo };
    delete propertyData.seo;

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

        if (servicesNearby && Array.isArray(servicesNearby)) {
          await tx.serviceNearby.deleteMany({ where: { propertyId: id } });
          if (servicesNearby.length > 0) {
            await tx.serviceNearby.createMany({
              data: servicesNearby.map((s) => ({
                propertyId: id,
                serviceType: s.serviceType,
                name: s.name,
              })),
            });
          }
        }

        return tx.property.findUniqueOrThrow({
          where: { id },
          include: APARTMENT_INCLUDE,
        });
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Apartment with id ${id} was not found.`);
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
