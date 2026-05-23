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
exports.PropertiesController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
const image_upload_interceptor_1 = require("../../../utils/image-upload.interceptor");
const views_interceptor_1 = require("../../analytics/views/views.interceptor");
require("multer");
const PROPERTY_SELECT = {
    id: true,
    title: true,
    slug: true,
    summary: true,
    propertyType: true,
    listingType: true,
    priceAmount: true,
    currency: true,
    pricePeriod: true,
    status: true,
    isFeatured: true,
    badgeLabel: true,
    badgeTone: true,
    locationText: true,
    district: true,
    city: true,
    areaValue: true,
    areaUnit: true,
    videoUrl: true,
    mapIframe: true,
    isVerified: true,
    createdAt: true,
};
const FULL_INCLUDE = {
    images: {
        select: {
            id: true,
            url: true,
            altText: true,
            isPrimary: true,
            sortOrder: true,
        },
    },
    houseDetails: true,
    apartmentDetails: true,
    landDetails: true,
};
const FULL_INCLUDE_WITH_AMENITIES = {
    images: {
        select: {
            id: true,
            url: true,
            altText: true,
            isPrimary: true,
            sortOrder: true,
        },
    },
    houseDetails: true,
    apartmentDetails: true,
    landDetails: true,
    propertyAmenities: {
        include: { amenity: { select: { id: true, name: true, icon: true } } },
    },
};
let PropertiesController = class PropertiesController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        const properties = await this.prisma.property.findMany({
            where: { status: { in: ['PUBLISHED', 'DRAFT'] } },
            select: PROPERTY_SELECT,
            orderBy: { createdAt: 'desc' },
        });
        return { data: properties };
    }
    async findAllForAdmin() {
        const properties = await this.prisma.property.findMany({
            include: FULL_INCLUDE,
            orderBy: { createdAt: 'desc' },
        });
        return { data: properties };
    }
    async findOne(id) {
        const property = await this.prisma.property.findUnique({
            where: { id },
            include: FULL_INCLUDE_WITH_AMENITIES,
        });
        if (!property) {
            throw new common_1.BadRequestException('Property not found');
        }
        return { data: property };
    }
    async create(dataString, files) {
        if (!dataString) {
            throw new common_1.BadRequestException('Property data is missing');
        }
        let payload;
        try {
            payload = JSON.parse(dataString);
        }
        catch (e) {
            throw new common_1.BadRequestException('Invalid JSON format in data field');
        }
        const { title, slug, summary, description, propertyType, listingType, priceAmount, currency, pricePeriod, status, isFeatured, badgeLabel, badgeTone, locationText, district, city, latitude, longitude, areaValue, areaUnit, titleStatus, waterAvailability, electricity, isVerified, isOwnerApproved, videoUrl, mapIframe, houseDetails, apartmentDetails, landDetails, details, amenityIds, } = payload;
        const finalDetails = details || houseDetails || apartmentDetails || landDetails;
        const imageData = files?.map((file, idx) => ({
            url: `/uploads/properties/${file.filename}`,
            altText: file.originalname,
            isPrimary: idx === 0,
            sortOrder: idx,
        })) || [];
        const property = await this.prisma.property.create({
            data: {
                title,
                slug,
                summary,
                description,
                propertyType,
                listingType,
                priceAmount: Number(priceAmount),
                currency,
                pricePeriod,
                status: status || 'DRAFT',
                isFeatured: isFeatured || false,
                badgeLabel,
                badgeTone,
                locationText,
                district,
                city,
                latitude: latitude ? Number(latitude) : null,
                longitude: longitude ? Number(longitude) : null,
                areaValue: areaValue ? Number(areaValue) : null,
                areaUnit,
                titleStatus,
                waterAvailability,
                electricity,
                isVerified: isVerified || false,
                isOwnerApproved: isOwnerApproved || false,
                videoUrl,
                mapIframe,
                ...(finalDetails &&
                    propertyType === 'HOUSE' && {
                    houseDetails: { create: finalDetails },
                }),
                ...(finalDetails &&
                    propertyType === 'APARTMENT' && {
                    apartmentDetails: { create: finalDetails },
                }),
                ...(finalDetails &&
                    propertyType === 'LAND' && { landDetails: { create: finalDetails } }),
                ...(imageData.length > 0 && { images: { create: imageData } }),
            },
            include: FULL_INCLUDE,
        });
        if (amenityIds?.length > 0) {
            await this.prisma.propertyAmenity.createMany({
                data: amenityIds.map((amenityId) => ({
                    propertyId: property.id,
                    amenityId,
                })),
                skipDuplicates: true,
            });
        }
        return {
            success: true,
            message: 'Property created successfully',
            data: property,
        };
    }
    async update(id, dataString, files) {
        if (!dataString) {
            throw new common_1.BadRequestException('Property data is missing');
        }
        let dto;
        try {
            dto = JSON.parse(dataString);
        }
        catch (e) {
            throw new common_1.BadRequestException('Invalid JSON format in data field');
        }
        const { title, slug, summary, description, propertyType, listingType, priceAmount, currency, pricePeriod, status, isFeatured, badgeLabel, badgeTone, locationText, district, city, latitude, longitude, areaValue, areaUnit, titleStatus, waterAvailability, electricity, isVerified, isOwnerApproved, videoUrl, mapIframe, houseDetails, apartmentDetails, landDetails, details, imagesToDelete, amenityIds, } = dto;
        const finalDetails = details || houseDetails || apartmentDetails || landDetails;
        await this.prisma.$transaction(async (tx) => {
            if (imagesToDelete?.length > 0) {
                await tx.propertyImage.deleteMany({
                    where: { id: { in: imagesToDelete } },
                });
            }
            if (propertyType === 'HOUSE' && finalDetails) {
                await tx.houseDetails.upsert({
                    where: { propertyId: id },
                    update: finalDetails,
                    create: { ...finalDetails, propertyId: id },
                });
            }
            if (propertyType === 'APARTMENT' && finalDetails) {
                await tx.apartmentDetails.upsert({
                    where: { propertyId: id },
                    update: finalDetails,
                    create: { ...finalDetails, propertyId: id },
                });
            }
            if (propertyType === 'LAND' && finalDetails) {
                await tx.landDetails.upsert({
                    where: { propertyId: id },
                    update: finalDetails,
                    create: { ...finalDetails, propertyId: id },
                });
            }
            if (files?.length > 0) {
                await tx.propertyImage.createMany({
                    data: files.map((file) => ({
                        propertyId: id,
                        url: `/uploads/properties/${file.filename}`,
                        isPrimary: false,
                    })),
                });
            }
            if (amenityIds && Array.isArray(amenityIds)) {
                await tx.propertyAmenity.deleteMany({ where: { propertyId: id } });
                if (amenityIds.length > 0) {
                    await tx.propertyAmenity.createMany({
                        data: amenityIds.map((amenityId) => ({
                            propertyId: id,
                            amenityId,
                        })),
                    });
                }
            }
            await tx.property.update({
                where: { id },
                data: {
                    title,
                    slug,
                    summary,
                    description,
                    propertyType,
                    listingType,
                    priceAmount,
                    currency,
                    pricePeriod,
                    status,
                    isFeatured,
                    badgeLabel,
                    badgeTone,
                    locationText,
                    district,
                    city,
                    latitude,
                    longitude,
                    areaValue,
                    areaUnit,
                    titleStatus,
                    waterAvailability,
                    electricity,
                    isVerified,
                    isOwnerApproved,
                    videoUrl,
                    mapIframe,
                },
            });
        });
        const property = await this.prisma.property.findUnique({
            where: { id },
            include: FULL_INCLUDE_WITH_AMENITIES,
        });
        return {
            success: true,
            message: 'Property updated successfully',
            data: property,
        };
    }
    async remove(id) {
        const exists = await this.prisma.property.findUnique({
            where: { id },
            select: { id: true },
        });
        if (!exists) {
            throw new common_1.NotFoundException('Property not found');
        }
        await this.prisma.property.update({
            where: { id },
            data: { status: 'ARCHIVED' },
        });
        return { success: true, message: 'Property archived successfully' };
    }
    async markAsSold(id) {
        const property = await this.prisma.property.update({
            where: { id },
            data: { status: 'SOLD' },
            select: { id: true, status: true },
        });
        if (!property) {
            throw new common_1.NotFoundException('Property not found');
        }
        return {
            success: true,
            message: 'Property marked as sold',
            data: property,
        };
    }
    async markAsRented(id) {
        const property = await this.prisma.property.update({
            where: { id },
            data: { status: 'RENTED' },
            select: { id: true, status: true },
        });
        if (!property) {
            throw new common_1.NotFoundException('Property not found');
        }
        return {
            success: true,
            message: 'Property marked as rented',
            data: property,
        };
    }
    async publish(id) {
        const property = await this.prisma.property.update({
            where: { id },
            data: { status: 'PUBLISHED', publishedAt: new Date() },
            select: { id: true, status: true, publishedAt: true },
        });
        if (!property) {
            throw new common_1.NotFoundException('Property not found');
        }
        return { success: true, message: 'Property published', data: property };
    }
    async unpublish(id) {
        const property = await this.prisma.property.update({
            where: { id },
            data: { status: 'DRAFT' },
            select: { id: true, status: true },
        });
        if (!property) {
            throw new common_1.NotFoundException('Property not found');
        }
        return { success: true, message: 'Property set to draft', data: property };
    }
};
exports.PropertiesController = PropertiesController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PropertiesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('admin/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PropertiesController.prototype, "findAllForAdmin", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseInterceptors)(views_interceptor_1.PropertyViewInterceptor),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PropertiesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, image_upload_interceptor_1.ImageUploadInterceptor)('images', 'properties', 10, 3)),
    __param(0, (0, common_1.Body)('data')),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], PropertiesController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseInterceptors)((0, image_upload_interceptor_1.ImageUploadInterceptor)('images', 'properties', 10, 3)),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)('data')),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Array]),
    __metadata("design:returntype", Promise)
], PropertiesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PropertiesController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id/mark-sold'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PropertiesController.prototype, "markAsSold", null);
__decorate([
    (0, common_1.Patch)(':id/mark-rented'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PropertiesController.prototype, "markAsRented", null);
__decorate([
    (0, common_1.Patch)(':id/publish'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PropertiesController.prototype, "publish", null);
__decorate([
    (0, common_1.Patch)(':id/draft'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PropertiesController.prototype, "unpublish", null);
exports.PropertiesController = PropertiesController = __decorate([
    (0, common_1.Controller)('properties'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PropertiesController);
//# sourceMappingURL=properties.controller.js.map