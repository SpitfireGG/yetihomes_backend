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
import { ApartmentsService } from './apartments.service';
import { CreateApartmentDtos } from './dto/create-apartment.dto';
import { UpdateApartmentDto } from './dto/update-apartment.dto';
import { ImageUploadInterceptor } from 'src/utils/image-upload.interceptor';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

@Controller('apartments')
export class ApartmentsController {
  constructor(private readonly apartmentsService: ApartmentsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(ImageUploadInterceptor('images', 'properties', 10, 3))
  async create(
    @Body('data') dataString: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    if (!dataString) throw new BadRequestException(`Property data is missing.`);

    let payload: object;
    try {
      payload = JSON.parse(dataString);
    } catch (e) {
      throw new BadRequestException('Invalid JSON format in data field.');
    }

    const dto = plainToInstance(CreateApartmentDtos, payload);

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

    const apartment =
      await this.apartmentsService.createApartment(finalPayload);

    return {
      success: true,
      message: 'Apartment listing created successfully.',
      data: apartment,
    };
  }

  @Get()
  async findAll() {
    return this.apartmentsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.apartmentsService.findOne(id);
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

    const dto = plainToInstance(UpdateApartmentDto, payload);

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

    console.log('raw dto: ', JSON.stringify(dto, null, 2));

    const updatedApartment = await this.apartmentsService.update(
      id,
      finalPayload,
    );

    return {
      success: true,
      message: 'Apartment listing updated successfully.',
      data: updatedApartment,
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.apartmentsService.delete(id);
    return {
      success: true,
      message: 'Apartment listing deleted successfully.',
    };
  }
}
