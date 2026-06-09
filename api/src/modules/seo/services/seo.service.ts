import { Injectable, BadRequestException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateLocationPageDto,
  CreatePropertyTypePageDto,
  CreateAgentDto,
  CreateRedirectRuleDto,
  isReservedSlug,
} from '../dto/seo-metadata.dto';

@Injectable()
export class SeoService {
  constructor(private prisma: PrismaService) {}

  async createLocationPage(dto: CreateLocationPageDto) {
    const { seo, ...pageData } = dto;

    if (seo?.slug) {
      await this.prisma.seoMetadata.create({
        data: {
          metaTitle: seo.metaTitle || null,
          metaDescription: seo.metaDescription || null,
          canonicalUrl: seo.canonicalUrl || null,
          slug: seo.slug,
          ogTitle: seo.ogTitle || null,
          ogDescription: seo.ogDescription || null,
          ogImageUrl: seo.ogImageUrl || null,
          twitterCard: seo.twitterCard || 'summary_large_image',
          noindex: seo.noindex ?? false,
          nofollow: seo.nofollow ?? false,
          focusKeyword: seo.focusKeyword || null,
          breadcrumbOverride: seo.breadcrumbOverride || null,
        },
      });
    }

    return this.prisma.locationPage.create({
      data: pageData as Prisma.LocationPageUncheckedCreateInput,
      include: { seoMetadata: true },
    });
  }

  async getLocationPages(activeOnly?: boolean) {
    return this.prisma.locationPage.findMany({
      where: activeOnly ? { isActive: true } : undefined,
      include: { seoMetadata: true },
      orderBy: { displayOrder: 'asc' },
    });
  }

  async getLocationPageBySlug(slug: string) {
    return this.prisma.locationPage.findUnique({
      where: { slug },
      include: { seoMetadata: true },
    });
  }

  async updateLocationPage(id: string, dto: CreateLocationPageDto) {
    const pageData = { ...dto };
    delete pageData.seo;
    return this.prisma.locationPage.update({
      where: { id },
      data: pageData as Prisma.LocationPageUncheckedUpdateInput,
      include: { seoMetadata: true },
    });
  }

  async deleteLocationPage(id: string) {
    return this.prisma.locationPage.delete({ where: { id } });
  }

  async createPropertyTypePage(dto: CreatePropertyTypePageDto) {
    const pageData = { ...dto };
    delete pageData.seo;
    return this.prisma.propertyTypePage.create({
      data: pageData as Prisma.PropertyTypePageUncheckedCreateInput,
      include: { seoMetadata: true },
    });
  }

  async getPropertyTypePages(activeOnly?: boolean) {
    return this.prisma.propertyTypePage.findMany({
      where: activeOnly ? { isActive: true } : undefined,
      include: { seoMetadata: true },
      orderBy: { displayOrder: 'asc' },
    });
  }

  async getPropertyTypePageBySlug(slug: string) {
    return this.prisma.propertyTypePage.findUnique({
      where: { slug },
      include: { seoMetadata: true },
    });
  }

  async createAgent(dto: CreateAgentDto) {
    const agentData = { ...dto };
    delete agentData.seo;
    return this.prisma.agent.create({
      data: agentData as Prisma.AgentUncheckedCreateInput,
      include: { seoMetadata: true },
    });
  }

  async getAgents(activeOnly?: boolean) {
    return this.prisma.agent.findMany({
      where: activeOnly ? { isActive: true } : undefined,
      include: { seoMetadata: true },
      orderBy: { displayOrder: 'asc' },
    });
  }

  async getAgentBySlug(slug: string) {
    return this.prisma.agent.findUnique({
      where: { slug },
      include: {
        seoMetadata: true,
        properties: {
          where: { status: 'PUBLISHED' },
          take: 10,
          select: { id: true, slug: true, title: true, priceAmount: true },
        },
      },
    });
  }

  async createRedirect(dto: CreateRedirectRuleDto) {
    if (isReservedSlug(dto.sourceUrl.replace(/^\//, ''))) {
      throw new BadRequestException('Cannot create redirect for reserved slug');
    }
    return this.prisma.redirectRule.create({
      data: {
        sourceUrl: dto.sourceUrl,
        targetUrl: dto.targetUrl,
        redirectType: dto.redirectType || 'PERMANENT',
      },
    });
  }

  async getRedirects() {
    return this.prisma.redirectRule.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async deleteRedirect(id: string) {
    return this.prisma.redirectRule.delete({ where: { id } });
  }
}
