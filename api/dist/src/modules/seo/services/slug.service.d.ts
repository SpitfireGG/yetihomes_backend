import { PrismaService } from "../../../prisma/prisma.service";
export declare class SlugService {
    private prisma;
    constructor(prisma: PrismaService);
    slugify(input: string, options?: {
        maxLength?: number;
    }): string;
    generatePropertySlug(params: {
        title: string;
        propertyType: string;
        city?: string;
        district?: string;
        listingType?: string;
        existingId?: string;
    }): Promise<string>;
    ensureUnique(baseSlug: string, entityType: 'Property' | 'BlogArticle' | 'LocationPage' | 'Agent' | 'PropertyTypePage' | 'StaticPage' | 'BlogCategory' | 'TeamMember', excludeId?: string): Promise<string>;
    checkSlugExists(slug: string, entityType: string, excludeId?: string): Promise<boolean>;
    handleSlugChange(entityType: string, entityId: string, oldSlug: string, newSlug: string): Promise<void>;
}
