"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRedirectRuleDto = exports.CreateAgentDto = exports.CreatePropertyTypePageDto = exports.CreateLocationPageDto = exports.RESERVED_SLUGS = exports.UpdateSeoMetadataDto = exports.CreateSeoMetadataDto = exports.SeoMetadataDto = exports.RedirectTypeEnum = exports.TwitterCardType = void 0;
exports.isReservedSlug = isReservedSlug;
const class_validator_1 = require("class-validator");
var TwitterCardType;
(function (TwitterCardType) {
    TwitterCardType["SUMMARY"] = "summary";
    TwitterCardType["SUMMARY_LARGE_IMAGE"] = "summary_large_image";
})(TwitterCardType || (exports.TwitterCardType = TwitterCardType = {}));
var RedirectTypeEnum;
(function (RedirectTypeEnum) {
    RedirectTypeEnum["PERMANENT"] = "PERMANENT";
    RedirectTypeEnum["TEMPORARY"] = "TEMPORARY";
})(RedirectTypeEnum || (exports.RedirectTypeEnum = RedirectTypeEnum = {}));
class SeoMetadataDto {
    metaTitle;
    metaDescription;
    canonicalUrl;
    slug;
    ogTitle;
    ogDescription;
    ogImageUrl;
    ogImageWidth;
    ogImageHeight;
    ogImageAlt;
    twitterCard;
    twitterTitle;
    twitterDescription;
    twitterImageUrl;
    noindex;
    nofollow;
    noarchive;
    nosnippet;
    focusKeyword;
    secondaryKeywords;
    breadcrumbOverride;
    locale;
}
exports.SeoMetadataDto = SeoMetadataDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(10, { message: 'Meta title should be at least 10 characters' }),
    (0, class_validator_1.MaxLength)(70, { message: 'Meta title should not exceed 70 characters' }),
    __metadata("design:type", String)
], SeoMetadataDto.prototype, "metaTitle", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(50, {
        message: 'Meta description should be at least 50 characters',
    }),
    (0, class_validator_1.MaxLength)(200, {
        message: 'Meta description should not exceed 200 characters',
    }),
    __metadata("design:type", String)
], SeoMetadataDto.prototype, "metaDescription", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)({}, { message: 'Canonical URL must be a valid URL' }),
    __metadata("design:type", String)
], SeoMetadataDto.prototype, "canonicalUrl", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(80, { message: 'Slug should not exceed 80 characters' }),
    (0, class_validator_1.Matches)(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
        message: 'Slug must be lowercase alphanumeric with hyphens (e.g., 3-bedroom-villa-lalitpur)',
    }),
    __metadata("design:type", String)
], SeoMetadataDto.prototype, "slug", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(95),
    __metadata("design:type", String)
], SeoMetadataDto.prototype, "ogTitle", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], SeoMetadataDto.prototype, "ogDescription", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)({}, { message: 'OG Image URL must be a valid URL' }),
    __metadata("design:type", String)
], SeoMetadataDto.prototype, "ogImageUrl", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(200),
    __metadata("design:type", Number)
], SeoMetadataDto.prototype, "ogImageWidth", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(200),
    __metadata("design:type", Number)
], SeoMetadataDto.prototype, "ogImageHeight", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], SeoMetadataDto.prototype, "ogImageAlt", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(TwitterCardType),
    __metadata("design:type", String)
], SeoMetadataDto.prototype, "twitterCard", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(70),
    __metadata("design:type", String)
], SeoMetadataDto.prototype, "twitterTitle", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], SeoMetadataDto.prototype, "twitterDescription", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)({}, { message: 'Twitter Image URL must be a valid URL' }),
    __metadata("design:type", String)
], SeoMetadataDto.prototype, "twitterImageUrl", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SeoMetadataDto.prototype, "noindex", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SeoMetadataDto.prototype, "nofollow", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SeoMetadataDto.prototype, "noarchive", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SeoMetadataDto.prototype, "nosnippet", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], SeoMetadataDto.prototype, "focusKeyword", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SeoMetadataDto.prototype, "secondaryKeywords", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], SeoMetadataDto.prototype, "breadcrumbOverride", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SeoMetadataDto.prototype, "locale", void 0);
class CreateSeoMetadataDto extends SeoMetadataDto {
    createdBy;
}
exports.CreateSeoMetadataDto = CreateSeoMetadataDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSeoMetadataDto.prototype, "createdBy", void 0);
class UpdateSeoMetadataDto extends SeoMetadataDto {
    updatedBy;
}
exports.UpdateSeoMetadataDto = UpdateSeoMetadataDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateSeoMetadataDto.prototype, "updatedBy", void 0);
exports.RESERVED_SLUGS = [
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
function isReservedSlug(slug) {
    const normalized = slug.toLowerCase();
    return exports.RESERVED_SLUGS.some((reserved) => normalized === reserved || normalized.startsWith(reserved + '/'));
}
class CreateLocationPageDto {
    name;
    slug;
    description;
    latitude;
    longitude;
    district;
    province;
    displayOrder;
    isActive;
    seo;
}
exports.CreateLocationPageDto = CreateLocationPageDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLocationPageDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(80),
    (0, class_validator_1.Matches)(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    __metadata("design:type", String)
], CreateLocationPageDto.prototype, "slug", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLocationPageDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateLocationPageDto.prototype, "latitude", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateLocationPageDto.prototype, "longitude", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLocationPageDto.prototype, "district", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLocationPageDto.prototype, "province", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateLocationPageDto.prototype, "displayOrder", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateLocationPageDto.prototype, "isActive", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", SeoMetadataDto)
], CreateLocationPageDto.prototype, "seo", void 0);
class CreatePropertyTypePageDto {
    name;
    slug;
    description;
    propertyType;
    listingType;
    minBedrooms;
    maxBedrooms;
    displayOrder;
    isActive;
    seo;
}
exports.CreatePropertyTypePageDto = CreatePropertyTypePageDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePropertyTypePageDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(80),
    (0, class_validator_1.Matches)(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    __metadata("design:type", String)
], CreatePropertyTypePageDto.prototype, "slug", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePropertyTypePageDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePropertyTypePageDto.prototype, "propertyType", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePropertyTypePageDto.prototype, "listingType", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePropertyTypePageDto.prototype, "minBedrooms", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePropertyTypePageDto.prototype, "maxBedrooms", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreatePropertyTypePageDto.prototype, "displayOrder", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreatePropertyTypePageDto.prototype, "isActive", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", SeoMetadataDto)
], CreatePropertyTypePageDto.prototype, "seo", void 0);
class CreateAgentDto {
    name;
    slug;
    email;
    phone;
    bio;
    photoUrl;
    licenseNumber;
    experienceYears;
    isActive;
    displayOrder;
    seo;
}
exports.CreateAgentDto = CreateAgentDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAgentDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(80),
    (0, class_validator_1.Matches)(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    __metadata("design:type", String)
], CreateAgentDto.prototype, "slug", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAgentDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAgentDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAgentDto.prototype, "bio", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAgentDto.prototype, "photoUrl", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAgentDto.prototype, "licenseNumber", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateAgentDto.prototype, "experienceYears", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateAgentDto.prototype, "isActive", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateAgentDto.prototype, "displayOrder", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", SeoMetadataDto)
], CreateAgentDto.prototype, "seo", void 0);
class CreateRedirectRuleDto {
    sourceUrl;
    targetUrl;
    redirectType;
}
exports.CreateRedirectRuleDto = CreateRedirectRuleDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^\//, { message: 'Source URL must start with /' }),
    __metadata("design:type", String)
], CreateRedirectRuleDto.prototype, "sourceUrl", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRedirectRuleDto.prototype, "targetUrl", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(RedirectTypeEnum),
    __metadata("design:type", String)
], CreateRedirectRuleDto.prototype, "redirectType", void 0);
//# sourceMappingURL=seo-metadata.dto.js.map