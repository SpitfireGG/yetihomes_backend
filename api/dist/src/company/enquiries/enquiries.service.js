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
exports.InquiriesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let InquiriesService = class InquiriesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        if (dto.propertyId) {
            const propertyExists = await this.prisma.property.findUnique({
                where: { id: dto.propertyId },
            });
            if (!propertyExists) {
                throw new common_1.BadRequestException(`Cannot create inquiry. Property with ID ${dto.propertyId} does not exist.`);
            }
        }
        return this.prisma.inquiry.create({
            data: dto,
        });
    }
    async findAll() {
        return this.prisma.inquiry.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                property: {
                    select: {
                        title: true,
                        slug: true,
                        propertyType: true,
                        listingType: true,
                    },
                },
            },
        });
    }
    async findOne(id) {
        const inquiry = await this.prisma.inquiry.findUnique({
            where: { id },
            include: {
                property: {
                    select: {
                        title: true,
                        slug: true,
                        propertyType: true,
                        listingType: true,
                    },
                },
            },
        });
        if (!inquiry) {
            throw new common_1.NotFoundException(`Inquiry with ID ${id} not found.`);
        }
        return inquiry;
    }
    async updateStatus(id, dto) {
        await this.findOne(id);
        return this.prisma.inquiry.update({
            where: { id },
            data: {
                status: dto.status,
            },
        });
    }
    async delete(id) {
        await this.findOne(id);
        return this.prisma.inquiry.delete({
            where: { id },
        });
    }
};
exports.InquiriesService = InquiriesService;
exports.InquiriesService = InquiriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], InquiriesService);
//# sourceMappingURL=enquiries.service.js.map