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
exports.HouseController = void 0;
const common_1 = require("@nestjs/common");
const create_houses_dto_1 = require("./dto/create-houses.dto");
const houses_service_1 = require("./houses.service");
const image_upload_interceptor_1 = require("../../../utils/image-upload.interceptor");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
let HouseController = class HouseController {
    houseService;
    constructor(houseService) {
        this.houseService = houseService;
    }
    async create(dataString, files) {
        if (!dataString)
            throw new common_1.BadRequestException(`property data is missing `);
        let payload;
        try {
            payload = JSON.parse(dataString);
        }
        catch (e) {
            throw new common_1.BadRequestException('Invalid JSON format in data field');
        }
        const dto = (0, class_transformer_1.plainToInstance)(create_houses_dto_1.CreateHouseDto, payload);
        try {
            await (0, class_validator_1.validateOrReject)(dto);
        }
        catch (errors) {
            const msg = errors
                .map((err) => Object.values(err.constraints))
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
        const house = await this.houseService.createHouses(finalPayload);
        return {
            success: true,
            message: 'House listing created successfully',
            data: house,
        };
    }
    findAll() {
        return this.houseService.findAll();
    }
};
exports.HouseController = HouseController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UseInterceptors)((0, image_upload_interceptor_1.ImageUploadInterceptor)('images', 'properties', 10, 3)),
    __param(0, (0, common_1.Body)('data')),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], HouseController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HouseController.prototype, "findAll", null);
exports.HouseController = HouseController = __decorate([
    (0, common_1.Controller)('houses'),
    __metadata("design:paramtypes", [houses_service_1.HouseService])
], HouseController);
//# sourceMappingURL=houses.controller.js.map