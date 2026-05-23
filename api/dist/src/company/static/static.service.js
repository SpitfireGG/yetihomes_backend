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
exports.StaticPageService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let StaticPageService = class StaticPageService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const existing = await this.prisma.staticPage.findUnique({
            where: { slug: dto.slug },
        });
        if (existing) {
            throw new common_1.ConflictException('A page with this slug already exists.');
        }
        return this.prisma.staticPage.create({ data: dto });
    }
    async findAll() {
        return this.prisma.staticPage.findMany({
            orderBy: { displayOrder: 'asc' },
        });
    }
    async findBySlug(slug) {
        const page = await this.prisma.staticPage.findUnique({
            where: { slug },
        });
        if (!page) {
            throw new common_1.NotFoundException('Page not found.');
        }
        return page;
    }
    async findByType(type) {
        const page = await this.prisma.staticPage.findFirst({
            where: { pageType: type, isActive: true },
        });
        if (!page) {
            throw new common_1.NotFoundException(`${type} page not found.`);
        }
        return page;
    }
    async findOne(id) {
        const page = await this.prisma.staticPage.findUnique({
            where: { id },
        });
        if (!page) {
            throw new common_1.NotFoundException('Page not found.');
        }
        return page;
    }
    async update(id, dto) {
        const page = await this.prisma.staticPage.findUnique({
            where: { id },
        });
        if (!page)
            throw new common_1.NotFoundException('Page not found');
        return this.prisma.staticPage.update({
            where: { id },
            data: dto,
        });
    }
    async delete(id) {
        const page = await this.prisma.staticPage.findUnique({
            where: { id },
        });
        if (!page)
            throw new common_1.NotFoundException('Page not found');
        return this.prisma.staticPage.delete({ where: { id } });
    }
};
exports.StaticPageService = StaticPageService;
exports.StaticPageService = StaticPageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StaticPageService);
//# sourceMappingURL=static.service.js.map