import { SearchService } from './search.service';
import { SearchPropertyDto } from './search.dto';
export declare class SearchController {
    private readonly searchService;
    constructor(searchService: SearchService);
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
                roadAccessFeet: import("@prisma/client-runtime-utils").Decimal | null;
                frontageFeet: import("@prisma/client-runtime-utils").Decimal | null;
                facingDirection: import("@prisma/client").$Enums.FacingDirection | null;
                plotShape: string | null;
                isCornerPlot: boolean;
            } | null;
            title: string;
            slug: string;
            summary: string | null;
            listingType: import("@prisma/client").$Enums.ListingType;
            priceAmount: import("@prisma/client-runtime-utils").Decimal;
            currency: import("@prisma/client").$Enums.CurrencyCode;
            pricePeriod: import("@prisma/client").$Enums.PricePeriod;
            status: import("@prisma/client").$Enums.PropertyStatus;
            isFeatured: boolean;
            badgeLabel: string | null;
            badgeTone: import("@prisma/client").$Enums.BadgeTone | null;
            locationText: string;
            district: string | null;
            city: string | null;
            areaValue: import("@prisma/client-runtime-utils").Decimal | null;
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
    getLandingSummary(): Promise<{
        categories: {
            key: "apartments" | "residential" | "commercial" | "semi-commercial" | "villa" | "land-plot";
            label: string;
            count: number;
        }[];
        cities: {
            city: string;
            count: number;
            imageUrl: string | null;
            dominantPropertyType: import("@prisma/client").PropertyType | null;
        }[];
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
            roadAccessFeet: import("@prisma/client-runtime-utils").Decimal | null;
            frontageFeet: import("@prisma/client-runtime-utils").Decimal | null;
            facingDirection: import("@prisma/client").$Enums.FacingDirection | null;
            plotShape: string | null;
            isCornerPlot: boolean;
        } | null;
        latitude: import("@prisma/client-runtime-utils").Decimal | null;
        longitude: import("@prisma/client-runtime-utils").Decimal | null;
        title: string;
        slug: string;
        summary: string | null;
        listingType: import("@prisma/client").$Enums.ListingType;
        priceAmount: import("@prisma/client-runtime-utils").Decimal;
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
        areaValue: import("@prisma/client-runtime-utils").Decimal | null;
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
}
