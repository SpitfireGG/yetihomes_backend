"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeoService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
const seo_metadata_dto_1 = require("../dto/seo-metadata.dto");
let SeoService = class SeoService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createLocationPage(dto) {
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
            data: pageData,
            include: { seoMetadata: true },
        });
    }
    async getLocationPages(activeOnly) {
        return this.prisma.locationPage.findMany({
            where: activeOnly ? { isActive: true } : undefined,
            include: { seoMetadata: true },
            orderBy: { displayOrder: 'asc' },
        });
    }
    async getLocationPageBySlug(slug) {
        return this.prisma.locationPage.findUnique({
            where: { slug },
            include: { seoMetadata: true },
        });
    }
    async updateLocationPage(id, dto) {
        const { seo, ...pageData } = dto;
        return this.prisma.locationPage.update({
            where: { id },
            data: pageData,
            include: { seoMetadata: true },
        });
    }
    async deleteLocationPage(id) {
        return this.prisma.locationPage.delete({ where: { id } });
    }
    async createPropertyTypePage(dto) {
        return this.prisma.propertyTypePage.create({
            data: dto,
            include: { seoMetadata: true },
        });
    }
    async getPropertyTypePages(activeOnly) {
        return this.prisma.propertyTypePage.findMany({
            where: activeOnly ? { isActive: true } : undefined,
            include: { seoMetadata: true },
            orderBy: { displayOrder: 'asc' },
        });
    }
    async getPropertyTypePageBySlug(slug) {
        return this.prisma.propertyTypePage.findUnique({
            where: { slug },
            include: { seoMetadata: true },
        });
    }
    async createAgent(dto) {
        return this.prisma.agent.create({
            data: dto,
            include: { seoMetadata: true },
        });
    }
    async getAgents(activeOnly) {
        return this.prisma.agent.findMany({
            where: activeOnly ? { isActive: true } : undefined,
            include: { seoMetadata: true },
            orderBy: { displayOrder: 'asc' },
        });
    }
    async getAgentBySlug(slug) {
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
    async createRedirect(dto) {
        if ((0, seo_metadata_dto_1.isReservedSlug)(dto.sourceUrl.replace(/^\//, ''))) {
            throw new common_1.BadRequestException('Cannot create redirect for reserved slug');
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
        return this.prisma.redirectRule.findMany({ orderBy: { createdAt: 'desc' } });
    }
    async deleteRedirect(id) {
        return this.prisma.redirectRule.delete({ where: { id } });
    }
};
exports.SeoService = SeoService;
exports.SeoService = SeoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SeoService);
//# sourceMappingURL=seo.service.js.map