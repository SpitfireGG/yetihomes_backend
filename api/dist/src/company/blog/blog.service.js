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
exports.BlogsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
let BlogsService = class BlogsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        try {
            if (dto.isFeatured) {
                await this.prisma.blogArticle.updateMany({
                    where: { isFeatured: true },
                    data: { isFeatured: false },
                });
            }
            return await this.prisma.blogArticle.create({
                data: dto,
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new common_1.ConflictException(`A blog article with this slug already exists.`);
                }
            }
            throw new common_1.InternalServerErrorException(`Failed to create blog article.`);
        }
    }
    async findAll() {
        return this.prisma.blogArticle.findMany({
            orderBy: [{ isFeatured: 'desc' }, { publishDate: 'desc' }],
        });
    }
    async findBySlug(slug) {
        try {
            return await this.prisma.blogArticle.findUniqueOrThrow({
                where: { slug },
            });
        }
        catch (error) {
            throw new common_1.NotFoundException(`Article with slug '${slug}' not found.`);
        }
    }
    async update(id, dto) {
        try {
            if (dto.isFeatured) {
                await this.prisma.blogArticle.updateMany({
                    where: { isFeatured: true, NOT: { id } },
                    data: { isFeatured: false },
                });
            }
            return await this.prisma.blogArticle.update({
                where: { id },
                data: dto,
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(`Failed to update blog article.`);
        }
    }
    async delete(id) {
        try {
            return await this.prisma.blogArticle.delete({
                where: { id },
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new common_1.NotFoundException(`Article ID not found -> ${id}`);
                }
            }
            throw new common_1.InternalServerErrorException(`Failed to delete blog article.`);
        }
    }
};
exports.BlogsService = BlogsService;
exports.BlogsService = BlogsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BlogsService);
//# sourceMappingURL=blog.service.js.map