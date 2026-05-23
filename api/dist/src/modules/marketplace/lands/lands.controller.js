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
exports.LandController = void 0;
const common_1 = require("@nestjs/common");
const create_land_dto_1 = require("./dto/create-land.dto");
const update_land_dto_1 = require("./dto/update-land.dto");
const image_upload_interceptor_1 = require("../../../utils/image-upload.interceptor");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const lands_service_1 = require("./lands.service");
let LandController = class LandController {
    landService;
    constructor(landService) {
        this.landService = landService;
    }
    async create(dataString, files) {
        if (!dataString)
            throw new common_1.BadRequestException(`Property data is missing.`);
        let payload = Object;
        try {
            payload = JSON.parse(dataString);
        }
        catch (e) {
            throw new common_1.BadRequestException('Invalid JSON format in data field.');
        }
        const dto = (0, class_transformer_1.plainToInstance)(create_land_dto_1.CreateLandDto, payload);
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
        const land = await this.landService.createLands(finalPayload);
        return {
            success: true,
            message: 'Land listing created successfully.',
            data: land,
        };
    }
    async findAll() {
        return this.landService.findAll();
    }
    async findOne(id) {
        return this.landService.findOne(id);
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
        const dto = (0, class_transformer_1.plainToInstance)(update_land_dto_1.UpdateLandDto, payload);
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
        const updatedLand = await this.landService.update(id, finalPayload);
        return {
            success: true,
            message: 'Land listing updated successfully.',
            data: updatedLand,
        };
    }
    async delete(id) {
        await this.landService.delete(id);
        return {
            success: true,
            message: 'Land listing deleted successfully.',
        };
    }
};
exports.LandController = LandController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UseInterceptors)((0, image_upload_interceptor_1.ImageUploadInterceptor)('images', 'properties', 10, 3)),
    __param(0, (0, common_1.Body)('data')),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], LandController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LandController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LandController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseInterceptors)((0, image_upload_interceptor_1.ImageUploadInterceptor)('images', 'properties', 10, 3)),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('data')),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Array]),
    __metadata("design:returntype", Promise)
], LandController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LandController.prototype, "delete", null);
exports.LandController = LandController = __decorate([
    (0, common_1.Controller)('lands'),
    __metadata("design:paramtypes", [lands_service_1.LandService])
], LandController);
//# sourceMappingURL=lands.controller.js.map