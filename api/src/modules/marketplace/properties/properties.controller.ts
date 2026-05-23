import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ImageUploadInterceptor } from 'src/utils/image-upload.interceptor';
import { PropertyViewInterceptor } from 'src/modules/analytics/views/views.interceptor';
import 'multer';

const PROPERTY_SELECT = {
  id: true,
  title: true,
  slug: true,
  summary: true,
  propertyType: true,
  listingType: true,
  priceAmount: true,
  currency: true,
  pricePeriod: true,
  status: true,
  isFeatured: true,
  badgeLabel: true,
  badgeTone: true,
  locationText: true,
  district: true,
  city: true,
  areaValue: true,
  areaUnit: true,
  videoUrl: true,
  mapIframe: true,
  isVerified: true,
  createdAt: true,
} as const;

const FULL_INCLUDE = {
  images: {
    select: {
      id: true,
      url: true,
      altText: true,
      isPrimary: true,
      sortOrder: true,
    },
  },
  houseDetails: true,
  apartmentDetails: true,
  landDetails: true,
} as const;

const FULL_INCLUDE_WITH_AMENITIES = {
  images: {
    select: {
      id: true,
      url: true,
      altText: true,
      isPrimary: true,
      sortOrder: true,
    },
  },
  houseDetails: true,
  apartmentDetails: true,
  landDetails: true,
  propertyAmenities: {
    include: { amenity: { select: { id: true, name: true, icon: true } } },
  },
} as const;

@Controller('properties')
export class PropertiesController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async findAll() {
    const properties = await this.prisma.property.findMany({
      where: { status: { in: ['PUBLISHED', 'DRAFT'] } },
      select: PROPERTY_SELECT,
      orderBy: { createdAt: 'desc' },
    });
    return { data: properties };
  }

  @Get('admin/all')
  async findAllForAdmin() {
    const properties = await this.prisma.property.findMany({
      include: FULL_INCLUDE,
      orderBy: { createdAt: 'desc' },
    });
    return { data: properties };
  }

  @Get(':id')
  @UseInterceptors(PropertyViewInterceptor)
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const property = await this.prisma.property.findUnique({
      where: { id },
      include: FULL_INCLUDE_WITH_AMENITIES,
    });
    if (!property) {
      throw new BadRequestException('Property not found');
    }
    return { data: property };
  }

  @Post()
  @UseInterceptors(ImageUploadInterceptor('images', 'properties', 10, 3))
  async create(
    @Body('data') dataString: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    if (!dataString) {
      throw new BadRequestException('Property data is missing');
    }

    let payload: any;
    try {
      payload = JSON.parse(dataString);
    } catch (e) {
      throw new BadRequestException('Invalid JSON format in data field');
    }

    const {
      title,
      slug,
      summary,
      description,
      propertyType,
      listingType,
      priceAmount,
      currency,
      pricePeriod,
      status,
      isFeatured,
      badgeLabel,
      badgeTone,
      locationText,
      district,
      city,
      latitude,
      longitude,
      areaValue,
      areaUnit,
      titleStatus,
      waterAvailability,
      electricity,
      isVerified,
      isOwnerApproved,
      videoUrl,
      mapIframe,
      houseDetails,
      apartmentDetails,
      landDetails,
      details,
      amenityIds,
    } = payload;

    const finalDetails =
      details || houseDetails || apartmentDetails || landDetails;

    const imageData =
      files?.map((file, idx) => ({
        url: `/uploads/properties/${file.filename}`,
        altText: file.originalname,
        isPrimary: idx === 0,
        sortOrder: idx,
      })) || [];

    const property = await this.prisma.property.create({
      data: {
        title,
        slug,
        summary,
        description,
        propertyType,
        listingType,
        priceAmount: Number(priceAmount),
        currency,
        pricePeriod,
        status: status || 'DRAFT',
        isFeatured: isFeatured || false,
        badgeLabel,
        badgeTone,
        locationText,
        district,
        city,
        latitude: latitude ? Number(latitude) : null,
        longitude: longitude ? Number(longitude) : null,
        areaValue: areaValue ? Number(areaValue) : null,
        areaUnit,
        titleStatus,
        waterAvailability,
        electricity,
        isVerified: isVerified || false,
        isOwnerApproved: isOwnerApproved || false,
        videoUrl,
        mapIframe,
        ...(finalDetails &&
          propertyType === 'HOUSE' && {
            houseDetails: { create: finalDetails },
          }),
        ...(finalDetails &&
          propertyType === 'APARTMENT' && {
            apartmentDetails: { create: finalDetails },
          }),
        ...(finalDetails &&
          propertyType === 'LAND' && { landDetails: { create: finalDetails } }),
        ...(imageData.length > 0 && { images: { create: imageData } }),
      },
      include: FULL_INCLUDE,
    });

    if (amenityIds?.length > 0) {
      await this.prisma.propertyAmenity.createMany({
        data: amenityIds.map((amenityId: string) => ({
          propertyId: property.id,
          amenityId,
        })),
        skipDuplicates: true,
      });
    }

    return {
      success: true,
      message: 'Property created successfully',
      data: property,
    };
  }

  @Patch(':id')
  @UseInterceptors(ImageUploadInterceptor('images', 'properties', 10, 3))
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('data') dataString: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    if (!dataString) {
      throw new BadRequestException('Property data is missing');
    }

    let dto: any;
    try {
      dto = JSON.parse(dataString);
    } catch (e) {
      throw new BadRequestException('Invalid JSON format in data field');
    }

    const {
      title,
      slug,
      summary,
      description,
      propertyType,
      listingType,
      priceAmount,
      currency,
      pricePeriod,
      status,
      isFeatured,
      badgeLabel,
      badgeTone,
      locationText,
      district,
      city,
      latitude,
      longitude,
      areaValue,
      areaUnit,
      titleStatus,
      waterAvailability,
      electricity,
      isVerified,
      isOwnerApproved,
      videoUrl,
      mapIframe,
      houseDetails,
      apartmentDetails,
      landDetails,
      details,
      imagesToDelete,
      amenityIds,
    } = dto;

    const finalDetails =
      details || houseDetails || apartmentDetails || landDetails;

    await this.prisma.$transaction(async (tx) => {
      if (imagesToDelete?.length > 0) {
        await tx.propertyImage.deleteMany({
          where: { id: { in: imagesToDelete } },
        });
      }

      if (propertyType === 'HOUSE' && finalDetails) {
        await tx.houseDetails.upsert({
          where: { propertyId: id },
          update: finalDetails,
          create: { ...finalDetails, propertyId: id },
        });
      }
      if (propertyType === 'APARTMENT' && finalDetails) {
        await tx.apartmentDetails.upsert({
          where: { propertyId: id },
          update: finalDetails,
          create: { ...finalDetails, propertyId: id },
        });
      }
      if (propertyType === 'LAND' && finalDetails) {
        await tx.landDetails.upsert({
          where: { propertyId: id },
          update: finalDetails,
          create: { ...finalDetails, propertyId: id },
        });
      }

      if (files?.length > 0) {
        await tx.propertyImage.createMany({
          data: files.map((file: Express.Multer.File) => ({
            propertyId: id,
            url: `/uploads/properties/${file.filename}`,
            isPrimary: false,
          })),
        });
      }

      if (amenityIds && Array.isArray(amenityIds)) {
        await tx.propertyAmenity.deleteMany({ where: { propertyId: id } });
        if (amenityIds.length > 0) {
          await tx.propertyAmenity.createMany({
            data: amenityIds.map((amenityId: string) => ({
              propertyId: id,
              amenityId,
            })),
          });
        }
      }

      await tx.property.update({
        where: { id },
        data: {
          title,
          slug,
          summary,
          description,
          propertyType,
          listingType,
          priceAmount,
          currency,
          pricePeriod,
          status,
          isFeatured,
          badgeLabel,
          badgeTone,
          locationText,
          district,
          city,
          latitude,
          longitude,
          areaValue,
          areaUnit,
          titleStatus,
          waterAvailability,
          electricity,
          isVerified,
          isOwnerApproved,
          videoUrl,
          mapIframe,
        },
      });
    });

    const property = await this.prisma.property.findUnique({
      where: { id },
      include: FULL_INCLUDE_WITH_AMENITIES,
    });

    return {
      success: true,
      message: 'Property updated successfully',
      data: property,
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const exists = await this.prisma.property.findUnique({
      where: { id },
      select: { id: true },
    });
    if (!exists) {
      throw new NotFoundException('Property not found');
    }

    await this.prisma.property.update({
      where: { id },
      data: { status: 'ARCHIVED' },
    });
    return { success: true, message: 'Property archived successfully' };
  }

  @Patch(':id/mark-sold')
  async markAsSold(@Param('id', ParseUUIDPipe) id: string) {
    const property = await this.prisma.property.update({
      where: { id },
      data: { status: 'SOLD' },
      select: { id: true, status: true },
    });
    if (!property) {
      throw new NotFoundException('Property not found');
    }
    return {
      success: true,
      message: 'Property marked as sold',
      data: property,
    };
  }

  @Patch(':id/mark-rented')
  async markAsRented(@Param('id', ParseUUIDPipe) id: string) {
    const property = await this.prisma.property.update({
      where: { id },
      data: { status: 'RENTED' },
      select: { id: true, status: true },
    });
    if (!property) {
      throw new NotFoundException('Property not found');
    }
    return {
      success: true,
      message: 'Property marked as rented',
      data: property,
    };
  }

  @Patch(':id/publish')
  async publish(@Param('id', ParseUUIDPipe) id: string) {
    const property = await this.prisma.property.update({
      where: { id },
      data: { status: 'PUBLISHED', publishedAt: new Date() },
      select: { id: true, status: true, publishedAt: true },
    });
    if (!property) {
      throw new NotFoundException('Property not found');
    }
    return { success: true, message: 'Property published', data: property };
  }

  @Patch(':id/draft')
  async unpublish(@Param('id', ParseUUIDPipe) id: string) {
    const property = await this.prisma.property.update({
      where: { id },
      data: { status: 'DRAFT' },
      select: { id: true, status: true },
    });
    if (!property) {
      throw new NotFoundException('Property not found');
    }
    return { success: true, message: 'Property set to draft', data: property };
  }
}
