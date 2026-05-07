import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { InquiriesService } from './enquiries.service';
import { CreateInquiryDto } from './dtos/create-enquiries.dto';
import { UpdateInquiryStatusDto } from './dtos/update-enquiries.dto';

@Controller('inquiries')
export class InquiriesController {
  constructor(private readonly inquiriesService: InquiriesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createInquiryDto: CreateInquiryDto) {
    const inquiry = await this.inquiriesService.create(createInquiryDto);
    return {
      success: true,
      message: 'Inquiry submitted successfully.',
      data: inquiry,
    };
  }

  @Get()
  async findAll() {
    return this.inquiriesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.inquiriesService.findOne(id);
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() updateInquiryStatusDto: UpdateInquiryStatusDto,
  ) {
    const updatedInquiry = await this.inquiriesService.updateStatus(
      id,
      updateInquiryStatusDto,
    );
    return {
      success: true,
      message: 'Inquiry status updated successfully.',
      data: updatedInquiry,
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.inquiriesService.delete(id);
    return {
      success: true,
      message: 'Inquiry deleted successfully.',
    };
  }
}
