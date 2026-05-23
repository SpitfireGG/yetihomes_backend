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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeoController = void 0;
const common_1 = require("@nestjs/common");
const seo_service_1 = require("../services/seo.service");
const slug_service_1 = require("../services/slug.service");
const seo_metadata_dto_1 = require("../dto/seo-metadata.dto");
let SeoController = class SeoController {
    seoService;
    slugService;
    constructor(seoService, slugService) {
        this.seoService = seoService;
        this.slugService = slugService;
    }
    async createLocationPage(dto) {
        const slug = dto.slug || (dto.name ? this.slugService.slugify(dto.name) : '');
        const uniqueSlug = await this.slugService.ensureUnique(slug, 'LocationPage');
        return this.seoService.createLocationPage({ ...dto, slug: uniqueSlug });
    }
    async getLocationPages(active) {
        return this.seoService.getLocationPages(active === 'true');
    }
    async getLocationPage(slug) {
        const page = await this.seoService.getLocationPageBySlug(slug);
        if (!page)
            throw new common_1.NotFoundException('Location page not found');
        return page;
    }
    async updateLocationPage(id, dto) {
        return this.seoService.updateLocationPage(id, dto);
    }
    async deleteLocationPage(id) {
        return this.seoService.deleteLocationPage(id);
    }
    async createPropertyTypePage(dto) {
        if (!dto.slug && dto.name) {
            dto.slug = this.slugService.slugify(dto.name);
        }
        const slug = dto.slug || '';
        const uniqueSlug = await this.slugService.ensureUnique(slug, 'PropertyTypePage');
        return this.seoService.createPropertyTypePage({ ...dto, slug: uniqueSlug });
    }
    async getPropertyTypePages(active) {
        return this.seoService.getPropertyTypePages(active === 'true');
    }
    async getPropertyTypePage(slug) {
        const page = await this.seoService.getPropertyTypePageBySlug(slug);
        if (!page)
            throw new common_1.NotFoundException('Property type page not found');
        return page;
    }
    async createAgent(dto) {
        const slug = dto.slug || (dto.name ? this.slugService.slugify(dto.name) : '');
        const uniqueSlug = await this.slugService.ensureUnique(slug, 'Agent');
        return this.seoService.createAgent({ ...dto, slug: uniqueSlug });
    }
    async getAgents(active) {
        return this.seoService.getAgents(active === 'true');
    }
    async getAgent(slug) {
        const agent = await this.seoService.getAgentBySlug(slug);
        if (!agent)
            throw new common_1.NotFoundException('Agent not found');
        return agent;
    }
    async createRedirect(dto) {
        return this.seoService.createRedirect(dto);
    }
    async getRedirects() {
        return this.seoService.getRedirects();
    }
    async deleteRedirect(id) {
        return this.seoService.deleteRedirect(id);
    }
    async validateSlug(body) {
        const exists = await this.slugService.checkSlugExists(body.slug || '', body.entityType || 'Property');
        if (exists) {
            throw new common_1.BadRequestException('Slug already exists');
        }
        return { valid: true, slug: body.slug };
    }
    async generateSlug(body) {
        const slug = this.slugService.slugify(body.text || '');
        return { slug };
    }
};
exports.SeoController = SeoController;
__decorate([
    (0, common_1.Post)('location-pages'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [seo_metadata_dto_1.CreateLocationPageDto]),
    __metadata("design:returntype", Promise)
], SeoController.prototype, "createLocationPage", null);
__decorate([
    (0, common_1.Get)('location-pages'),
    __param(0, (0, common_1.Query)('active')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SeoController.prototype, "getLocationPages", null);
__decorate([
    (0, common_1.Get)('location-pages/:slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SeoController.prototype, "getLocationPage", null);
__decorate([
    (0, common_1.Put)('location-pages/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, seo_metadata_dto_1.CreateLocationPageDto]),
    __metadata("design:returntype", Promise)
], SeoController.prototype, "updateLocationPage", null);
__decorate([
    (0, common_1.Delete)('location-pages/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SeoController.prototype, "deleteLocationPage", null);
__decorate([
    (0, common_1.Post)('property-type-pages'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [seo_metadata_dto_1.CreatePropertyTypePageDto]),
    __metadata("design:returntype", Promise)
], SeoController.prototype, "createPropertyTypePage", null);
__decorate([
    (0, common_1.Get)('property-type-pages'),
    __param(0, (0, common_1.Query)('active')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SeoController.prototype, "getPropertyTypePages", null);
__decorate([
    (0, common_1.Get)('property-type-pages/:slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SeoController.prototype, "getPropertyTypePage", null);
__decorate([
    (0, common_1.Post)('agents'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [seo_metadata_dto_1.CreateAgentDto]),
    __metadata("design:returntype", Promise)
], SeoController.prototype, "createAgent", null);
__decorate([
    (0, common_1.Get)('agents'),
    __param(0, (0, common_1.Query)('active')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SeoController.prototype, "getAgents", null);
__decorate([
    (0, common_1.Get)('agents/:slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SeoController.prototype, "getAgent", null);
__decorate([
    (0, common_1.Post)('redirects'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [seo_metadata_dto_1.CreateRedirectRuleDto]),
    __metadata("design:returntype", Promise)
], SeoController.prototype, "createRedirect", null);
__decorate([
    (0, common_1.Get)('redirects'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SeoController.prototype, "getRedirects", null);
__decorate([
    (0, common_1.Delete)('redirects/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SeoController.prototype, "deleteRedirect", null);
__decorate([
    (0, common_1.Post)('validate-slug'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SeoController.prototype, "validateSlug", null);
__decorate([
    (0, common_1.Post)('generate-slug'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SeoController.prototype, "generateSlug", null);
exports.SeoController = SeoController = __decorate([
    (0, common_1.Controller)('api/seo'),
    __metadata("design:paramtypes", [seo_service_1.SeoService,
        slug_service_1.SlugService])
], SeoController);
//# sourceMappingURL=seo.controller.js.map