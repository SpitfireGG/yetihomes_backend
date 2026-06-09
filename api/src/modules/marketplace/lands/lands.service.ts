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
  servicesNearby: true,
};

@Injectable()
export class LandService {
  constructor(private readonly prisma: PrismaService) {}

  async createLands(dto: CreateLandDto) {
    const {
      details,
      images,
      amenityIds,
      servicesNearby,
      ...propertyDataWithSeo
    } = dto as CreateLandDto & { seo?: unknown };
    const propertyData = { ...propertyDataWithSeo };
    delete propertyData.seo;

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

  async findAll(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.property.findMany({
        where: { propertyType: 'LAND' },
        include: LAND_INCLUDE,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.property.count({ where: { propertyType: 'LAND' } }),
    ]);
    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
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
    const { details, images, servicesNearby, ...propertyDataWithSeo } =
      dto as UpdateLandDto & { seo?: unknown };
    const propertyData = { ...propertyDataWithSeo };
    delete propertyData.seo;
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
