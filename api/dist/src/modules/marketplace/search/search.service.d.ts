import { PrismaService } from "../../../prisma/prisma.service";
import { SearchPropertyDto } from './search.dto';
import { Prisma, PropertyType } from '@prisma/client';
type LandingCategoryKey = 'residential' | 'commercial' | 'semi-commercial' | 'villa' | 'apartments' | 'land-plot';
type LandingCategorySummary = {
    key: LandingCategoryKey;
    label: string;
    count: number;
};
type LandingCitySummary = {
    city: string;
    count: number;
    imageUrl: string | null;
    dominantPropertyType: PropertyType | null;
};
export declare class SearchService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    search(dto: SearchPropertyDto): Promise<{
        data: {
            id: string;
            createdAt: Date;
            houseDetails: {
                subType: import("@prisma/client").$Enums.HouseSubType;
                bedrooms: number | null;
                bathrooms: number | null;
                kitchens: number | null;
                floors: number | null;
                parkingSpaces: number | null;
                furnishingStatus: import("@prisma/client").$Enums.FurnishingStatus | null;
                buildYear: number | null;
            } | null;
            apartmentDetails: {
                subType: import("@prisma/client").$Enums.ApartmentSubType;
                bedrooms: number | null;
                bathrooms: number | null;
                furnishingStatus: import("@prisma/client").$Enums.FurnishingStatus | null;
                balconies: number | null;
                floorNumber: number | null;
                totalFloors: number | null;
                hasLift: boolean;
                hasParking: boolean;
            } | null;
            landDetails: {
                subType: import("@prisma/client").$Enums.LandSubType;
                roadAccessFeet: Prisma.Decimal | null;
                frontageFeet: Prisma.Decimal | null;
                facingDirection: import("@prisma/client").$Enums.FacingDirection | null;
                plotShape: string | null;
                isCornerPlot: boolean;
            } | null;
            title: string;
            slug: string;
            summary: string | null;
            listingType: import("@prisma/client").$Enums.ListingType;
            priceAmount: Prisma.Decimal;
            currency: import("@prisma/client").$Enums.CurrencyCode;
            pricePeriod: import("@prisma/client").$Enums.PricePeriod;
            status: import("@prisma/client").$Enums.PropertyStatus;
            isFeatured: boolean;
            badgeLabel: string | null;
            badgeTone: import("@prisma/client").$Enums.BadgeTone | null;
            locationText: string;
            district: string | null;
            city: string | null;
            areaValue: Prisma.Decimal | null;
            areaUnit: import("@prisma/client").$Enums.AreaUnit | null;
            images: {
                url: string;
                id: string;
                altText: string | null;
                isPrimary: boolean;
            }[];
            propertyType: import("@prisma/client").$Enums.PropertyType;
            isVerified: boolean;
            publishedAt: Date | null;
        }[];
        meta: {
            total: number;
            nextCursor: string | null;
            hasMore: boolean;
            limit: number;
        };
    }>;
    getBySlug(slug: string): Promise<{
        id: string;
        description: string;
        createdAt: Date;
        updatedAt: Date;
        houseDetails: {
            subType: import("@prisma/client").$Enums.HouseSubType;
            bedrooms: number | null;
            bathrooms: number | null;
            kitchens: number | null;
            floors: number | null;
            parkingSpaces: number | null;
            furnishingStatus: import("@prisma/client").$Enums.FurnishingStatus | null;
            buildYear: number | null;
        } | null;
        apartmentDetails: {
            subType: import("@prisma/client").$Enums.ApartmentSubType;
            bedrooms: number | null;
            bathrooms: number | null;
            furnishingStatus: import("@prisma/client").$Enums.FurnishingStatus | null;
            balconies: number | null;
            floorNumber: number | null;
            totalFloors: number | null;
            hasLift: boolean;
            hasParking: boolean;
        } | null;
        landDetails: {
            subType: import("@prisma/client").$Enums.LandSubType;
            roadAccessFeet: Prisma.Decimal | null;
            frontageFeet: Prisma.Decimal | null;
            facingDirection: import("@prisma/client").$Enums.FacingDirection | null;
            plotShape: string | null;
            isCornerPlot: boolean;
        } | null;
        latitude: Prisma.Decimal | null;
        longitude: Prisma.Decimal | null;
        title: string;
        slug: string;
        summary: string | null;
        listingType: import("@prisma/client").$Enums.ListingType;
        priceAmount: Prisma.Decimal;
        videoUrl: string | null;
        mapIframe: string | null;
        currency: import("@prisma/client").$Enums.CurrencyCode;
        pricePeriod: import("@prisma/client").$Enums.PricePeriod;
        status: import("@prisma/client").$Enums.PropertyStatus;
        isFeatured: boolean;
        badgeLabel: string | null;
        badgeTone: import("@prisma/client").$Enums.BadgeTone | null;
        locationText: string;
        district: string | null;
        city: string | null;
        areaValue: Prisma.Decimal | null;
        areaUnit: import("@prisma/client").$Enums.AreaUnit | null;
        images: {
            url: string;
            id: string;
            altText: string | null;
            sortOrder: number;
            isPrimary: boolean;
        }[];
        propertyType: import("@prisma/client").$Enums.PropertyType;
        titleStatus: string | null;
        waterAvailability: string | null;
        electricity: string | null;
        isVerified: boolean;
        isOwnerApproved: boolean;
        publishedAt: Date | null;
    }>;
    getLandingSummary(): Promise<{
        categories: LandingCategorySummary[];
        cities: LandingCitySummary[];
    }>;
    private buildWhereClause;
    private buildOrderBy;
    private buildLandingCategories;
    private buildLandingCities;
    private resolveDominantPropertyType;
}
export {};
