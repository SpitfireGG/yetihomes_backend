"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeoModule = void 0;
const common_1 = require("@nestjs/common");
const seo_controller_1 = require("./controllers/seo.controller");
const seo_service_1 = require("./services/seo.service");
const slug_service_1 = require("./services/slug.service");
const redirect_middleware_1 = require("./middleware/redirect.middleware");
const prisma_module_1 = require("../../prisma/prisma.module");
let SeoModule = class SeoModule {
    configure(consumer) {
        consumer
            .apply(redirect_middleware_1.RedirectMiddleware)
            .forRoutes('*');
    }
};
exports.SeoModule = SeoModule;
exports.SeoModule = SeoModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [seo_controller_1.SeoController],
        providers: [seo_service_1.SeoService, slug_service_1.SlugService, redirect_middleware_1.RedirectMiddleware],
        exports: [seo_service_1.SeoService, slug_service_1.SlugService],
    })
], SeoModule);
//# sourceMappingURL=seo.module.js.map