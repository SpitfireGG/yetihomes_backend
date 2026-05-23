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
exports.LandService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
const client_1 = require("@prisma/client");
let LandService = class LandService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createLands(dto) {
        const { details, images, amenityIds, ...propertyData } = dto;
        try {
            const newLand = await this.prisma.property.create({
                data: {
                    ...propertyData,
                    propertyType: 'LAND',
                    landDetails: {
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
                include: { landDetails: true, images: true, propertyAmenities: true },
            });
            return newLand;
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new common_1.ConflictException(`a property with this slug already exists.`);
                }
            }
            throw new common_1.InternalServerErrorException(`failed to create land listing`);
        }
    }
    async findAll() {
        return this.prisma.property.findMany({
            where: { propertyType: 'LAND' },
            include: { landDetails: true, images: true },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        const Land = await this.prisma.property.findUnique({
            where: { id },
            include: { landDetails: true, images: true },
        });
        if (!Land)
            throw new common_1.NotFoundException(`Requested land id was not found #id -> ${id}`);
        return Land;
    }
    async update(id, dto) {
        await this.findOne(id);
        const { details, images, ...propertyData } = dto;
        try {
            return await this.prisma.property.update({
                where: { id },
                data: {
                    ...propertyData,
                    ...(details && {
                        landDetails: {
                            upsert: {
                                create: details,
                                update: details,
                            },
                        },
                    }),
                    ...(images &&
                        images.length > 0 && {
                        images: {
                            create: images,
                            deleteMany: {},
                        },
                    }),
                },
                include: { landDetails: true, images: true },
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new common_1.ConflictException(`A property with the slug already exists, please choose an unique title`);
                }
            }
            throw new common_1.InternalServerErrorException(`failed to update land listing`);
        }
    }
    async delete(id) {
        await this.findOne(id);
        return this.prisma.property.delete({
            where: { id },
        });
    }
};
exports.LandService = LandService;
exports.LandService = LandService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LandService);
//# sourceMappingURL=lands.service.js.map