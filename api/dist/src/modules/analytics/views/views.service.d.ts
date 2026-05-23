import { PrismaService } from "../../../prisma/prisma.service";
import { FingerprintService } from "../fingerprint/fingerprint.service";
import { PropertyType } from "@prisma/client";
import { Request } from "express";
export declare class ViewsService {
    private prisma;
    private fp;
    private readonly DEDUP_WINDOW_MS;
    constructor(prisma: PrismaService, fp: FingerprintService);
    recordView(propertyType: PropertyType, propertyId: string, req: Request): Promise<void>;
    private updateStats;
    getStats(propertyType: PropertyType, propertyId: string): Promise<{
        id: string;
        updatedAt: Date;
        propertyType: import("@prisma/client").$Enums.PropertyType;
        propertyId: string;
        totalViews: number;
        uniqueViews: number;
        viewsToday: number;
        viewsThisWeek: number;
        viewsThisMonth: number;
        lastViewedAt: Date | null;
    } | null>;
    getBulkStats(propertyType: PropertyType, propertyIds: string[]): Promise<{
        id: string;
        updatedAt: Date;
        propertyType: import("@prisma/client").$Enums.PropertyType;
        propertyId: string;
        totalViews: number;
        uniqueViews: number;
        viewsToday: number;
        viewsThisWeek: number;
        viewsThisMonth: number;
        lastViewedAt: Date | null;
    }[]>;
    getTopProperties(propertyType?: PropertyType, limit?: number): Promise<{
        id: string;
        updatedAt: Date;
        propertyType: import("@prisma/client").$Enums.PropertyType;
        propertyId: string;
        totalViews: number;
        uniqueViews: number;
        viewsToday: number;
        viewsThisWeek: number;
        viewsThisMonth: number;
        lastViewedAt: Date | null;
    }[]>;
}
