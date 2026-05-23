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
exports.NewsletterController = void 0;
const common_1 = require("@nestjs/common");
const newsletter_service_1 = require("./newsletter.service");
const create_newsletter_dto_1 = require("./dtos/create-newsletter.dto");
const update_newsletter_dto_1 = require("./dtos/update-newsletter.dto");
let NewsletterController = class NewsletterController {
    newsletterService;
    constructor(newsletterService) {
        this.newsletterService = newsletterService;
    }
    async create(createNewsletterDto) {
        return this.newsletterService.create(createNewsletterDto);
    }
    async findAll() {
        return this.newsletterService.findAll();
    }
    async findOne(id) {
        return this.newsletterService.findOne(id);
    }
    async update(id, updateNewsletterDto) {
        return this.newsletterService.update(id, updateNewsletterDto);
    }
    async delete(id) {
        return this.newsletterService.delete(id);
    }
};
exports.NewsletterController = NewsletterController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_newsletter_dto_1.CreateNewsletterDto]),
    __metadata("design:returntype", Promise)
], NewsletterController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NewsletterController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NewsletterController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_newsletter_dto_1.UpdateNewsletterDto]),
    __metadata("design:returntype", Promise)
], NewsletterController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NewsletterController.prototype, "delete", null);
exports.NewsletterController = NewsletterController = __decorate([
    (0, common_1.Controller)('company/newsletters'),
    __metadata("design:paramtypes", [newsletter_service_1.NewsletterService])
], NewsletterController);
//# sourceMappingURL=newsletter.controller.js.map