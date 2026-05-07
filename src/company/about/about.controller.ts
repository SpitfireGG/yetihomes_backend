import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CompayInfoService } from './about.service';
import { CreateCompanyInfoDto } from './dtos/create-about-dto';
import { UpdateCompanyInfoDto } from './dtos/update-about-dto';

@Controller('company/about-us')
export class CompanyInfoController {
  constructor(private readonly companyInfoService: CompayInfoService) {}

  @Post()
  create(@Body() createCompanyInfoDto: CreateCompanyInfoDto) {
    return this.companyInfoService.create(createCompanyInfoDto);
  }
  @Get()
  findAll() {
    return this.companyInfoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyInfoService.findOne(id);
  }
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCompanyInfoDto: UpdateCompanyInfoDto,
  ) {
    return this.companyInfoService.update(id, updateCompanyInfoDto);
  }
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.companyInfoService.delete(id);
  }
}
