import { Controller, Get, Param, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchPropertyDto } from './search.dto';

@Controller('properties/search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  async search(@Query() dto: SearchPropertyDto) {
    return this.searchService.search(dto);
  }

  @Get('landing')
  async getLandingSummary() {
    return this.searchService.getLandingSummary();
  }

  @Get(':slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.searchService.getBySlug(slug);
  }
}
