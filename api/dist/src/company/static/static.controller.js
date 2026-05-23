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
exports.StaticPageController = void 0;
const common_1 = require("@nestjs/common");
const static_service_1 = require("./static.service");
const create_static_dto_1 = require("./dto/create-static.dto");
let StaticPageController = class StaticPageController {
    staticPageService;
    constructor(staticPageService) {
        this.staticPageService = staticPageService;
    }
    create(createStaticPageDto) {
        return this.staticPageService.create(createStaticPageDto);
    }
    findAll() {
        return this.staticPageService.findAll();
    }
    findByType(type) {
        return this.staticPageService.findByType(type);
    }
    findBySlug(slug) {
        return this.staticPageService.findBySlug(slug);
    }
    findOne(id) {
        return this.staticPageService.findOne(id);
    }
    update(id, updateStaticPageDto) {
        return this.staticPageService.update(id, updateStaticPageDto);
    }
    delete(id) {
        return this.staticPageService.delete(id);
    }
};
exports.StaticPageController = StaticPageController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_static_dto_1.CreateStaticPageDto]),
    __metadata("design:returntype", void 0)
], StaticPageController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StaticPageController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('type/:type'),
    __param(0, (0, common_1.Param)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StaticPageController.prototype, "findByType", null);
__decorate([
    (0, common_1.Get)('slug/:slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StaticPageController.prototype, "findBySlug", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StaticPageController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_static_dto_1.CreateStaticPageDto]),
    __metadata("design:returntype", void 0)
], StaticPageController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StaticPageController.prototype, "delete", null);
exports.StaticPageController = StaticPageController = __decorate([
    (0, common_1.Controller)('content'),
    __metadata("design:paramtypes", [static_service_1.StaticPageService])
], StaticPageController);
//# sourceMappingURL=static.controller.js.map