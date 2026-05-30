import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { FaqService } from './faq.service';
import { UpdateFaqsDto } from './dtos/update-faqs.dto';
import { CreateFaqDto } from './dtos/create-faqs.dto';
import { Public } from 'src/modules/auth/public.decorator';

@Controller('faqs')
export class FaqsController {
  constructor(private readonly faqService: FaqService) {}

  @Post()
  async create(@Body() createFaqDto: CreateFaqDto) {
    return this.faqService.create(createFaqDto);
  }

  @Public()
  @Get()
  async findAll() {
    return this.faqService.findAll();
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.faqService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateFaqsDto: UpdateFaqsDto) {
    return this.faqService.update(id, updateFaqsDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.faqService.delete(id);
  }
}
