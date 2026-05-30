import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { StaticPageService } from './static.service';
import { CreateStaticPageDto } from './dto/create-static.dto';
import { Public } from 'src/modules/auth/public.decorator';

@Controller('content')
export class StaticPageController {
  constructor(private readonly staticPageService: StaticPageService) {}

  @Post()
  create(@Body() createStaticPageDto: CreateStaticPageDto) {
    return this.staticPageService.create(createStaticPageDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.staticPageService.findAll();
  }

  @Public()
  @Get('type/:type')
  findByType(@Param('type') type: string) {
    return this.staticPageService.findByType(type as any);
  }

  @Public()
  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.staticPageService.findBySlug(slug);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.staticPageService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStaticPageDto: CreateStaticPageDto,
  ) {
    return this.staticPageService.update(id, updateStaticPageDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.staticPageService.delete(id);
  }
}