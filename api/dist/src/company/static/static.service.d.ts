import { PrismaService } from "../../prisma/prisma.service";
import { StaticPageType } from '@prisma/client';
import { CreateStaticPageDto } from './dto/create-static.dto';
export declare class StaticPageService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateStaticPageDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        slug: string;
        content: string | null;
        isActive: boolean;
        displayOrder: number;
        seoMetadataId: string | null;
        pageType: import("@prisma/client").$Enums.StaticPageType;
    }>;
    findAll(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        slug: string;
        content: string | null;
        isActive: boolean;
        displayOrder: number;
        seoMetadataId: string | null;
        pageType: import("@prisma/client").$Enums.StaticPageType;
    }[]>;
    findBySlug(slug: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        slug: string;
        content: string | null;
        isActive: boolean;
        displayOrder: number;
        seoMetadataId: string | null;
        pageType: import("@prisma/client").$Enums.StaticPageType;
    }>;
    findByType(type: StaticPageType): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        slug: string;
        content: string | null;
        isActive: boolean;
        displayOrder: number;
        seoMetadataId: string | null;
        pageType: import("@prisma/client").$Enums.StaticPageType;
    }>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        slug: string;
        content: string | null;
        isActive: boolean;
        displayOrder: number;
        seoMetadataId: string | null;
        pageType: import("@prisma/client").$Enums.StaticPageType;
    }>;
    update(id: string, dto: CreateStaticPageDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        slug: string;
        content: string | null;
        isActive: boolean;
        displayOrder: number;
        seoMetadataId: string | null;
        pageType: import("@prisma/client").$Enums.StaticPageType;
    }>;
    delete(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        slug: string;
        content: string | null;
        isActive: boolean;
        displayOrder: number;
        seoMetadataId: string | null;
        pageType: import("@prisma/client").$Enums.StaticPageType;
    }>;
}
