import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  NotFoundException,
  ParseUUIDPipe,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('amenities')
export class AmenitiesController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async findAll() {
    const amenities = await this.prisma.amenity.findMany({
      orderBy: { name: 'asc' },
    });
    return { success: true, data: amenities };
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const amenity = await this.prisma.amenity.findUnique({
      where: { id },
    });
    if (!amenity) {
      throw new NotFoundException('Amenity not found');
    }
    return { success: true, data: amenity };
  }

  @Post()
  async create(@Body() createAmenityDto: { name: string; icon?: string }) {
    const { name, icon } = createAmenityDto;

    if (!name || name.trim() === '') {
      throw new NotFoundException('Amenity name is required');
    }

    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const existing = await this.prisma.amenity.findFirst({
      where: {
        OR: [{ name }, { slug }],
      },
    });

    if (existing) {
      return {
        success: false,
        message: 'Amenity with this name already exists',
      };
    }

    const amenity = await this.prisma.amenity.create({
      data: { name, slug, icon },
    });

    return {
      success: true,
      message: 'Amenity created successfully',
      data: amenity,
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const existing = await this.prisma.amenity.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException('Amenity not found');
    }

    await this.prisma.amenity.delete({
      where: { id },
    });

    return {
      success: true,
      message: 'Amenity deleted successfully',
    };
  }
}
