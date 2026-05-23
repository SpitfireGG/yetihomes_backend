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
exports.AmenitiesController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let AmenitiesController = class AmenitiesController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        const amenities = await this.prisma.amenity.findMany({
            orderBy: { name: 'asc' },
        });
        return { success: true, data: amenities };
    }
    async findOne(id) {
        const amenity = await this.prisma.amenity.findUnique({
            where: { id },
        });
        if (!amenity) {
            throw new common_1.NotFoundException('Amenity not found');
        }
        return { success: true, data: amenity };
    }
    async create(createAmenityDto) {
        const { name, icon } = createAmenityDto;
        if (!name || name.trim() === '') {
            throw new common_1.NotFoundException('Amenity name is required');
        }
        const slug = name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
        const existing = await this.prisma.amenity.findFirst({
            where: {
                OR: [{ name }, { slug }],
            },
        });
        if (existing) {
            return {
                success: false,
                message: 'Amenity with this name already exists',
            };
        }
        const amenity = await this.prisma.amenity.create({
            data: { name, slug, icon },
        });
        return {
            success: true,
            message: 'Amenity created successfully',
            data: amenity,
        };
    }
    async remove(id) {
        const existing = await this.prisma.amenity.findUnique({
            where: { id },
        });
        if (!existing) {
            throw new common_1.NotFoundException('Amenity not found');
        }
        await this.prisma.amenity.delete({
            where: { id },
        });
        return {
            success: true,
            message: 'Amenity deleted successfully',
        };
    }
};
exports.AmenitiesController = AmenitiesController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AmenitiesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AmenitiesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AmenitiesController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AmenitiesController.prototype, "remove", null);
exports.AmenitiesController = AmenitiesController = __decorate([
    (0, common_1.Controller)('amenities'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AmenitiesController);
//# sourceMappingURL=amenities.controller.js.map