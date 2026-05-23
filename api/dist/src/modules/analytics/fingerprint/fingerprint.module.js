"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FingerprintModule = void 0;
const common_1 = require("@nestjs/common");
const fingerprint_service_1 = require("./fingerprint.service");
const visitor_cookie_middleware_1 = require("./visitor-cookie.middleware");
let FingerprintModule = class FingerprintModule {
    configure(consumer) {
        consumer.apply(visitor_cookie_middleware_1.VisitorCookieMiddleware).forRoutes("*");
    }
};
exports.FingerprintModule = FingerprintModule;
exports.FingerprintModule = FingerprintModule = __decorate([
    (0, common_1.Module)({
        providers: [fingerprint_service_1.FingerprintService, visitor_cookie_middleware_1.VisitorCookieMiddleware],
        exports: [fingerprint_service_1.FingerprintService, visitor_cookie_middleware_1.VisitorCookieMiddleware],
    })
], FingerprintModule);
//# sourceMappingURL=fingerprint.module.js.map