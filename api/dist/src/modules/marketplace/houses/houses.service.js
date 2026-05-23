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
exports.HouseService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
const client_1 = require("@prisma/client");
let HouseService = class HouseService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createHouses(dto) {
        const { details, images, amenityIds, ...propertyData } = dto;
        try {
            const newHouse = await this.prisma.property.create({
                data: {
                    ...propertyData,
                    propertyType: 'HOUSE',
                    houseDetails: {
                        create: details,
                    },
                    images: images && images.length > 0
                        ? {
                            create: images,
                        }
                        : undefined,
                    propertyAmenities: amenityIds && amenityIds.length > 0
                        ? {
                            create: amenityIds.map((amenityId) => ({ amenityId })),
                        }
                        : undefined,
                },
                include: { houseDetails: true, images: true, propertyAmenities: true },
            });
            return newHouse;
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new common_1.ConflictException(`a property with this slug already exists.`);
                }
            }
            throw new common_1.InternalServerErrorException(`failed to create house listing`);
        }
    }
    async findById(id) {
        const house = this.prisma.property.findUniqueOrThrow({ where: { id } });
        return house;
    }
    async findBySlug(slug) {
        const house = this.prisma.property.findUniqueOrThrow({ where: { slug } });
        return house;
    }
    async update(id, dto) {
        const { details, images, ...propertydata } = dto;
        try {
            return this.prisma.$transaction(async (tx) => {
                await tx.property.update({
                    where: { id },
                    data: { ...propertydata },
                });
                if (details) {
                    await tx.houseDetails.upsert({
                        where: { propertyId: id },
                        create: { propertyId: id, ...details },
                        update: details,
                    });
                }
                if (images && images.length > 0) {
                    await tx.propertyImage.deleteMany({ where: { propertyId: id } });
                    await tx.propertyImage.createMany({
                        data: images.map((img) => ({ ...img, propertyId: id })),
                    });
                }
                return tx.property.findUniqueOrThrow({
                    where: { id },
                    include: { houseDetails: true, images: true },
                });
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new common_1.ConflictException(`An apartment with this slug already exists, please choose a unique title.`);
                }
            }
            throw new common_1.InternalServerErrorException(`Failed to update apartment listing.`);
        }
    }
    async findAll() {
        return this.prisma.property.findMany({
            where: { propertyType: 'HOUSE' },
            include: { houseDetails: true, images: true },
            orderBy: { createdAt: 'desc' },
        });
    }
    async delete(id) {
        try {
            return this.prisma.property.delete({
                where: { id },
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new common_1.NotFoundException(`House id was nto found -> ${id}`);
                }
            }
            throw new common_1.InternalServerErrorException(`failed to delete property apartment`);
        }
    }
};
exports.HouseService = HouseService;
exports.HouseService = HouseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], HouseService);
//# sourceMappingURL=houses.service.js.map