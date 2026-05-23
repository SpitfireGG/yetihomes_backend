import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Param,
  Patch,
  Delete,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ImageUploadInterceptor } from 'src/utils/image-upload.interceptor';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { ReviewsService } from './review.service';
import { CreateReviewDto } from './dto/create-reviews.dto';
import { UpdateReviewDto } from './dto/update-reviews.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(ImageUploadInterceptor('images', 'reviews', 1, 3))
  async create(
    @Body('data') dataString: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    if (!dataString) throw new BadRequestException(`Review data is missing.`);

    let payload;
    try {
      payload = JSON.parse(dataString);
    } catch (e) {
      throw new BadRequestException('Invalid JSON format in data field');
    }

    const dto = plainToInstance(CreateReviewDto, payload);

    try {
      await validateOrReject(dto);
    } catch (errors) {
      const msg = errors
        .map((err: any) => Object.values(err.constraints))
        .flat();
      throw new BadRequestException(msg);
    }

    const image =
      files && files[0] ? `/uploads/reviews/${files[0].filename}` : undefined;

    const finalPayload = {
      ...dto,
      image,
    };

    const review = await this.reviewsService.create(finalPayload);

    return {
      success: true,
      message: 'Review created successfully',
      data: review,
    };
  }

  @Get()
  findAll() {
    return this.reviewsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewsService.findById(id);
  }

  @Patch(':id')
  @UseInterceptors(ImageUploadInterceptor('images', 'reviews', 1, 3))
  async update(
    @Param('id') id: string,
    @Body('data') dataString: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    if (!dataString) throw new BadRequestException(`Review data is missing.`);

    let payload;
    try {
      payload = JSON.parse(dataString);
    } catch (e) {
      throw new BadRequestException('Invalid JSON format in data field');
    }

    const dto = plainToInstance(UpdateReviewDto, payload);

    try {
      await validateOrReject(dto);
    } catch (errors) {
      const msg = errors
        .map((err: any) => Object.values(err.constraints))
        .flat();
      throw new BadRequestException(msg);
    }

    const image =
      files && files[0] ? `/uploads/reviews/${files[0].filename}` : undefined;

    const finalPayload = {
      ...dto,
      ...(image && { image }),
    };

    const updatedReview = await this.reviewsService.update(id, finalPayload);

    return {
      success: true,
      message: 'Review updated successfully',
      data: updatedReview,
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewsService.delete(id);
  }
}
