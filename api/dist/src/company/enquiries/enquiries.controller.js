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
exports.InquiriesController = void 0;
const common_1 = require("@nestjs/common");
const enquiries_service_1 = require("./enquiries.service");
const create_enquiries_dto_1 = require("./dtos/create-enquiries.dto");
const update_enquiries_dto_1 = require("./dtos/update-enquiries.dto");
let InquiriesController = class InquiriesController {
    inquiriesService;
    constructor(inquiriesService) {
        this.inquiriesService = inquiriesService;
    }
    async create(createInquiryDto) {
        const inquiry = await this.inquiriesService.create(createInquiryDto);
        return {
            success: true,
            message: 'Inquiry submitted successfully.',
            data: inquiry,
        };
    }
    async findAll() {
        return this.inquiriesService.findAll();
    }
    async findOne(id) {
        return this.inquiriesService.findOne(id);
    }
    async updateStatus(id, updateInquiryStatusDto) {
        const updatedInquiry = await this.inquiriesService.updateStatus(id, updateInquiryStatusDto);
        return {
            success: true,
            message: 'Inquiry status updated successfully.',
            data: updatedInquiry,
        };
    }
    async delete(id) {
        await this.inquiriesService.delete(id);
        return {
            success: true,
            message: 'Inquiry deleted successfully.',
        };
    }
};
exports.InquiriesController = InquiriesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_enquiries_dto_1.CreateInquiryDto]),
    __metadata("design:returntype", Promise)
], InquiriesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InquiriesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InquiriesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_enquiries_dto_1.UpdateInquiryStatusDto]),
    __metadata("design:returntype", Promise)
], InquiriesController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InquiriesController.prototype, "delete", null);
exports.InquiriesController = InquiriesController = __decorate([
    (0, common_1.Controller)('inquiries'),
    __metadata("design:paramtypes", [enquiries_service_1.InquiriesService])
], InquiriesController);
//# sourceMappingURL=enquiries.controller.js.map