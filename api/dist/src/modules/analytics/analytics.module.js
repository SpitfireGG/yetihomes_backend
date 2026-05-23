"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../../prisma/prisma.module");
const fingerprint_module_1 = require("./fingerprint/fingerprint.module");
const views_module_1 = require("./views/views.module");
const stats_module_1 = require("./stats/stats.module");
let AnalyticsModule = class AnalyticsModule {
};
exports.AnalyticsModule = AnalyticsModule;
exports.AnalyticsModule = AnalyticsModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, fingerprint_module_1.FingerprintModule, views_module_1.ViewsModule, stats_module_1.StatsModule],
        exports: [views_module_1.ViewsModule, fingerprint_module_1.FingerprintModule, stats_module_1.StatsModule],
    })
], AnalyticsModule);
//# sourceMappingURL=analytics.module.js.map