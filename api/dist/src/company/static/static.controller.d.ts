import { StaticPageService } from './static.service';
import { CreateStaticPageDto } from './dto/create-static.dto';
export declare class StaticPageController {
    private readonly staticPageService;
    constructor(staticPageService: StaticPageService);
    create(createStaticPageDto: CreateStaticPageDto): Promise<{
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
    findByType(type: string): Promise<{
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
    update(id: string, updateStaticPageDto: CreateStaticPageDto): Promise<{
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
