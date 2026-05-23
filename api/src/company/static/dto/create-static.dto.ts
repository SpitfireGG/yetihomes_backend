import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsBoolean,
  IsInt,
  Min,
} from 'class-validator';
import { StaticPageType } from '@prisma/client';

export class CreateStaticPageDto {
  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsEnum(StaticPageType)
  @IsNotEmpty()
  pageType: StaticPageType;

  @IsInt()
  @Min(0)
  @IsOptional()
  displayOrder?: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}