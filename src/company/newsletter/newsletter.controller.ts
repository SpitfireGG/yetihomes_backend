import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NewsletterService } from './newsletter.service';
import { CreateNewsletterDto } from './dtos/create-newsletter.dto';
import { UpdateNewsletterDto } from './dtos/update-newsletter.dto';

@Controller('company/newsletters')
export class NewsletterController {
  constructor(private readonly newsletterService: NewsletterService) {}

  @Post()
  async create(@Body() createNewsletterDto: CreateNewsletterDto) {
    return this.newsletterService.create(createNewsletterDto);
  }

  @Get()
  async findAll() {
    return this.newsletterService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.newsletterService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateNewsletterDto: UpdateNewsletterDto,
  ) {
    return this.newsletterService.update(id, updateNewsletterDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.newsletterService.delete(id);
  }
}
