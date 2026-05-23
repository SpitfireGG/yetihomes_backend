"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LandModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
const lands_controller_1 = require("./lands.controller");
const lands_service_1 = require("./lands.service");
let LandModule = class LandModule {
};
exports.LandModule = LandModule;
exports.LandModule = LandModule = __decorate([
    (0, common_1.Module)({
        controllers: [lands_controller_1.LandController],
        providers: [lands_service_1.LandService, prisma_service_1.PrismaService],
    })
], LandModule);
//# sourceMappingURL=lands.module.js.map