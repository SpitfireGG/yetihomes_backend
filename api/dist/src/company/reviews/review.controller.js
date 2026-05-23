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
exports.ReviewsController = void 0;
const common_1 = require("@nestjs/common");
const image_upload_interceptor_1 = require("../../utils/image-upload.interceptor");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const review_service_1 = require("./review.service");
const create_reviews_dto_1 = require("./dto/create-reviews.dto");
const update_reviews_dto_1 = require("./dto/update-reviews.dto");
let ReviewsController = class ReviewsController {
    reviewsService;
    constructor(reviewsService) {
        this.reviewsService = reviewsService;
    }
    async create(dataString, files) {
        if (!dataString)
            throw new common_1.BadRequestException(`Review data is missing.`);
        let payload;
        try {
            payload = JSON.parse(dataString);
        }
        catch (e) {
            throw new common_1.BadRequestException('Invalid JSON format in data field');
        }
        const dto = (0, class_transformer_1.plainToInstance)(create_reviews_dto_1.CreateReviewDto, payload);
        try {
            await (0, class_validator_1.validateOrReject)(dto);
        }
        catch (errors) {
            const msg = errors
                .map((err) => Object.values(err.constraints))
                .flat();
            throw new common_1.BadRequestException(msg);
        }
        const image = files && files[0] ? `/uploads/reviews/${files[0].filename}` : undefined;
        const finalPayload = {
            ...dto,
            image,
        };
        const review = await this.reviewsService.create(finalPayload);
        return {
            success: true,
            message: 'Review created successfully',
            data: review,
        };
    }
    findAll() {
        return this.reviewsService.findAll();
    }
    findOne(id) {
        return this.reviewsService.findById(id);
    }
    async update(id, dataString, files) {
        if (!dataString)
            throw new common_1.BadRequestException(`Review data is missing.`);
        let payload;
        try {
            payload = JSON.parse(dataString);
        }
        catch (e) {
            throw new common_1.BadRequestException('Invalid JSON format in data field');
        }
        const dto = (0, class_transformer_1.plainToInstance)(update_reviews_dto_1.UpdateReviewDto, payload);
        try {
            await (0, class_validator_1.validateOrReject)(dto);
        }
        catch (errors) {
            const msg = errors
                .map((err) => Object.values(err.constraints))
                .flat();
            throw new common_1.BadRequestException(msg);
        }
        const image = files && files[0] ? `/uploads/reviews/${files[0].filename}` : undefined;
        const finalPayload = {
            ...dto,
            ...(image && { image }),
        };
        const updatedReview = await this.reviewsService.update(id, finalPayload);
        return {
            success: true,
            message: 'Review updated successfully',
            data: updatedReview,
        };
    }
    remove(id) {
        return this.reviewsService.delete(id);
    }
};
exports.ReviewsController = ReviewsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UseInterceptors)((0, image_upload_interceptor_1.ImageUploadInterceptor)('images', 'reviews', 1, 3)),
    __param(0, (0, common_1.Body)('data')),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReviewsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReviewsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseInterceptors)((0, image_upload_interceptor_1.ImageUploadInterceptor)('images', 'reviews', 1, 3)),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('data')),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Array]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReviewsController.prototype, "remove", null);
exports.ReviewsController = ReviewsController = __decorate([
    (0, common_1.Controller)('reviews'),
    __metadata("design:paramtypes", [review_service_1.ReviewsService])
], ReviewsController);
//# sourceMappingURL=review.controller.js.map