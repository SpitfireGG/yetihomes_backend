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
exports.ApartmentsController = void 0;
const common_1 = require("@nestjs/common");
const apartments_service_1 = require("./apartments.service");
const create_apartment_dto_1 = require("./dto/create-apartment.dto");
const update_apartment_dto_1 = require("./dto/update-apartment.dto");
const image_upload_interceptor_1 = require("../../../utils/image-upload.interceptor");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
let ApartmentsController = class ApartmentsController {
    apartmentsService;
    constructor(apartmentsService) {
        this.apartmentsService = apartmentsService;
    }
    async create(dataString, files) {
        if (!dataString)
            throw new common_1.BadRequestException(`Property data is missing.`);
        let payload;
        try {
            payload = JSON.parse(dataString);
        }
        catch (e) {
            throw new common_1.BadRequestException('Invalid JSON format in data field.');
        }
        const dto = (0, class_transformer_1.plainToInstance)(create_apartment_dto_1.CreateApartmentDtos, payload);
        try {
            await (0, class_validator_1.validateOrReject)(dto);
        }
        catch (errors) {
            const msg = errors
                .map((err) => err.constraints
                ? Object.values(err.constraints)
                : ['Validation failed'])
                .flat();
            throw new common_1.BadRequestException(msg);
        }
        const imageData = files?.map((file, idx) => ({
            url: `/uploads/properties/${file.filename}`,
            altText: file.originalname,
            isPrimary: idx === 0,
            sortOrder: idx,
        })) || [];
        const finalPayload = {
            ...dto,
            images: imageData,
        };
        const apartment = await this.apartmentsService.createApartment(finalPayload);
        return {
            success: true,
            message: 'Apartment listing created successfully.',
            data: apartment,
        };
    }
    async findAll() {
        return this.apartmentsService.findAll();
    }
    async findOne(id) {
        return this.apartmentsService.findOne(id);
    }
    async update(id, dataString, files) {
        let payload = {};
        if (dataString) {
            try {
                payload = JSON.parse(dataString);
            }
            catch (e) {
                throw new common_1.BadRequestException('Invalid JSON format in data field.');
            }
        }
        const dto = (0, class_transformer_1.plainToInstance)(update_apartment_dto_1.UpdateApartmentDto, payload);
        try {
            await (0, class_validator_1.validateOrReject)(dto);
        }
        catch (errors) {
            const msg = errors
                .map((err) => err.constraints
                ? Object.values(err.constraints)
                : ['Validation failed'])
                .flat();
            throw new common_1.BadRequestException(msg);
        }
        const finalPayload = { ...dto };
        if (files && files.length > 0) {
            const imageData = files.map((file, idx) => ({
                url: `/uploads/properties/${file.filename}`,
                altText: file.originalname,
                isPrimary: idx === 0,
                sortOrder: idx,
            }));
            finalPayload.images = imageData;
        }
        const updatedApartment = await this.apartmentsService.update(id, finalPayload);
        return {
            success: true,
            message: 'Apartment listing updated successfully.',
            data: updatedApartment,
        };
    }
    async delete(id) {
        await this.apartmentsService.delete(id);
        return {
            success: true,
            message: 'Apartment listing deleted successfully.',
        };
    }
};
exports.ApartmentsController = ApartmentsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UseInterceptors)((0, image_upload_interceptor_1.ImageUploadInterceptor)('images', 'properties', 10, 3)),
    __param(0, (0, common_1.Body)('data')),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], ApartmentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ApartmentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApartmentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseInterceptors)((0, image_upload_interceptor_1.ImageUploadInterceptor)('images', 'properties', 10, 3)),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('data')),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Array]),
    __metadata("design:returntype", Promise)
], ApartmentsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApartmentsController.prototype, "delete", null);
exports.ApartmentsController = ApartmentsController = __decorate([
    (0, common_1.Controller)('apartments'),
    __metadata("design:paramtypes", [apartments_service_1.ApartmentsService])
], ApartmentsController);
//# sourceMappingURL=apartments.controller.js.map