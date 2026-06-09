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
  servicesNearby: true,
};

@Injectable()
export class HouseService {
  constructor(private readonly prisma: PrismaService) {}

  async createHouses(dto: CreateHouseDto) {
    const {
      details,
      images,
      amenityIds,
      servicesNearby,
      ...propertyDataWithSeo
    } = dto as CreateHouseDto & { seo?: unknown };
    const propertyData = { ...propertyDataWithSeo };
    delete propertyData.seo;

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

  async update(id: string, dto: UpdateHouseDto) {
    const { details, images, servicesNearby, ...propertyDataWithSeo } =
      dto as UpdateHouseDto & { seo?: unknown };
    const propertydata = { ...propertyDataWithSeo };
    delete propertydata.seo;

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
          include: HOUSE_INCLUDE,
        });
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`House with id ${id} was not found.`);
        }
      }
      throw new InternalServerErrorException(`Failed to update house listing.`);
    }
  }

  async findAll(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.property.findMany({
        where: { propertyType: 'HOUSE' },
        include: HOUSE_INCLUDE,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.property.count({ where: { propertyType: 'HOUSE' } }),
    ]);
    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
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
      throw new InternalServerErrorException(`Failed to delete house listing.`);
    }
  }
}
