import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AffiliationsService } from './affilation.service';
import { CreateAffiliationDto } from './dto/create-affilations.dto';

@Controller('affiliations')
export class AffiliationsController {
  constructor(private readonly affiliationsService: AffiliationsService) {}
  @Get()
  getPublicAffiliations() {
    return this.affiliationsService.getPublicAffiliations();
  }

  @Get('admin')
  findAllAdmin() {
    return this.affiliationsService.findAllAdmin();
  }

  @Post()
  create(@Body() createAffiliationDto: CreateAffiliationDto) {
    return this.affiliationsService.create(createAffiliationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.affiliationsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAffiliationDto: CreateAffiliationDto,
  ) {
    return this.affiliationsService.update(id, updateAffiliationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.affiliationsService.remove(id);
  }
}
