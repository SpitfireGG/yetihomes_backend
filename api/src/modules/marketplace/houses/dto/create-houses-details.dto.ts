import { IsEnum, IsInt, IsOptional, IsNumber, Min } from 'class-validator';
import { HouseSubType, HouseUsageType, FurnishingStatus, FacingDirection, RoadType } from '@prisma/client';

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

  @IsEnum(FacingDirection)
  @IsOptional()
  facingDirection?: FacingDirection;

  @IsEnum(RoadType)
  @IsOptional()
  roadType?: RoadType;

  @IsNumber()
  @IsOptional()
  roadSize?: number;
}
