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
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisitorCookieMiddleware = void 0;
const common_1 = require("@nestjs/common");
const fingerprint_service_1 = require("./fingerprint.service");
const COOKIE_NAME = "yh_vid";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365 * 2 * 1000;
let VisitorCookieMiddleware = class VisitorCookieMiddleware {
    fp;
    constructor(fp) {
        this.fp = fp;
    }
    use(req, res, next) {
        let visitorId = req.cookies?.[COOKIE_NAME];
        if (!visitorId) {
            visitorId = this.fp.generateVisitorId();
            const isProd = process.env.NODE_ENV === "production";
            res.cookie(COOKIE_NAME, visitorId, {
                httpOnly: true,
                secure: isProd,
                sameSite: isProd ? "none" : "lax",
                maxAge: COOKIE_MAX_AGE,
                path: "/",
            });
        }
        req.visitorId = visitorId;
        next();
    }
};
exports.VisitorCookieMiddleware = VisitorCookieMiddleware;
exports.VisitorCookieMiddleware = VisitorCookieMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [fingerprint_service_1.FingerprintService])
], VisitorCookieMiddleware);
//# sourceMappingURL=visitor-cookie.middleware.js.map