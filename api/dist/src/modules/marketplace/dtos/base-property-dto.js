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
exports.BasePropertyDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const client_1 = require("@prisma/client");
const base_property_image_dto_1 = require("./base-property-image-dto");
class BasePropertyDto {
    title;
    slug;
    summary;
    description;
    listingType;
    priceAmount;
    videoUrl;
    mapIframe;
    currency;
    pricePeriod;
    status;
    isFeatured;
    badgeLabel;
    badgeTone;
    locationText;
    district;
    city;
    latitude;
    longitude;
    areaValue;
    areaUnit;
    images;
    amenityIds;
}
exports.BasePropertyDto = BasePropertyDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BasePropertyDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BasePropertyDto.prototype, "slug", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BasePropertyDto.prototype, "summary", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BasePropertyDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_1.ListingType),
    __metadata("design:type", String)
], BasePropertyDto.prototype, "listingType", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], BasePropertyDto.prototype, "priceAmount", void 0);
__decorate([
    (0, class_validator_1.IsUrl)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BasePropertyDto.prototype, "videoUrl", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BasePropertyDto.prototype, "mapIframe", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_1.CurrencyCode),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BasePropertyDto.prototype, "currency", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_1.PricePeriod),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BasePropertyDto.prototype, "pricePeriod", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_1.PropertyStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BasePropertyDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], BasePropertyDto.prototype, "isFeatured", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BasePropertyDto.prototype, "badgeLabel", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_1.BadgeTone),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BasePropertyDto.prototype, "badgeTone", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BasePropertyDto.prototype, "locationText", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BasePropertyDto.prototype, "district", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BasePropertyDto.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], BasePropertyDto.prototype, "latitude", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], BasePropertyDto.prototype, "longitude", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], BasePropertyDto.prototype, "areaValue", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_1.AreaUnit),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BasePropertyDto.prototype, "areaUnit", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => base_property_image_dto_1.CreateBasePropertyImageDto),
    __metadata("design:type", Array)
], BasePropertyDto.prototype, "images", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], BasePropertyDto.prototype, "amenityIds", void 0);
//# sourceMappingURL=base-property-dto.js.map