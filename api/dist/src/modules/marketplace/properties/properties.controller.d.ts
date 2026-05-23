import { PrismaService } from "../../../prisma/prisma.service";
import 'multer';
export declare class PropertiesController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        data: {
            id: string;
            createdAt: Date;
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
            propertyType: import("@prisma/client").$Enums.PropertyType;
            isVerified: boolean;
        }[];
    }>;
    findAllForAdmin(): Promise<{
        data: ({
            houseDetails: {
                id: string;
                subType: import("@prisma/client").$Enums.HouseSubType;
                usageType: import("@prisma/client").$Enums.HouseUsageType;
                bedrooms: number | null;
                bathrooms: number | null;
                kitchens: number | null;
                floors: number | null;
                parkingSpaces: number | null;
                furnishingStatus: import("@prisma/client").$Enums.FurnishingStatus | null;
                buildYear: number | null;
                propertyId: string;
            } | null;
            apartmentDetails: {
                id: string;
                subType: import("@prisma/client").$Enums.ApartmentSubType;
                bedrooms: number | null;
                bathrooms: number | null;
                furnishingStatus: import("@prisma/client").$Enums.FurnishingStatus | null;
                propertyId: string;
                balconies: number | null;
                floorNumber: number | null;
                totalFloors: number | null;
                hasLift: boolean;
                hasParking: boolean;
            } | null;
            landDetails: {
                id: string;
                subType: import("@prisma/client").$Enums.LandSubType;
                propertyId: string;
                roadAccessFeet: import("@prisma/client-runtime-utils").Decimal | null;
                frontageFeet: import("@prisma/client-runtime-utils").Decimal | null;
                facingDirection: import("@prisma/client").$Enums.FacingDirection | null;
                plotShape: string | null;
                zoningType: string | null;
                isCornerPlot: boolean;
            } | null;
            images: {
                url: string;
                id: string;
                altText: string | null;
                sortOrder: number;
                isPrimary: boolean;
            }[];
        } & {
            id: string;
            description: string;
            createdAt: Date;
            updatedAt: Date;
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
            propertyType: import("@prisma/client").$Enums.PropertyType;
            titleStatus: string | null;
            waterAvailability: string | null;
            electricity: string | null;
            isVerified: boolean;
            isOwnerApproved: boolean;
            publishedAt: Date | null;
            locationPageId: string | null;
            agentId: string | null;
        })[];
    }>;
    findOne(id: string): Promise<{
        data: {
            houseDetails: {
                id: string;
                subType: import("@prisma/client").$Enums.HouseSubType;
                usageType: import("@prisma/client").$Enums.HouseUsageType;
                bedrooms: number | null;
                bathrooms: number | null;
                kitchens: number | null;
                floors: number | null;
                parkingSpaces: number | null;
                furnishingStatus: import("@prisma/client").$Enums.FurnishingStatus | null;
                buildYear: number | null;
                propertyId: string;
            } | null;
            apartmentDetails: {
                id: string;
                subType: import("@prisma/client").$Enums.ApartmentSubType;
                bedrooms: number | null;
                bathrooms: number | null;
                furnishingStatus: import("@prisma/client").$Enums.FurnishingStatus | null;
                propertyId: string;
                balconies: number | null;
                floorNumber: number | null;
                totalFloors: number | null;
                hasLift: boolean;
                hasParking: boolean;
            } | null;
            landDetails: {
                id: string;
                subType: import("@prisma/client").$Enums.LandSubType;
                propertyId: string;
                roadAccessFeet: import("@prisma/client-runtime-utils").Decimal | null;
                frontageFeet: import("@prisma/client-runtime-utils").Decimal | null;
                facingDirection: import("@prisma/client").$Enums.FacingDirection | null;
                plotShape: string | null;
                zoningType: string | null;
                isCornerPlot: boolean;
            } | null;
            images: {
                url: string;
                id: string;
                altText: string | null;
                sortOrder: number;
                isPrimary: boolean;
            }[];
            propertyAmenities: ({
                amenity: {
                    id: string;
                    name: string;
                    icon: string | null;
                };
            } & {
                amenityId: string;
                propertyId: string;
            })[];
        } & {
            id: string;
            description: string;
            createdAt: Date;
            updatedAt: Date;
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
            propertyType: import("@prisma/client").$Enums.PropertyType;
            titleStatus: string | null;
            waterAvailability: string | null;
            electricity: string | null;
            isVerified: boolean;
            isOwnerApproved: boolean;
            publishedAt: Date | null;
            locationPageId: string | null;
            agentId: string | null;
        };
    }>;
    create(dataString: string, files: Express.Multer.File[]): Promise<{
        success: boolean;
        message: string;
        data: {
            houseDetails: {
                id: string;
                subType: import("@prisma/client").$Enums.HouseSubType;
                usageType: import("@prisma/client").$Enums.HouseUsageType;
                bedrooms: number | null;
                bathrooms: number | null;
                kitchens: number | null;
                floors: number | null;
                parkingSpaces: number | null;
                furnishingStatus: import("@prisma/client").$Enums.FurnishingStatus | null;
                buildYear: number | null;
                propertyId: string;
            } | null;
            apartmentDetails: {
                id: string;
                subType: import("@prisma/client").$Enums.ApartmentSubType;
                bedrooms: number | null;
                bathrooms: number | null;
                furnishingStatus: import("@prisma/client").$Enums.FurnishingStatus | null;
                propertyId: string;
                balconies: number | null;
                floorNumber: number | null;
                totalFloors: number | null;
                hasLift: boolean;
                hasParking: boolean;
            } | null;
            landDetails: {
                id: string;
                subType: import("@prisma/client").$Enums.LandSubType;
                propertyId: string;
                roadAccessFeet: import("@prisma/client-runtime-utils").Decimal | null;
                frontageFeet: import("@prisma/client-runtime-utils").Decimal | null;
                facingDirection: import("@prisma/client").$Enums.FacingDirection | null;
                plotShape: string | null;
                zoningType: string | null;
                isCornerPlot: boolean;
            } | null;
            images: {
                url: string;
                id: string;
                altText: string | null;
                sortOrder: number;
                isPrimary: boolean;
            }[];
        } & {
            id: string;
            description: string;
            createdAt: Date;
            updatedAt: Date;
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
            propertyType: import("@prisma/client").$Enums.PropertyType;
            titleStatus: string | null;
            waterAvailability: string | null;
            electricity: string | null;
            isVerified: boolean;
            isOwnerApproved: boolean;
            publishedAt: Date | null;
            locationPageId: string | null;
            agentId: string | null;
        };
    }>;
    update(id: string, dataString: string, files: Express.Multer.File[]): Promise<{
        success: boolean;
        message: string;
        data: ({
            houseDetails: {
                id: string;
                subType: import("@prisma/client").$Enums.HouseSubType;
                usageType: import("@prisma/client").$Enums.HouseUsageType;
                bedrooms: number | null;
                bathrooms: number | null;
                kitchens: number | null;
                floors: number | null;
                parkingSpaces: number | null;
                furnishingStatus: import("@prisma/client").$Enums.FurnishingStatus | null;
                buildYear: number | null;
                propertyId: string;
            } | null;
            apartmentDetails: {
                id: string;
                subType: import("@prisma/client").$Enums.ApartmentSubType;
                bedrooms: number | null;
                bathrooms: number | null;
                furnishingStatus: import("@prisma/client").$Enums.FurnishingStatus | null;
                propertyId: string;
                balconies: number | null;
                floorNumber: number | null;
                totalFloors: number | null;
                hasLift: boolean;
                hasParking: boolean;
            } | null;
            landDetails: {
                id: string;
                subType: import("@prisma/client").$Enums.LandSubType;
                propertyId: string;
                roadAccessFeet: import("@prisma/client-runtime-utils").Decimal | null;
                frontageFeet: import("@prisma/client-runtime-utils").Decimal | null;
                facingDirection: import("@prisma/client").$Enums.FacingDirection | null;
                plotShape: string | null;
                zoningType: string | null;
                isCornerPlot: boolean;
            } | null;
            images: {
                url: string;
                id: string;
                altText: string | null;
                sortOrder: number;
                isPrimary: boolean;
            }[];
            propertyAmenities: ({
                amenity: {
                    id: string;
                    name: string;
                    icon: string | null;
                };
            } & {
                amenityId: string;
                propertyId: string;
            })[];
        } & {
            id: string;
            description: string;
            createdAt: Date;
            updatedAt: Date;
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
            propertyType: import("@prisma/client").$Enums.PropertyType;
            titleStatus: string | null;
            waterAvailability: string | null;
            electricity: string | null;
            isVerified: boolean;
            isOwnerApproved: boolean;
            publishedAt: Date | null;
            locationPageId: string | null;
            agentId: string | null;
        }) | null;
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
    markAsSold(id: string): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            status: import("@prisma/client").$Enums.PropertyStatus;
        };
    }>;
    markAsRented(id: string): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            status: import("@prisma/client").$Enums.PropertyStatus;
        };
    }>;
    publish(id: string): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            status: import("@prisma/client").$Enums.PropertyStatus;
            publishedAt: Date | null;
        };
    }>;
    unpublish(id: string): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            status: import("@prisma/client").$Enums.PropertyStatus;
        };
    }>;
}
