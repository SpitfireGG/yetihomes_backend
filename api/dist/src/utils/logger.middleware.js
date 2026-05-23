"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpLoggerMiddleware = void 0;
const common_1 = require("@nestjs/common");
let HttpLoggerMiddleware = class HttpLoggerMiddleware {
    logger = new common_1.Logger('HTTP');
    use(req, res, next) {
        const { method, originalUrl, ip } = req;
        const userAgent = req.get('user-agent') ?? '';
        const startTime = Date.now();
        const safeHeaders = this.sanitizeHeaders(req.headers);
        res.on('finish', () => {
            const { statusCode } = res;
            const duration = Date.now() - startTime;
            const contentLength = res.get('content-length');
            this.logger.log({
                method,
                url: originalUrl,
                statusCode,
                duration: `${duration}ms`,
                contentLength,
                ip,
                userAgent,
                headers: safeHeaders,
            });
        });
        next();
    }
    sanitizeHeaders(headers) {
        const REDACTED = '[REDACTED]';
        const sensitive = ['authorization', 'cookie', 'x-api-key'];
        const result = { ...headers };
        for (const key of sensitive) {
            if (result[key])
                result[key] = REDACTED;
        }
        return result;
    }
};
exports.HttpLoggerMiddleware = HttpLoggerMiddleware;
exports.HttpLoggerMiddleware = HttpLoggerMiddleware = __decorate([
    (0, common_1.Injectable)()
], HttpLoggerMiddleware);
//# sourceMappingURL=logger.middleware.js.map