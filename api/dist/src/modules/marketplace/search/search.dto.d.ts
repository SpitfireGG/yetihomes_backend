import { PropertyType, ListingType, AreaUnit, FurnishingStatus, FacingDirection } from '@prisma/client';
export declare enum SortBy {
    PRICE_ASC = "price_asc",
    PRICE_DESC = "price_desc",
    NEWEST = "newest",
    OLDEST = "oldest"
}
export declare class SearchPropertyDto {
    q?: string;
    propertyType?: PropertyType;
    listingType?: ListingType;
    minPrice?: number;
    maxPrice?: number;
    city?: string;
    district?: string;
    bedrooms?: number;
    bathrooms?: number;
    minArea?: number;
    maxArea?: number;
    areaUnit?: AreaUnit;
    furnishing?: FurnishingStatus;
    facingDirection?: FacingDirection;
    isFeatured?: boolean;
    sortBy?: SortBy;
    cursor?: string;
    limit?: number;
    subType?: string;
}
