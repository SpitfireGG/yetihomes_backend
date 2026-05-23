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
exports.TeamService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
const slug_service_1 = require("../../modules/seo/services/slug.service");
let TeamService = class TeamService {
    prisma;
    slugService;
    constructor(prisma, slugService) {
        this.prisma = prisma;
        this.slugService = slugService;
    }
    async create(dto) {
        try {
            const slug = dto.slug || this.slugService.slugify(dto.name);
            const uniqueSlug = await this.slugService.ensureUnique(slug, 'TeamMember');
            const newMember = await this.prisma.teamMember.create({
                data: { ...dto, slug: uniqueSlug },
            });
            return newMember;
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new common_1.ConflictException('A team member with this email already exists.');
                }
            }
            throw new common_1.InternalServerErrorException('Failed to create team member.');
        }
    }
    async findAll() {
        return this.prisma.teamMember.findMany({
            orderBy: { createdAt: 'asc' },
        });
    }
    async findById(id) {
        try {
            return await this.prisma.teamMember.findUniqueOrThrow({ where: { id } });
        }
        catch (error) {
            throw new common_1.NotFoundException(`Team member with ID ${id} not found.`);
        }
    }
    async update(id, dto) {
        try {
            const updatedMember = await this.prisma.teamMember.update({
                where: { id },
                data: dto,
            });
            return updatedMember;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(`Failed to update team member.`);
        }
    }
    async delete(id) {
        try {
            return await this.prisma.teamMember.delete({
                where: { id },
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new common_1.NotFoundException(`Team member ID not found -> ${id}`);
                }
            }
            throw new common_1.InternalServerErrorException(`Failed to delete team member.`);
        }
    }
};
exports.TeamService = TeamService;
exports.TeamService = TeamService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        slug_service_1.SlugService])
], TeamService);
//# sourceMappingURL=team.service.js.map