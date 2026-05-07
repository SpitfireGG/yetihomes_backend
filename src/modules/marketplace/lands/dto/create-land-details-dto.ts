import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';
import { LandSubType, FacingDirection } from '@prisma/client';

export class CreateLandDetailsDto {
  @IsEnum(LandSubType)
  subType: LandSubType;

  @IsOptional()
  @IsNumber({}, { message: 'roadAccessFeet must be a number' })
  @Type(() => Number)
  roadAccessFeet?: number;

  @IsOptional()
  @IsNumber({}, { message: 'frontageFeet must be a number' })
  @Type(() => Number)
  frontageFeet?: number;

  @IsOptional()
  @IsEnum(FacingDirection)
  facingDirection?: FacingDirection;

  @IsOptional()
  @IsString()
  plotShape?: string;

  @IsOptional()
  @IsString()
  zoningType?: string;

  @IsOptional()
  @IsBoolean()
  isCornerPlot?: boolean;
}
