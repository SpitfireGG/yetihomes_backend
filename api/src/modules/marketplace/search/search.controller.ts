import { Controller, Get, Param, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchPropertyDto } from './search.dto';
import { Public } from 'src/modules/auth/public.decorator';

@Controller('properties/search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Public()
  @Get()
  async search(@Query() dto: SearchPropertyDto) {
    return this.searchService.search(dto);
  }

  @Public()
  @Get('landing')
  async getLandingSummary() {
    return this.searchService.getLandingSummary();
  }

  @Public()
  @Get(':slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.searchService.getBySlug(slug);
  }
}
