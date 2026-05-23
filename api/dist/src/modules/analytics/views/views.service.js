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
exports.ViewsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
const fingerprint_service_1 = require("../fingerprint/fingerprint.service");
let ViewsService = class ViewsService {
    prisma;
    fp;
    DEDUP_WINDOW_MS = 30 * 60 * 1000;
    constructor(prisma, fp) {
        this.prisma = prisma;
        this.fp = fp;
    }
    async recordView(propertyType, propertyId, req) {
        const visitorId = req.visitorId;
        const fingerprint = this.fp.generateFingerprint(req);
        const ipHash = this.fp.hashIp(req);
        const userAgent = req.headers["user-agent"] ?? null;
        const referrer = (req.headers.referer ?? req.headers.referrer ?? null);
        const country = (req.headers["cf-ipcountry"] ?? null);
        const recentView = await this.prisma.propertyView.findFirst({
            where: {
                propertyType,
                propertyId,
                visitorId,
                viewedAt: { gte: new Date(Date.now() - this.DEDUP_WINDOW_MS) },
            },
            select: { id: true },
        });
        if (recentView)
            return;
        await this.prisma.propertyView.create({
            data: {
                propertyType,
                propertyId,
                visitorId,
                fingerprint,
                ipHash,
                userAgent,
                referrer,
                country,
            },
        });
        await this.updateStats(propertyType, propertyId, visitorId);
    }
    async updateStats(propertyType, propertyId, visitorId) {
        const previousViews = await this.prisma.propertyView.count({
            where: { propertyType, propertyId, visitorId },
        });
        const isUnique = previousViews === 1;
        await this.prisma.propertyViewStats.upsert({
            where: {
                propertyType_propertyId: { propertyType, propertyId },
            },
            create: {
                propertyType,
                propertyId,
                totalViews: 1,
                uniqueViews: 1,
                viewsToday: 1,
                viewsThisWeek: 1,
                viewsThisMonth: 1,
                lastViewedAt: new Date(),
            },
            update: {
                totalViews: { increment: 1 },
                uniqueViews: isUnique ? { increment: 1 } : undefined,
                viewsToday: { increment: 1 },
                viewsThisWeek: { increment: 1 },
                viewsThisMonth: { increment: 1 },
                lastViewedAt: new Date(),
            },
        });
    }
    async getStats(propertyType, propertyId) {
        return this.prisma.propertyViewStats.findUnique({
            where: {
                propertyType_propertyId: { propertyType, propertyId },
            },
        });
    }
    async getBulkStats(propertyType, propertyIds) {
        return this.prisma.propertyViewStats.findMany({
            where: {
                propertyType,
                propertyId: { in: propertyIds },
            },
        });
    }
    async getTopProperties(propertyType, limit = 10) {
        return this.prisma.propertyViewStats.findMany({
            where: propertyType ? { propertyType } : undefined,
            orderBy: { totalViews: "desc" },
            take: limit,
        });
    }
};
exports.ViewsService = ViewsService;
exports.ViewsService = ViewsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        fingerprint_service_1.FingerprintService])
], ViewsService);
//# sourceMappingURL=views.service.js.map