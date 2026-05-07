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
import { Express } from 'express';
import 'multer';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async findAll() {
    const properties = await this.prisma.property.findMany({
      where: { status: 'PUBLISHED' },
      include: {
        images: true,
        houseDetails: true,
        apartmentDetails: true,
        landDetails: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    return { data: properties };
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const property = await this.prisma.property.findUnique({
      where: { id },
      include: {
        images: true,
        houseDetails: true,
        apartmentDetails: true,
        landDetails: true,
        propertyAmenities: {
          include: { amenity: true },
        },
      },
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

    let payload;
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
    } = payload;

    const finalDetails = details || houseDetails || apartmentDetails || landDetails;

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
        ...(finalDetails && {
          houseDetails:
            propertyType === 'HOUSE'
              ? {
                  create: finalDetails,
                }
              : undefined,
          apartmentDetails:
            propertyType === 'APARTMENT'
              ? {
                  create: finalDetails,
                }
              : undefined,
          landDetails:
            propertyType === 'LAND'
              ? {
                  create: finalDetails,
                }
              : undefined,
        }),
        ...(imageData.length > 0 && {
          images: {
            create: imageData,
          },
        }),
      },
      include: {
        images: true,
        houseDetails: true,
        apartmentDetails: true,
        landDetails: true,
      },
    });

    return {
      success: true,
      message: 'Property created successfully',
      data: property,
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePropertyDto: any,
  ) {
    const existing = await this.prisma.property.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('Property not found');
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
    } = updatePropertyDto;

    const finalDetails = details || houseDetails || apartmentDetails || landDetails;

    if (propertyType === 'HOUSE' && finalDetails) {
      await this.prisma.houseDetails.upsert({
        where: { propertyId: id },
        update: finalDetails,
        create: { ...finalDetails, propertyId: id },
      });
    }

    if (propertyType === 'APARTMENT' && finalDetails) {
      await this.prisma.apartmentDetails.upsert({
        where: { propertyId: id },
        update: finalDetails,
        create: { ...finalDetails, propertyId: id },
      });
    }

    if (propertyType === 'LAND' && finalDetails) {
      await this.prisma.landDetails.upsert({
        where: { propertyId: id },
        update: finalDetails,
        create: { ...finalDetails, propertyId: id },
      });
    }

    const property = await this.prisma.property.update({
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
      include: {
        images: true,
        houseDetails: true,
        apartmentDetails: true,
        landDetails: true,
      },
    });

    return { data: property };
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const existing = await this.prisma.property.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('Property not found');
    }

    await this.prisma.property.update({
      where: { id },
      data: { status: 'ARCHIVED' },
    });
    return { message: 'Property archived successfully' };
  }

  @Patch(':id/mark-sold')
  async markAsSold(@Param('id', ParseUUIDPipe) id: string) {
    const existing = await this.prisma.property.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('Property not found');
    }

    const property = await this.prisma.property.update({
      where: { id },
      data: { status: 'SOLD' },
    });

    return {
      success: true,
      message: 'Property marked as sold',
      data: property,
    };
  }

  @Patch(':id/mark-rented')
  async markAsRented(@Param('id', ParseUUIDPipe) id: string) {
    const existing = await this.prisma.property.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('Property not found');
    }

    const property = await this.prisma.property.update({
      where: { id },
      data: { status: 'RENTED' },
    });

    return {
      success: true,
      message: 'Property marked as rented',
      data: property,
    };
  }

  @Patch(':id/publish')
  async publish(@Param('id', ParseUUIDPipe) id: string) {
    const existing = await this.prisma.property.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('Property not found');
    }

    const property = await this.prisma.property.update({
      where: { id },
      data: { status: 'PUBLISHED' },
    });

    return {
      success: true,
      message: 'Property published',
      data: property,
    };
  }

  @Patch(':id/draft')
  async unpublish(@Param('id', ParseUUIDPipe) id: string) {
    const existing = await this.prisma.property.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('Property not found');
    }

    const property = await this.prisma.property.update({
      where: { id },
      data: { status: 'DRAFT' },
    });

    return {
      success: true,
      message: 'Property set to draft',
      data: property,
    };
  }
}