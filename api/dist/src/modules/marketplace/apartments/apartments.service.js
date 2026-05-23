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
exports.ApartmentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
const client_1 = require("@prisma/client");
let ApartmentsService = class ApartmentsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createApartment(dto) {
        const { details, images, amenityIds, ...propertyData } = dto;
        try {
            const newApartment = await this.prisma.property.create({
                data: {
                    ...propertyData,
                    propertyType: client_1.PropertyType.APARTMENT,
                    apartmentDetails: {
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
                include: { apartmentDetails: true, images: true, propertyAmenities: true },
            });
            return newApartment;
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new common_1.ConflictException(`An apartment with this slug already exists.`);
                }
            }
            throw new common_1.InternalServerErrorException(`Failed to create apartment listing.`);
        }
    }
    async findAll() {
        return this.prisma.property.findMany({
            where: { propertyType: client_1.PropertyType.APARTMENT },
            include: { apartmentDetails: true, images: true },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        const apartment = await this.prisma.property.findUnique({
            where: { id },
            include: { apartmentDetails: true, images: true },
        });
        if (!apartment || apartment.propertyType !== client_1.PropertyType.APARTMENT) {
            throw new common_1.NotFoundException(`Requested apartment ID was not found: ${id}`);
        }
        return apartment;
    }
    async update(id, dto) {
        await this.findOne(id);
        const { details, images, ...propertyData } = dto;
        try {
            return await this.prisma.$transaction(async (tx) => {
                const property = await tx.property.update({
                    where: { id },
                    data: { ...propertyData },
                });
                if (details) {
                    await tx.apartmentDetails.upsert({
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
                return tx.property.findUnique({
                    where: { id },
                    include: { apartmentDetails: true, images: true },
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
    async delete(id) {
        try {
            return this.prisma.property.delete({
                where: { id },
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new common_1.NotFoundException(`Apartment id was nto found -> ${id}`);
                }
            }
            throw new common_1.InternalServerErrorException(`failed to delete property apartment`);
        }
    }
};
exports.ApartmentsService = ApartmentsService;
exports.ApartmentsService = ApartmentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ApartmentsService);
//# sourceMappingURL=apartments.service.js.map