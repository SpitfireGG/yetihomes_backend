import { StaticPageType } from '@prisma/client';
export declare class CreateStaticPageDto {
    slug: string;
    title: string;
    content?: string;
    pageType: StaticPageType;
    displayOrder?: number;
    isActive?: boolean;
}
