import {
  IsString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsBoolean,
  ValidateNested,
  IsUrl,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  ListingType,
  PropertyStatus,
  CurrencyCode,
  PricePeriod,
  AreaUnit,
  BadgeTone,
} from '@prisma/client';
import { CreateBasePropertyImageDto } from './base-property-image-dto';

export class BasePropertyDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsString()
  @IsOptional()
  summary?: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(ListingType)
  listingType: ListingType;

  @IsNumber()
  priceAmount: number;

  @IsUrl()
  @IsOptional()
  videoUrl?: string;

  @IsString()
  @IsOptional()
  mapIframe?: string;

  @IsEnum(CurrencyCode)
  @IsOptional()
  currency?: CurrencyCode;

  @IsEnum(PricePeriod)
  @IsOptional()
  pricePeriod?: PricePeriod;

  @IsEnum(PropertyStatus)
  @IsOptional()
  status?: PropertyStatus;

  @IsBoolean()
  @IsOptional()
  isFeatured?: boolean;

  @IsString()
  @IsOptional()
  badgeLabel?: string;

  @IsEnum(BadgeTone)
  @IsOptional()
  badgeTone?: BadgeTone;

  @IsString()
  @IsNotEmpty()
  locationText: string;

  @IsString()
  @IsOptional()
  district?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsNumber()
  @IsOptional()
  latitude?: number;

  @IsNumber()
  @IsOptional()
  longitude?: number;

  @IsNumber()
  @IsOptional()
  areaValue?: number;

  @IsEnum(AreaUnit)
  @IsOptional()
  areaUnit?: AreaUnit;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateBasePropertyImageDto)
  images?: CreateBasePropertyImageDto[];
}
