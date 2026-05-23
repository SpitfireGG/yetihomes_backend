import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { FingerprintService } from "../fingerprint/fingerprint.service";
import { PropertyType } from "@prisma/client";
import { Request } from "express";

@Injectable()
export class ViewsService {
  private readonly DEDUP_WINDOW_MS = 30 * 60 * 1000;

  constructor(
    private prisma: PrismaService,
    private fp: FingerprintService,
  ) {}

  async recordView(
    propertyType: PropertyType,
    propertyId: string,
    req: Request,
  ): Promise<void> {
    const visitorId = (req as any).visitorId as string;
    const fingerprint = this.fp.generateFingerprint(req);
    const ipHash = this.fp.hashIp(req);
    const userAgent = req.headers["user-agent"] ?? null;
    const referrer = (req.headers.referer ?? req.headers.referrer ?? null) as string | null;
    const country = (req.headers["cf-ipcountry"] ?? null) as string | null;

    const recentView = await this.prisma.propertyView.findFirst({
      where: {
        propertyType,
        propertyId,
        visitorId,
        viewedAt: { gte: new Date(Date.now() - this.DEDUP_WINDOW_MS) },
      },
      select: { id: true },
    });

    if (recentView) return;

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

  private async updateStats(
    propertyType: PropertyType,
    propertyId: string,
    visitorId: string,
  ): Promise<void> {
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

  async getStats(propertyType: PropertyType, propertyId: string) {
    return this.prisma.propertyViewStats.findUnique({
      where: {
        propertyType_propertyId: { propertyType, propertyId },
      },
    });
  }

  async getBulkStats(propertyType: PropertyType, propertyIds: string[]) {
    return this.prisma.propertyViewStats.findMany({
      where: {
        propertyType,
        propertyId: { in: propertyIds },
      },
    });
  }

  async getTopProperties(propertyType?: PropertyType, limit = 10) {
    return this.prisma.propertyViewStats.findMany({
      where: propertyType ? { propertyType } : undefined,
      orderBy: { totalViews: "desc" },
      take: limit,
    });
  }
}