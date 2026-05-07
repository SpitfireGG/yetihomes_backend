import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';
import { HouseSubType, HouseUsageType, FurnishingStatus } from '@prisma/client';

export class CreateHouseDetailsDto {
  @IsEnum(HouseSubType)
  subType: HouseSubType;

  @IsEnum(HouseUsageType)
  @IsOptional()
  usageType?: HouseUsageType;

  @IsInt()
  @Min(0)
  @IsOptional()
  bedrooms?: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  bathrooms?: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  kitchens?: number;

  @IsInt()
  @Min(1)
  @IsOptional()
  floors?: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  parkingSpaces?: number;

  @IsEnum(FurnishingStatus)
  @IsOptional()
  furnishingStatus?: FurnishingStatus;

  @IsInt()
  @IsOptional()
  buildYear?: number;
}
