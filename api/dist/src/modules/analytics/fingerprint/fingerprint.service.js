"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FingerprintService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
let FingerprintService = class FingerprintService {
    generateFingerprint(req) {
        const signals = [
            this.getClientIp(req),
            req.headers["user-agent"] ?? "",
            req.headers["accept-language"] ?? "",
            req.headers["accept-encoding"] ?? "",
            req.headers["sec-ch-ua"] ?? "",
            req.headers["sec-ch-ua-platform"] ?? "",
        ].join("|");
        return (0, crypto_1.createHash)("sha256").update(signals).digest("hex").slice(0, 32);
    }
    hashIp(req) {
        const ip = this.getClientIp(req);
        const salt = process.env.IP_HASH_SALT ?? "change-me";
        return (0, crypto_1.createHash)("sha256").update(ip + salt).digest("hex").slice(0, 32);
    }
    generateVisitorId() {
        return (0, crypto_1.randomBytes)(16).toString("hex");
    }
    getClientIp(req) {
        const forwarded = req.headers["x-forwarded-for"];
        if (typeof forwarded === "string") {
            return forwarded.split(",")[0].trim();
        }
        return req.ip ?? req.socket?.remoteAddress ?? "unknown";
    }
};
exports.FingerprintService = FingerprintService;
exports.FingerprintService = FingerprintService = __decorate([
    (0, common_1.Injectable)()
], FingerprintService);
//# sourceMappingURL=fingerprint.service.js.map