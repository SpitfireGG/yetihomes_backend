import { PropertyType } from "@prisma/client";
import { ViewsService } from "./views.service";
export declare class ViewsController {
    private readonly views;
    constructor(views: ViewsService);
    getOne(type: PropertyType, id: string): Promise<{
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
    } | {
        totalViews: number;
        uniqueViews: number;
        viewsToday: number;
        viewsThisWeek: number;
        viewsThisMonth: number;
    }>;
    getBulk(type: PropertyType, idsCsv: string): Promise<{
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
    top(type?: PropertyType, limit?: string): Promise<{
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
