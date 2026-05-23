import { ApartmentSubType, FurnishingStatus } from '@prisma/client';
export declare class CreateApartmentDetailsDto {
    subType: ApartmentSubType;
    bedrooms?: number;
    bathrooms?: number;
    balconies?: number;
    floorNumber?: number;
    totalFloors?: number;
    hasLift?: boolean;
    hasParking?: boolean;
    furnishingStatus?: FurnishingStatus;
}
