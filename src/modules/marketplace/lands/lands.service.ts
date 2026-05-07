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

@Injectable()
export class LandService {
  constructor(private readonly prisma: PrismaService) {}

  async createLands(dto: CreateLandDto) {
    const { details, images, ...propertyData } = dto;

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
        },
        include: { landDetails: true, images: true },
      });
      return newLand;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(
            `a property with this slug already exists.`,
          );
        }
      }
      throw new InternalServerErrorException(`failed to create land listing`);
    }
  }

  async findAll() {
    return this.prisma.property.findMany({
      where: { propertyType: 'LAND' },
      include: { landDetails: true, images: true },
      orderBy: { createdAt: 'desc' },
    });
  }
  async findOne(id: string) {
    const Land = await this.prisma.property.findUnique({
      where: { id },
      include: { landDetails: true, images: true },
    });
    if (!Land)
      throw new NotFoundException(
        `Requested land id was not found #id -> ${id}`,
      );

    return Land;
  }

  async update(id: string, dto: UpdateLandDto) {
    await this.findOne(id);
    const { details, images, ...propertyData } = dto;
    try {
      return await this.prisma.property.update({
        where: { id },
        data: {
          ...propertyData,
          ...(details && {
            landDetails: {
              upsert: {
                create: details,
                update: details,
              },
            },
          }),
          ...(images &&
            images.length > 0 && {
              images: {
                create: images,
                deleteMany: {},
              },
            }),
        },
        include: { landDetails: true, images: true },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(
            `A property with the slug already exists, please choose an unique title`,
          );
        }
      }
      throw new InternalServerErrorException(`failed to update land listing`);
    }
  }

  async delete(id: string) {
    await this.findOne(id);
    return this.prisma.property.delete({
      where: { id },
    });
  }
}
