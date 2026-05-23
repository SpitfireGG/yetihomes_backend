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
exports.BlogsController = void 0;
const common_1 = require("@nestjs/common");
const create_blog_dto_1 = require("./dto/create-blog.dto");
const update_blog_dto_1 = require("./dto/update-blog.dto");
const image_upload_interceptor_1 = require("../../utils/image-upload.interceptor");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const blog_service_1 = require("./blog.service");
let BlogsController = class BlogsController {
    blogsService;
    constructor(blogsService) {
        this.blogsService = blogsService;
    }
    async create(dataString, files) {
        if (!dataString)
            throw new common_1.BadRequestException(`Blog data is missing.`);
        let payload;
        try {
            payload = JSON.parse(dataString);
        }
        catch (e) {
            throw new common_1.BadRequestException('Invalid JSON format in data field');
        }
        const dto = (0, class_transformer_1.plainToInstance)(create_blog_dto_1.CreateBlogDto, payload);
        try {
            await (0, class_validator_1.validateOrReject)(dto);
        }
        catch (errors) {
            const msg = errors
                .map((err) => Object.values(err.constraints))
                .flat();
            throw new common_1.BadRequestException(msg);
        }
        const coverImage = files && files[0] ? `/uploads/blogs/${files[0].filename}` : undefined;
        const authorImage = files && files[1] ? `/uploads/blogs/${files[1].filename}` : undefined;
        const finalPayload = {
            ...dto,
            coverImage,
            authorImage,
        };
        const article = await this.blogsService.create(finalPayload);
        return {
            success: true,
            message: 'Article published successfully',
            data: article,
        };
    }
    findAll() {
        return this.blogsService.findAll();
    }
    findBySlug(slug) {
        return this.blogsService.findBySlug(slug);
    }
    async update(id, dataString, files) {
        if (!dataString)
            throw new common_1.BadRequestException(`Blog data is missing.`);
        let payload;
        try {
            payload = JSON.parse(dataString);
        }
        catch (e) {
            throw new common_1.BadRequestException('Invalid JSON format in data field');
        }
        const dto = (0, class_transformer_1.plainToInstance)(update_blog_dto_1.UpdateBlogDto, payload);
        try {
            await (0, class_validator_1.validateOrReject)(dto);
        }
        catch (errors) {
            const msg = errors
                .map((err) => Object.values(err.constraints))
                .flat();
            throw new common_1.BadRequestException(msg);
        }
        const coverImage = files && files[0] ? `/uploads/blogs/${files[0].filename}` : undefined;
        const authorImage = files && files[1] ? `/uploads/blogs/${files[1].filename}` : undefined;
        const finalPayload = {
            ...dto,
            ...(coverImage && { coverImage }),
            ...(authorImage && { authorImage }),
        };
        const updatedArticle = await this.blogsService.update(id, finalPayload);
        return {
            success: true,
            message: 'Article updated successfully',
            data: updatedArticle,
        };
    }
    remove(id) {
        return this.blogsService.delete(id);
    }
};
exports.BlogsController = BlogsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UseInterceptors)((0, image_upload_interceptor_1.ImageUploadInterceptor)('images', 'blogs', 2, 3)),
    __param(0, (0, common_1.Body)('data')),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BlogsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BlogsController.prototype, "findBySlug", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseInterceptors)((0, image_upload_interceptor_1.ImageUploadInterceptor)('images', 'blogs', 2, 3)),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('data')),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Array]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BlogsController.prototype, "remove", null);
exports.BlogsController = BlogsController = __decorate([
    (0, common_1.Controller)('blogs'),
    __metadata("design:paramtypes", [blog_service_1.BlogsService])
], BlogsController);
//# sourceMappingURL=blog.controller.js.map