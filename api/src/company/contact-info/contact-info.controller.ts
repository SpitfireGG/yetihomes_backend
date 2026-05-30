import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ContactInfoService } from './contact-info.service';
import { CreateContactInfoDto } from './dto/create-contact-info.dto';
import { UpdateContactInfoDto } from './dto/update-contact-info.dto';
import { CreateSocialMediaDto } from './dto/create-social-media.dto';
import { UpdateSocialMediaDto } from './dto/update-social-media.dto';
import { Public } from 'src/modules/auth/public.decorator';

@Controller('company/contact-info')
export class ContactInfoController {
  constructor(
    private readonly contactInfoService: ContactInfoService,
  ) {}

  @Post()
  create(@Body() dto: CreateContactInfoDto) {
    return this.contactInfoService.create(dto);
  }

  @Public()
  @Get()
  findAll() {
    return this.contactInfoService.findAll();
  }

  @Post('social-media')
  createSocialMedia(@Body() dto: CreateSocialMediaDto) {
    return this.contactInfoService.createSocialMedia(dto);
  }

  @Public()
  @Get('social-media')
  findAllSocialMedia() {
    return this.contactInfoService.findAllSocialMedia();
  }

  @Public()
  @Get('social-media/:id')
  findOneSocialMedia(@Param('id') id: string) {
    return this.contactInfoService.findOneSocialMedia(id);
  }

  @Patch('social-media/:id')
  updateSocialMedia(
    @Param('id') id: string,
    @Body() dto: UpdateSocialMediaDto,
  ) {
    return this.contactInfoService.updateSocialMedia(id, dto);
  }

  @Delete('social-media/:id')
  deleteSocialMedia(@Param('id') id: string) {
    return this.contactInfoService.deleteSocialMedia(id);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactInfoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateContactInfoDto) {
    return this.contactInfoService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.contactInfoService.delete(id);
  }
}
