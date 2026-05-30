import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { SeoService } from '../services/seo.service';
import { SlugService } from '../services/slug.service';
import {
  CreateLocationPageDto,
  CreatePropertyTypePageDto,
  CreateAgentDto,
  CreateRedirectRuleDto,
} from '../dto/seo-metadata.dto';
import { Public } from 'src/modules/auth/public.decorator';

@Controller('seo')
export class SeoController {
  constructor(
    private readonly seoService: SeoService,
    private readonly slugService: SlugService,
  ) {}

  @Post('location-pages')
  async createLocationPage(@Body() dto: CreateLocationPageDto) {
    const slug =
      dto.slug || (dto.name ? this.slugService.slugify(dto.name) : '');
    const uniqueSlug = await this.slugService.ensureUnique(
      slug,
      'LocationPage',
    );
    return this.seoService.createLocationPage({ ...dto, slug: uniqueSlug });
  }

  @Public()
  @Get('location-pages')
  async getLocationPages(@Query('active') active?: string) {
    return this.seoService.getLocationPages(active === 'true');
  }

  @Public()
  @Get('location-pages/:slug')
  async getLocationPage(@Param('slug') slug: string) {
    const page = await this.seoService.getLocationPageBySlug(slug);
    if (!page) throw new NotFoundException('Location page not found');
    return page;
  }

  @Put('location-pages/:id')
  async updateLocationPage(
    @Param('id') id: string,
    @Body() dto: CreateLocationPageDto,
  ) {
    return this.seoService.updateLocationPage(id, dto);
  }

  @Delete('location-pages/:id')
  async deleteLocationPage(@Param('id') id: string) {
    return this.seoService.deleteLocationPage(id);
  }

  @Post('property-type-pages')
  async createPropertyTypePage(@Body() dto: CreatePropertyTypePageDto) {
    if (!dto.slug && dto.name) {
      dto.slug = this.slugService.slugify(dto.name);
    }
    const slug = dto.slug || '';
    const uniqueSlug = await this.slugService.ensureUnique(
      slug,
      'PropertyTypePage',
    );
    return this.seoService.createPropertyTypePage({ ...dto, slug: uniqueSlug });
  }

  @Public()
  @Get('property-type-pages')
  async getPropertyTypePages(@Query('active') active?: string) {
    return this.seoService.getPropertyTypePages(active === 'true');
  }

  @Public()
  @Get('property-type-pages/:slug')
  async getPropertyTypePage(@Param('slug') slug: string) {
    const page = await this.seoService.getPropertyTypePageBySlug(slug);
    if (!page) throw new NotFoundException('Property type page not found');
    return page;
  }

  @Post('agents')
  async createAgent(@Body() dto: CreateAgentDto) {
    const slug =
      dto.slug || (dto.name ? this.slugService.slugify(dto.name) : '');
    const uniqueSlug = await this.slugService.ensureUnique(slug, 'Agent');
    return this.seoService.createAgent({ ...dto, slug: uniqueSlug });
  }

  @Public()
  @Get('agents')
  async getAgents(@Query('active') active?: string) {
    return this.seoService.getAgents(active === 'true');
  }

  @Public()
  @Get('agents/:slug')
  async getAgent(@Param('slug') slug: string) {
    const agent = await this.seoService.getAgentBySlug(slug);
    if (!agent) throw new NotFoundException('Agent not found');
    return agent;
  }

  @Post('redirects')
  async createRedirect(@Body() dto: CreateRedirectRuleDto) {
    return this.seoService.createRedirect(dto);
  }

  @Public()
  @Get('redirects')
  async getRedirects() {
    return this.seoService.getRedirects();
  }

  @Delete('redirects/:id')
  async deleteRedirect(@Param('id') id: string) {
    return this.seoService.deleteRedirect(id);
  }

  @Post('validate-slug')
  async validateSlug(@Body() body: { slug: string; entityType?: string }) {
    const exists = await this.slugService.checkSlugExists(
      body.slug || '',
      body.entityType || 'Property',
    );
    if (exists) {
      throw new BadRequestException('Slug already exists');
    }
    return { valid: true, slug: body.slug };
  }

  @Post('generate-slug')
  async generateSlug(@Body() body: { text: string; entityType?: string }) {
    const slug = this.slugService.slugify(body.text || '');
    return { slug };
  }
}
