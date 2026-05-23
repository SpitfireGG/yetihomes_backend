import {
  IsString,
  IsOptional,
  IsBoolean,
  IsUrl,
  MaxLength,
  MinLength,
  IsEnum,
  Matches,
  IsNumber,
  Min,
  ValidateNested,
} from 'class-validator';

export enum TwitterCardType {
  SUMMARY = 'summary',
  SUMMARY_LARGE_IMAGE = 'summary_large_image',
}

export enum RedirectTypeEnum {
  PERMANENT = 'PERMANENT',
  TEMPORARY = 'TEMPORARY',
}

export class SeoMetadataDto {
  @IsOptional()
  @IsString()
  @MinLength(10, { message: 'Meta title should be at least 10 characters' })
  @MaxLength(70, { message: 'Meta title should not exceed 70 characters' })
  metaTitle?: string;

  @IsOptional()
  @IsString()
  @MinLength(50, {
    message: 'Meta description should be at least 50 characters',
  })
  @MaxLength(200, {
    message: 'Meta description should not exceed 200 characters',
  })
  metaDescription?: string;

  @IsOptional()
  @IsUrl({}, { message: 'Canonical URL must be a valid URL' })
  canonicalUrl?: string;

  @IsOptional()
  @IsString()
  @MaxLength(80, { message: 'Slug should not exceed 80 characters' })
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'Slug must be lowercase alphanumeric with hyphens (e.g., 3-bedroom-villa-lalitpur)',
  })
  slug?: string;

  @IsOptional()
  @IsString()
  @MaxLength(95)
  ogTitle?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  ogDescription?: string;

  @IsOptional()
  @IsUrl({}, { message: 'OG Image URL must be a valid URL' })
  ogImageUrl?: string;

  @IsOptional()
  @IsNumber()
  @Min(200)
  ogImageWidth?: number;

  @IsOptional()
  @IsNumber()
  @Min(200)
  ogImageHeight?: number;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  ogImageAlt?: string;

  @IsOptional()
  @IsEnum(TwitterCardType)
  twitterCard?: TwitterCardType;

  @IsOptional()
  @IsString()
  @MaxLength(70)
  twitterTitle?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  twitterDescription?: string;

  @IsOptional()
  @IsUrl({}, { message: 'Twitter Image URL must be a valid URL' })
  twitterImageUrl?: string;

  @IsOptional()
  @IsBoolean()
  noindex?: boolean;

  @IsOptional()
  @IsBoolean()
  nofollow?: boolean;

  @IsOptional()
  @IsBoolean()
  noarchive?: boolean;

  @IsOptional()
  @IsBoolean()
  nosnippet?: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  focusKeyword?: string;

  @IsOptional()
  @IsString()
  secondaryKeywords?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  breadcrumbOverride?: string;

  @IsOptional()
  @IsString()
  locale?: string;
}

export class CreateSeoMetadataDto extends SeoMetadataDto {
  @IsString()
  @IsOptional()
  createdBy?: string;
}

export class UpdateSeoMetadataDto extends SeoMetadataDto {
  @IsString()
  @IsOptional()
  updatedBy?: string;
}

export const RESERVED_SLUGS = [
  'admin',
  'api',
  'auth',
  'login',
  'logout',
  'signup',
  'register',
  'dashboard',
  'settings',
  'profile',
  'account',
  'password',
  'reset',
  'confirm',
  'verify',
  'email',
  'sitemap',
  'robots',
  'cdn',
  'static',
  'assets',
  'uploads',
  'media',
  'files',
  'images',
  'css',
  'js',
  'wp-admin',
  'wp-content',
  'phpmyadmin',
  'administrator',
  'test',
  'home',
  'about',
  'contact',
  'faq',
  'terms',
  'privacy',
  'cookies',
  'search',
  'blog',
  'news',
  'jobs',
  'careers',
  'services',
  'products',
  'properties',
  'rent',
  'buy',
  'houses',
  'apartments',
  'land',
];

export function isReservedSlug(slug: string): boolean {
  const normalized = slug.toLowerCase();
  return RESERVED_SLUGS.some(
    (reserved) =>
      normalized === reserved || normalized.startsWith(reserved + '/'),
  );
}

export class CreateLocationPageDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  slug?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  latitude?: number;

  @IsOptional()
  @IsNumber()
  longitude?: number;

  @IsOptional()
  @IsString()
  district?: string;

  @IsOptional()
  @IsString()
  province?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  displayOrder?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @ValidateNested()
  seo?: SeoMetadataDto;
}

export class CreatePropertyTypePageDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  slug?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  propertyType: string;

  @IsOptional()
  @IsString()
  listingType?: string;

  @IsOptional()
  @IsNumber()
  minBedrooms?: number;

  @IsOptional()
  @IsNumber()
  maxBedrooms?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  displayOrder?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  seo?: SeoMetadataDto;
}

export class CreateAgentDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  slug?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  photoUrl?: string;

  @IsOptional()
  @IsString()
  licenseNumber?: string;

  @IsOptional()
  @IsNumber()
  experienceYears?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsNumber()
  @Min(0)
  displayOrder?: number;

  @IsOptional()
  seo?: SeoMetadataDto;
}

export class CreateRedirectRuleDto {
  @IsString()
  @Matches(/^\//, { message: 'Source URL must start with /' })
  sourceUrl: string;

  @IsString()
  targetUrl: string;

  @IsOptional()
  @IsEnum(RedirectTypeEnum)
  redirectType?: RedirectTypeEnum;
}
