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
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { ImageUploadInterceptor } from 'src/utils/image-upload.interceptor';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { BlogsService } from './blog.service';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(ImageUploadInterceptor('images', 'blogs', 2, 3))
  async create(
    @Body('data') dataString: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    if (!dataString) throw new BadRequestException(`Blog data is missing.`);

    let payload;
    try {
      payload = JSON.parse(dataString);
    } catch (e) {
      throw new BadRequestException('Invalid JSON format in data field');
    }

    const dto = plainToInstance(CreateBlogDto, payload);

    try {
      await validateOrReject(dto);
    } catch (errors) {
      const msg = errors
        .map((err: any) => Object.values(err.constraints))
        .flat();
      throw new BadRequestException(msg);
    }

    const coverImage =
      files && files[0] ? `/uploads/blogs/${files[0].filename}` : undefined;
    const authorImage =
      files && files[1] ? `/uploads/blogs/${files[1].filename}` : undefined;

    const finalPayload = {
      ...dto,
      coverImage,
      authorImage,
    };

    const article = await this.blogsService.create(finalPayload);

    return {
      success: true,
      message: 'Article published successfully',
      data: article,
    };
  }

  @Get()
  findAll() {
    return this.blogsService.findAll();
  }

  @Get(':slug')
  findBySlug(@Param('slug') slug: string) {
    return this.blogsService.findBySlug(slug);
  }

  @Patch(':id')
  @UseInterceptors(ImageUploadInterceptor('images', 'blogs', 2, 3))
  async update(
    @Param('id') id: string,
    @Body('data') dataString: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    if (!dataString) throw new BadRequestException(`Blog data is missing.`);

    let payload;
    try {
      payload = JSON.parse(dataString);
    } catch (e) {
      throw new BadRequestException('Invalid JSON format in data field');
    }

    const dto = plainToInstance(UpdateBlogDto, payload);

    try {
      await validateOrReject(dto);
    } catch (errors) {
      const msg = errors
        .map((err: any) => Object.values(err.constraints))
        .flat();
      throw new BadRequestException(msg);
    }

    const coverImage =
      files && files[0] ? `/uploads/blogs/${files[0].filename}` : undefined;
    const authorImage =
      files && files[1] ? `/uploads/blogs/${files[1].filename}` : undefined;

    const finalPayload = {
      ...dto,
      ...(coverImage && { coverImage }),
      ...(authorImage && { authorImage }),
    };

    const updatedArticle = await this.blogsService.update(id, finalPayload);

    return {
      success: true,
      message: 'Article updated successfully',
      data: updatedArticle,
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogsService.delete(id);
  }
}
