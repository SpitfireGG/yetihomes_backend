import { IsEnum, IsInt, IsOptional, IsBoolean, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApartmentSubType, FurnishingStatus, FacingDirection, RoadType } from '@prisma/client';

export class CreateApartmentDetailsDto {
  @IsEnum(ApartmentSubType)
  subType: ApartmentSubType;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  bedrooms?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  bathrooms?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  balconies?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  floorNumber?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  totalFloors?: number;

  @IsOptional()
  @IsBoolean()
  hasLift?: boolean;

  @IsOptional()
  @IsBoolean()
  hasParking?: boolean;

  @IsOptional()
  @IsEnum(FurnishingStatus)
  furnishingStatus?: FurnishingStatus;

  @IsOptional()
  @IsEnum(FacingDirection)
  facingDirection?: FacingDirection;

  @IsOptional()
  @IsEnum(RoadType)
  roadType?: RoadType;

  @IsOptional()
  @IsNumber()
  roadSize?: number;
}
