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
exports.CompanyInfoController = void 0;
const common_1 = require("@nestjs/common");
const about_service_1 = require("./about.service");
const create_about_dto_1 = require("./dtos/create-about-dto");
const update_about_dto_1 = require("./dtos/update-about-dto");
let CompanyInfoController = class CompanyInfoController {
    companyInfoService;
    constructor(companyInfoService) {
        this.companyInfoService = companyInfoService;
    }
    create(createCompanyInfoDto) {
        return this.companyInfoService.create(createCompanyInfoDto);
    }
    findAll() {
        return this.companyInfoService.findAll();
    }
    findOne(id) {
        return this.companyInfoService.findOne(id);
    }
    update(id, updateCompanyInfoDto) {
        return this.companyInfoService.update(id, updateCompanyInfoDto);
    }
    delete(id) {
        return this.companyInfoService.delete(id);
    }
};
exports.CompanyInfoController = CompanyInfoController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_about_dto_1.CreateCompanyInfoDto]),
    __metadata("design:returntype", void 0)
], CompanyInfoController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CompanyInfoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CompanyInfoController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_about_dto_1.UpdateCompanyInfoDto]),
    __metadata("design:returntype", void 0)
], CompanyInfoController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CompanyInfoController.prototype, "delete", null);
exports.CompanyInfoController = CompanyInfoController = __decorate([
    (0, common_1.Controller)('company/about-us'),
    __metadata("design:paramtypes", [about_service_1.CompayInfoService])
], CompanyInfoController);
//# sourceMappingURL=about.controller.js.map