"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let PrismaExceptionFilter = class PrismaExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        let status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';
        let errors = null;
        switch (exception.code) {
            case 'P2002':
                status = common_1.HttpStatus.BAD_REQUEST;
                const metaAny = exception.meta;
                const target = metaAny?.target ??
                    metaAny?.driverAdapterError?.cause?.constraint?.index ??
                    'unknown';
                message = `Duplicate value for field(s): ${target}`;
                errors = [target];
                break;
            case 'P2003':
                status = common_1.HttpStatus.BAD_REQUEST;
                message = 'Invalid foreign key: related record does not exist';
                break;
            case 'P2025':
                status = common_1.HttpStatus.NOT_FOUND;
                message = `Record not found`;
                break;
            default:
                message = exception.message;
                break;
        }
        const errorLabel = status === common_1.HttpStatus.NOT_FOUND ? 'Not Found'
            : status === common_1.HttpStatus.BAD_REQUEST ? 'Bad Request'
                : 'Internal Server Error';
        return response.status(status).json({
            statusCode: status,
            error: errorLabel,
            message: message,
            details: errors,
        });
    }
};
exports.PrismaExceptionFilter = PrismaExceptionFilter;
exports.PrismaExceptionFilter = PrismaExceptionFilter = __decorate([
    (0, common_1.Catch)(client_1.Prisma.PrismaClientKnownRequestError)
], PrismaExceptionFilter);
//# sourceMappingURL=prisma.exception.filter.js.map