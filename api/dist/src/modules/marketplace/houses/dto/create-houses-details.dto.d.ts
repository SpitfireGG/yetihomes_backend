import { HouseSubType, HouseUsageType, FurnishingStatus } from '@prisma/client';
export declare class CreateHouseDetailsDto {
    subType: HouseSubType;
    usageType?: HouseUsageType;
    bedrooms?: number;
    bathrooms?: number;
    kitchens?: number;
    floors?: number;
    parkingSpaces?: number;
    furnishingStatus?: FurnishingStatus;
    buildYear?: number;
}
