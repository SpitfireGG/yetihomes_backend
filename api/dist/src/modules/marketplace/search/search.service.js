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
exports.SearchService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
const search_dto_1 = require("./search.dto");
const client_1 = require("@prisma/client");
const LANDING_CATEGORY_DEFINITIONS = [
    {
        key: 'residential',
        label: 'Residential',
        matches: (property) => property.propertyType === client_1.PropertyType.APARTMENT ||
            (property.propertyType === client_1.PropertyType.HOUSE &&
                property.houseDetails?.usageType === client_1.HouseUsageType.RESIDENTIAL),
    },
    {
        key: 'commercial',
        label: 'Commercial',
        matches: (property) => property.houseDetails?.usageType === client_1.HouseUsageType.COMMERCIAL ||
            property.landDetails?.subType === client_1.LandSubType.COMMERCIAL_LAND,
    },
    {
        key: 'semi-commercial',
        label: 'Semi-Commercial',
        matches: (property) => property.houseDetails?.usageType === client_1.HouseUsageType.SEMI_COMMERCIAL,
    },
    {
        key: 'villa',
        label: 'Villa',
        matches: (property) => property.houseDetails?.subType === client_1.HouseSubType.VILLA,
    },
    {
        key: 'apartments',
        label: 'Apartments',
        matches: (property) => property.propertyType === client_1.PropertyType.APARTMENT,
    },
    {
        key: 'land-plot',
        label: 'Land Plot',
        matches: (property) => property.propertyType === client_1.PropertyType.LAND,
    },
];
const LANDING_CITY_LIMIT = 6;
const HOUSE_SUB_TYPE_VALUES = Object.values(client_1.HouseSubType);
const APARTMENT_SUB_TYPE_VALUES = Object.values(client_1.ApartmentSubType);
const LAND_SUB_TYPE_VALUES = Object.values(client_1.LandSubType);
function isHouseSubType(value) {
    return HOUSE_SUB_TYPE_VALUES.includes(value);
}
function isApartmentSubType(value) {
    return APARTMENT_SUB_TYPE_VALUES.includes(value);
}
function isLandSubType(value) {
    return LAND_SUB_TYPE_VALUES.includes(value);
}
let SearchService = class SearchService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async search(dto) {
        const limit = dto.limit ?? 20;
        const where = this.buildWhereClause(dto);
        const orderBy = this.buildOrderBy(dto.sortBy);
        const [total, properties] = await Promise.all([
            this.prisma.property.count({ where }),
            this.prisma.property.findMany({
                where,
                orderBy,
                take: limit + 1,
                ...(dto.cursor
                    ? {
                        cursor: { id: dto.cursor },
                        skip: 1,
                    }
                    : {}),
                select: {
                    id: true,
                    title: true,
                    slug: true,
                    summary: true,
                    propertyType: true,
                    listingType: true,
                    priceAmount: true,
                    currency: true,
                    pricePeriod: true,
                    status: true,
                    isFeatured: true,
                    badgeLabel: true,
                    badgeTone: true,
                    locationText: true,
                    district: true,
                    city: true,
                    areaValue: true,
                    areaUnit: true,
                    isVerified: true,
                    publishedAt: true,
                    createdAt: true,
                    houseDetails: {
                        select: {
                            subType: true,
                            bedrooms: true,
                            bathrooms: true,
                            kitchens: true,
                            floors: true,
                            parkingSpaces: true,
                            furnishingStatus: true,
                            buildYear: true,
                        },
                    },
                    apartmentDetails: {
                        select: {
                            subType: true,
                            bedrooms: true,
                            bathrooms: true,
                            balconies: true,
                            floorNumber: true,
                            totalFloors: true,
                            hasLift: true,
                            hasParking: true,
                            furnishingStatus: true,
                        },
                    },
                    landDetails: {
                        select: {
                            subType: true,
                            roadAccessFeet: true,
                            frontageFeet: true,
                            facingDirection: true,
                            plotShape: true,
                            isCornerPlot: true,
                        },
                    },
                    images: {
                        select: {
                            id: true,
                            url: true,
                            altText: true,
                            isPrimary: true,
                        },
                        orderBy: { sortOrder: 'asc' },
                        take: 3,
                    },
                },
            }),
        ]);
        const hasMore = properties.length > limit;
        const results = hasMore ? properties.slice(0, limit) : properties;
        const nextCursor = hasMore ? results[results.length - 1]?.id : null;
        return {
            data: results,
            meta: {
                total,
                nextCursor,
                hasMore,
                limit,
            },
        };
    }
    async getBySlug(slug) {
        const property = await this.prisma.property.findFirst({
            where: { slug, status: 'PUBLISHED' },
            select: {
                id: true,
                title: true,
                slug: true,
                summary: true,
                description: true,
                propertyType: true,
                listingType: true,
                priceAmount: true,
                currency: true,
                pricePeriod: true,
                status: true,
                isFeatured: true,
                badgeLabel: true,
                badgeTone: true,
                locationText: true,
                district: true,
                city: true,
                latitude: true,
                longitude: true,
                areaValue: true,
                areaUnit: true,
                titleStatus: true,
                waterAvailability: true,
                electricity: true,
                isVerified: true,
                isOwnerApproved: true,
                publishedAt: true,
                createdAt: true,
                updatedAt: true,
                videoUrl: true,
                mapIframe: true,
                houseDetails: {
                    select: {
                        subType: true,
                        bedrooms: true,
                        bathrooms: true,
                        kitchens: true,
                        floors: true,
                        parkingSpaces: true,
                        furnishingStatus: true,
                        buildYear: true,
                    },
                },
                apartmentDetails: {
                    select: {
                        subType: true,
                        bedrooms: true,
                        bathrooms: true,
                        balconies: true,
                        floorNumber: true,
                        totalFloors: true,
                        hasLift: true,
                        hasParking: true,
                        furnishingStatus: true,
                    },
                },
                landDetails: {
                    select: {
                        subType: true,
                        roadAccessFeet: true,
                        frontageFeet: true,
                        facingDirection: true,
                        plotShape: true,
                        isCornerPlot: true,
                    },
                },
                images: {
                    select: {
                        id: true,
                        url: true,
                        altText: true,
                        isPrimary: true,
                        sortOrder: true,
                    },
                    orderBy: { sortOrder: 'asc' },
                },
            },
        });
        if (!property) {
            throw new common_1.NotFoundException(`Property with slug ${slug} not found`);
        }
        return property;
    }
    async getLandingSummary() {
        const properties = await this.prisma.property.findMany({
            where: {
                status: 'PUBLISHED',
            },
            select: {
                propertyType: true,
                city: true,
                district: true,
                isFeatured: true,
                createdAt: true,
                houseDetails: {
                    select: {
                        usageType: true,
                        subType: true,
                    },
                },
                landDetails: {
                    select: {
                        subType: true,
                    },
                },
                images: {
                    select: {
                        url: true,
                    },
                    orderBy: [{ isPrimary: 'desc' }, { sortOrder: 'asc' }],
                    take: 1,
                },
            },
        });
        return {
            categories: this.buildLandingCategories(properties),
            cities: this.buildLandingCities(properties),
        };
    }
    buildWhereClause(dto) {
        const conditions = [];
        conditions.push({ status: 'PUBLISHED' });
        if (dto.q) {
            const keyword = dto.q.trim();
            conditions.push({
                OR: [
                    { title: { contains: keyword, mode: 'insensitive' } },
                    { locationText: { contains: keyword, mode: 'insensitive' } },
                    { city: { contains: keyword, mode: 'insensitive' } },
                    { district: { contains: keyword, mode: 'insensitive' } },
                    { summary: { contains: keyword, mode: 'insensitive' } },
                ],
            });
        }
        if (dto.propertyType) {
            conditions.push({ propertyType: dto.propertyType });
        }
        if (dto.listingType) {
            conditions.push({ listingType: dto.listingType });
        }
        if (dto.minPrice !== undefined || dto.maxPrice !== undefined) {
            const priceFilter = {};
            if (dto.minPrice !== undefined)
                priceFilter.gte = dto.minPrice;
            if (dto.maxPrice !== undefined)
                priceFilter.lte = dto.maxPrice;
            conditions.push({ priceAmount: priceFilter });
        }
        if (dto.city) {
            conditions.push({
                city: { contains: dto.city, mode: 'insensitive' },
            });
        }
        if (dto.district) {
            conditions.push({
                district: { contains: dto.district, mode: 'insensitive' },
            });
        }
        if (dto.minArea !== undefined || dto.maxArea !== undefined) {
            const areaFilter = {};
            if (dto.minArea !== undefined)
                areaFilter.gte = dto.minArea;
            if (dto.maxArea !== undefined)
                areaFilter.lte = dto.maxArea;
            conditions.push({ areaValue: areaFilter });
        }
        if (dto.areaUnit) {
            conditions.push({ areaUnit: dto.areaUnit });
        }
        if (dto.isFeatured !== undefined) {
            conditions.push({ isFeatured: dto.isFeatured });
        }
        if (dto.subType) {
            const subTypeFilters = [];
            if (isHouseSubType(dto.subType)) {
                subTypeFilters.push({
                    houseDetails: { is: { subType: dto.subType } },
                });
            }
            if (isApartmentSubType(dto.subType)) {
                subTypeFilters.push({
                    apartmentDetails: { is: { subType: dto.subType } },
                });
            }
            if (isLandSubType(dto.subType)) {
                subTypeFilters.push({
                    landDetails: { is: { subType: dto.subType } },
                });
            }
            if (subTypeFilters.length > 0) {
                conditions.push({
                    OR: subTypeFilters,
                });
            }
        }
        if (dto.bedrooms !== undefined) {
            conditions.push({
                OR: [
                    { houseDetails: { bedrooms: { gte: dto.bedrooms } } },
                    { apartmentDetails: { bedrooms: { gte: dto.bedrooms } } },
                ],
            });
        }
        if (dto.bathrooms !== undefined) {
            conditions.push({
                OR: [
                    { houseDetails: { bathrooms: { gte: dto.bathrooms } } },
                    { apartmentDetails: { bathrooms: { gte: dto.bathrooms } } },
                ],
            });
        }
        if (dto.furnishing) {
            conditions.push({
                OR: [
                    { houseDetails: { furnishingStatus: dto.furnishing } },
                    { apartmentDetails: { furnishingStatus: dto.furnishing } },
                ],
            });
        }
        if (dto.facingDirection) {
            conditions.push({
                landDetails: { facingDirection: dto.facingDirection },
            });
        }
        return conditions.length > 0 ? { AND: conditions } : {};
    }
    buildOrderBy(sortBy) {
        switch (sortBy) {
            case search_dto_1.SortBy.PRICE_ASC:
                return [{ priceAmount: 'asc' }, { createdAt: 'desc' }];
            case search_dto_1.SortBy.PRICE_DESC:
                return [{ priceAmount: 'desc' }, { createdAt: 'desc' }];
            case search_dto_1.SortBy.OLDEST:
                return [{ createdAt: 'asc' }];
            case search_dto_1.SortBy.NEWEST:
            default:
                return [{ createdAt: 'desc' }];
        }
    }
    buildLandingCategories(properties) {
        return LANDING_CATEGORY_DEFINITIONS.map((category) => ({
            key: category.key,
            label: category.label,
            count: properties.filter(category.matches).length,
        }));
    }
    buildLandingCities(properties) {
        const cities = new Map();
        for (const property of properties) {
            const cityName = (property.city ?? property.district ?? '').trim();
            if (!cityName) {
                continue;
            }
            const cityEntry = cities.get(cityName) ?? {
                city: cityName,
                count: 0,
                featuredCount: 0,
                latestCreatedAt: 0,
                imageUrl: null,
                imageScore: Number.NEGATIVE_INFINITY,
                propertyTypeCounts: {
                    [client_1.PropertyType.HOUSE]: 0,
                    [client_1.PropertyType.APARTMENT]: 0,
                    [client_1.PropertyType.LAND]: 0,
                },
            };
            cityEntry.count += 1;
            cityEntry.propertyTypeCounts[property.propertyType] += 1;
            if (property.isFeatured) {
                cityEntry.featuredCount += 1;
            }
            const createdAt = property.createdAt.getTime();
            cityEntry.latestCreatedAt = Math.max(cityEntry.latestCreatedAt, createdAt);
            const imageUrl = property.images[0]?.url ?? null;
            const imageScore = createdAt + (property.isFeatured ? 10_000_000_000_000 : 0);
            if (imageUrl && imageScore > cityEntry.imageScore) {
                cityEntry.imageUrl = imageUrl;
                cityEntry.imageScore = imageScore;
            }
            cities.set(cityName, cityEntry);
        }
        return Array.from(cities.values())
            .sort((left, right) => {
            if (right.count !== left.count) {
                return right.count - left.count;
            }
            if (right.featuredCount !== left.featuredCount) {
                return right.featuredCount - left.featuredCount;
            }
            return right.latestCreatedAt - left.latestCreatedAt;
        })
            .slice(0, LANDING_CITY_LIMIT)
            .map((city) => ({
            city: city.city,
            count: city.count,
            imageUrl: city.imageUrl,
            dominantPropertyType: this.resolveDominantPropertyType(city.propertyTypeCounts),
        }));
    }
    resolveDominantPropertyType(counts) {
        const ranking = [
            client_1.PropertyType.HOUSE,
            client_1.PropertyType.APARTMENT,
            client_1.PropertyType.LAND,
        ];
        let bestType = null;
        let bestCount = 0;
        for (const propertyType of ranking) {
            const count = counts[propertyType];
            if (count > bestCount) {
                bestType = propertyType;
                bestCount = count;
            }
        }
        return bestType;
    }
};
exports.SearchService = SearchService;
exports.SearchService = SearchService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SearchService);
//# sourceMappingURL=search.service.js.map