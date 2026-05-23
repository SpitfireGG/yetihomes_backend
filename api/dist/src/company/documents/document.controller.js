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
exports.CookieController = exports.PrivacyController = exports.TermsController = exports.LegalDocumentController = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const document_service_1 = require("./document.service");
const create_document_dto_1 = require("./dtos/create-document.dto");
let LegalDocumentController = class LegalDocumentController {
    legalDocumentService;
    constructor(legalDocumentService) {
        this.legalDocumentService = legalDocumentService;
    }
    async create(createLegalDocumentDto) {
        return this.legalDocumentService.create(createLegalDocumentDto);
    }
    async findAll() {
        return this.legalDocumentService.findAll();
    }
    async findByType(type) {
        return this.legalDocumentService.findByType(type);
    }
    async update(id, updateLegalDocumentDto) {
        return this.legalDocumentService.update(id, updateLegalDocumentDto);
    }
    async delete(id) {
        return this.legalDocumentService.delete(id);
    }
};
exports.LegalDocumentController = LegalDocumentController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_document_dto_1.CreateLegalDocumentDto]),
    __metadata("design:returntype", Promise)
], LegalDocumentController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LegalDocumentController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('type/:type'),
    __param(0, (0, common_1.Param)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LegalDocumentController.prototype, "findByType", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_document_dto_1.CreateLegalDocumentDto]),
    __metadata("design:returntype", Promise)
], LegalDocumentController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LegalDocumentController.prototype, "delete", null);
exports.LegalDocumentController = LegalDocumentController = __decorate([
    (0, common_1.Controller)('company/legal-documents'),
    __metadata("design:paramtypes", [document_service_1.LegalDocumentService])
], LegalDocumentController);
let TermsController = class TermsController {
    legalDocumentService;
    constructor(legalDocumentService) {
        this.legalDocumentService = legalDocumentService;
    }
    async find() {
        return this.legalDocumentService.findByType('TERMS_AND_CONDITIONS');
    }
    async create(dto) {
        return this.legalDocumentService.create({ ...dto, type: 'TERMS_AND_CONDITIONS' });
    }
};
exports.TermsController = TermsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TermsController.prototype, "find", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_document_dto_1.CreateLegalDocumentDto]),
    __metadata("design:returntype", Promise)
], TermsController.prototype, "create", null);
exports.TermsController = TermsController = __decorate([
    (0, common_1.Controller)('company/terms-and-conditions'),
    __metadata("design:paramtypes", [document_service_1.LegalDocumentService])
], TermsController);
let PrivacyController = class PrivacyController {
    legalDocumentService;
    constructor(legalDocumentService) {
        this.legalDocumentService = legalDocumentService;
    }
    async find() {
        return this.legalDocumentService.findByType('PRIVACY_POLICY');
    }
    async create(dto) {
        return this.legalDocumentService.create({ ...dto, type: 'PRIVACY_POLICY' });
    }
};
exports.PrivacyController = PrivacyController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PrivacyController.prototype, "find", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_document_dto_1.CreateLegalDocumentDto]),
    __metadata("design:returntype", Promise)
], PrivacyController.prototype, "create", null);
exports.PrivacyController = PrivacyController = __decorate([
    (0, common_1.Controller)('company/privacy-policy'),
    __metadata("design:paramtypes", [document_service_1.LegalDocumentService])
], PrivacyController);
let CookieController = class CookieController {
    legalDocumentService;
    constructor(legalDocumentService) {
        this.legalDocumentService = legalDocumentService;
    }
    async find() {
        return this.legalDocumentService.findByType('COOKIE_POLICY');
    }
    async create(dto) {
        return this.legalDocumentService.create({ ...dto, type: 'COOKIE_POLICY' });
    }
};
exports.CookieController = CookieController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CookieController.prototype, "find", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_document_dto_1.CreateLegalDocumentDto]),
    __metadata("design:returntype", Promise)
], CookieController.prototype, "create", null);
exports.CookieController = CookieController = __decorate([
    (0, common_1.Controller)('company/cookie-policy'),
    __metadata("design:paramtypes", [document_service_1.LegalDocumentService])
], CookieController);
//# sourceMappingURL=document.controller.js.map