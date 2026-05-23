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
exports.FaqsController = void 0;
const common_1 = require("@nestjs/common");
const faq_service_1 = require("./faq.service");
const update_faqs_dto_1 = require("./dtos/update-faqs.dto");
const create_faqs_dto_1 = require("./dtos/create-faqs.dto");
let FaqsController = class FaqsController {
    faqService;
    constructor(faqService) {
        this.faqService = faqService;
    }
    async create(createFaqDto) {
        return this.faqService.create(createFaqDto);
    }
    async findAll() {
        return this.faqService.findAll();
    }
    async findOne(id) {
        return this.faqService.findOne(id);
    }
    async update(id, updateFaqsDto) {
        return this.faqService.update(id, updateFaqsDto);
    }
    async delete(id) {
        return this.faqService.delete(id);
    }
};
exports.FaqsController = FaqsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_faqs_dto_1.CreateFaqDto]),
    __metadata("design:returntype", Promise)
], FaqsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FaqsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FaqsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_faqs_dto_1.UpdateFaqsDto]),
    __metadata("design:returntype", Promise)
], FaqsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FaqsController.prototype, "delete", null);
exports.FaqsController = FaqsController = __decorate([
    (0, common_1.Controller)('faqs'),
    __metadata("design:paramtypes", [faq_service_1.FaqService])
], FaqsController);
//# sourceMappingURL=faq.controller.js.map