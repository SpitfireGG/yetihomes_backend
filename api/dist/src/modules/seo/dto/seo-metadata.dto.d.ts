export declare enum TwitterCardType {
    SUMMARY = "summary",
    SUMMARY_LARGE_IMAGE = "summary_large_image"
}
export declare enum RedirectTypeEnum {
    PERMANENT = "PERMANENT",
    TEMPORARY = "TEMPORARY"
}
export declare class SeoMetadataDto {
    metaTitle?: string;
    metaDescription?: string;
    canonicalUrl?: string;
    slug?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImageUrl?: string;
    ogImageWidth?: number;
    ogImageHeight?: number;
    ogImageAlt?: string;
    twitterCard?: TwitterCardType;
    twitterTitle?: string;
    twitterDescription?: string;
    twitterImageUrl?: string;
    noindex?: boolean;
    nofollow?: boolean;
    noarchive?: boolean;
    nosnippet?: boolean;
    focusKeyword?: string;
    secondaryKeywords?: string;
    breadcrumbOverride?: string;
    locale?: string;
}
export declare class CreateSeoMetadataDto extends SeoMetadataDto {
    createdBy?: string;
}
export declare class UpdateSeoMetadataDto extends SeoMetadataDto {
    updatedBy?: string;
}
export declare const RESERVED_SLUGS: string[];
export declare function isReservedSlug(slug: string): boolean;
export declare class CreateLocationPageDto {
    name: string;
    slug?: string;
    description?: string;
    latitude?: number;
    longitude?: number;
    district?: string;
    province?: string;
    displayOrder?: number;
    isActive?: boolean;
    seo?: SeoMetadataDto;
}
export declare class CreatePropertyTypePageDto {
    name: string;
    slug?: string;
    description?: string;
    propertyType: string;
    listingType?: string;
    minBedrooms?: number;
    maxBedrooms?: number;
    displayOrder?: number;
    isActive?: boolean;
    seo?: SeoMetadataDto;
}
export declare class CreateAgentDto {
    name: string;
    slug?: string;
    email?: string;
    phone?: string;
    bio?: string;
    photoUrl?: string;
    licenseNumber?: string;
    experienceYears?: number;
    isActive?: boolean;
    displayOrder?: number;
    seo?: SeoMetadataDto;
}
export declare class CreateRedirectRuleDto {
    sourceUrl: string;
    targetUrl: string;
    redirectType?: RedirectTypeEnum;
}
