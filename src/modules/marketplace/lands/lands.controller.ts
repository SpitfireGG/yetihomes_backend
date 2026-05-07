import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CreateLandDto } from './dto/create-land.dto';
import { UpdateLandDto } from './dto/update-land.dto';
import { ImageUploadInterceptor } from 'src/utils/image-upload.interceptor';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { LandService } from './lands.service';

@Controller('lands')
export class LandController {
  constructor(private readonly landService: LandService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(ImageUploadInterceptor('images', 'properties', 10, 3))
  async create(
    @Body('data') dataString: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    if (!dataString) throw new BadRequestException(`Property data is missing.`);

    let payload = Object;
    try {
      payload = JSON.parse(dataString);
    } catch (e) {
      throw new BadRequestException('Invalid JSON format in data field.');
    }

    const dto = plainToInstance(CreateLandDto, payload);

    try {
      await validateOrReject(dto);
    } catch (errors) {
      const msg = errors
        .map((err: any) =>
          err.constraints
            ? Object.values(err.constraints)
            : ['Validation failed'],
        )
        .flat();
      throw new BadRequestException(msg);
    }

    const imageData =
      files?.map((file, idx) => ({
        url: `/uploads/properties/${file.filename}`,
        altText: file.originalname,
        isPrimary: idx === 0,
        sortOrder: idx,
      })) || [];

    const finalPayload = {
      ...dto,
      images: imageData,
    };

    const land = await this.landService.createLands(finalPayload);

    return {
      success: true,
      message: 'Land listing created successfully.',
      data: land,
    };
  }

  @Get()
  async findAll() {
    return this.landService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.landService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(ImageUploadInterceptor('images', 'properties', 10, 3))
  async update(
    @Param('id') id: string,
    @Body('data') dataString: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    let payload = {};

    if (dataString) {
      try {
        payload = JSON.parse(dataString);
      } catch (e) {
        throw new BadRequestException('Invalid JSON format in data field.');
      }
    }

    const dto = plainToInstance(UpdateLandDto, payload);

    try {
      await validateOrReject(dto);
    } catch (errors) {
      const msg = errors
        .map((err: any) =>
          err.constraints
            ? Object.values(err.constraints)
            : ['Validation failed'],
        )
        .flat();
      throw new BadRequestException(msg);
    }

    const finalPayload: any = { ...dto };

    if (files && files.length > 0) {
      const imageData = files.map((file, idx) => ({
        url: `/uploads/properties/${file.filename}`,
        altText: file.originalname,
        isPrimary: idx === 0,
        sortOrder: idx,
      }));
      finalPayload.images = imageData;
    }

    const updatedLand = await this.landService.update(id, finalPayload);

    return {
      success: true,
      message: 'Land listing updated successfully.',
      data: updatedLand,
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.landService.delete(id);
    return {
      success: true,
      message: 'Land listing deleted successfully.',
    };
  }
}
