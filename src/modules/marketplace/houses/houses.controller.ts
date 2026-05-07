import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CreateHouseDto } from './dto/create-houses.dto';
import { HouseService } from './houses.service';
import { ImageUploadInterceptor } from 'src/utils/image-upload.interceptor';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

@Controller('houses')
export class HouseController {
  constructor(private readonly houseService: HouseService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(ImageUploadInterceptor('images', 'properties', 10, 3))
  async create(
    @Body('data') dataString: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    if (!dataString) throw new BadRequestException(`property data is missing `);
    let payload;
    try {
      payload = JSON.parse(dataString);
    } catch (e) {
      throw new BadRequestException('Invalid JSON format in data field');
    }

    const dto = plainToInstance(CreateHouseDto, payload);

    try {
      await validateOrReject(dto);
    } catch (errors) {
      const msg = errors
        .map((err: any) => Object.values(err.constraints))
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
    const house = await this.houseService.createHouses(finalPayload);

    return {
      success: true,
      message: 'House listing created successfully',
      data: house,
    };
  }

  /* @Get(':id')
  findOne(id: string) {
    return this.houseService.findOne(id);
  } */

  @Get()
  findAll() {
    return this.houseService.findAll();
  }
}
