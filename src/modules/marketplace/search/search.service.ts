import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SearchPropertyDto, SortBy } from './search.dto';
import {
  ApartmentSubType,
  HouseSubType,
  HouseUsageType,
  LandSubType,
  Prisma,
  PropertyType,
} from '@prisma/client';

type LandingCategoryKey =
  | 'residential'
  | 'commercial'
  | 'semi-commercial'
  | 'villa'
  | 'apartments'
  | 'land-plot';

type LandingCategorySummary = {
  key: LandingCategoryKey;
  label: string;
  count: number;
};

type LandingCitySummary = {
  city: string;
  count: number;
  imageUrl: string | null;
  dominantPropertyType: PropertyType | null;
};

type LandingPropertySnapshot = {
  propertyType: PropertyType;
  city: string | null;
  district: string | null;
  isFeatured: boolean;
  createdAt: Date;
  houseDetails: {
    usageType: HouseUsageType;
    subType: HouseSubType;
  } | null;
  landDetails: {
    subType: LandSubType;
  } | null;
  images: Array<{
    url: string;
  }>;
};

const LANDING_CATEGORY_DEFINITIONS: Array<{
  key: LandingCategoryKey;
  label: string;
  matches: (property: LandingPropertySnapshot) => boolean;
}> = [
  {
    key: 'residential',
    label: 'Residential',
    matches: (property) =>
      property.propertyType === PropertyType.APARTMENT ||
      (property.propertyType === PropertyType.HOUSE &&
        property.houseDetails?.usageType === HouseUsageType.RESIDENTIAL),
  },
  {
    key: 'commercial',
    label: 'Commercial',
    matches: (property) =>
      property.houseDetails?.usageType === HouseUsageType.COMMERCIAL ||
      property.landDetails?.subType === LandSubType.COMMERCIAL_LAND,
  },
  {
    key: 'semi-commercial',
    label: 'Semi-Commercial',
    matches: (property) =>
      property.houseDetails?.usageType === HouseUsageType.SEMI_COMMERCIAL,
  },
  {
    key: 'villa',
    label: 'Villa',
    matches: (property) =>
      property.houseDetails?.subType === HouseSubType.VILLA,
  },
  {
    key: 'apartments',
    label: 'Apartments',
    matches: (property) => property.propertyType === PropertyType.APARTMENT,
  },
  {
    key: 'land-plot',
    label: 'Land Plot',
    matches: (property) => property.propertyType === PropertyType.LAND,
  },
];

const LANDING_CITY_LIMIT = 6;
const HOUSE_SUB_TYPE_VALUES = Object.values(HouseSubType) as HouseSubType[];
const APARTMENT_SUB_TYPE_VALUES = Object.values(
  ApartmentSubType,
) as ApartmentSubType[];
const LAND_SUB_TYPE_VALUES = Object.values(LandSubType) as LandSubType[];

function isHouseSubType(value: string): value is HouseSubType {
  return HOUSE_SUB_TYPE_VALUES.includes(value as HouseSubType);
}

function isApartmentSubType(value: string): value is ApartmentSubType {
  return APARTMENT_SUB_TYPE_VALUES.includes(value as ApartmentSubType);
}

function isLandSubType(value: string): value is LandSubType {
  return LAND_SUB_TYPE_VALUES.includes(value as LandSubType);
}

@Injectable()
export class SearchService {
  constructor(private readonly prisma: PrismaService) {}

  async search(dto: SearchPropertyDto) {
    const limit = dto.limit ?? 20;

    const where = this.buildWhereClause(dto);
    const orderBy = this.buildOrderBy(dto.sortBy);

    // Run count and data fetch in parallel for speed
    const [total, properties] = await Promise.all([
      this.prisma.property.count({ where }),
      this.prisma.property.findMany({
        where,
        orderBy,
        take: limit + 1, // Fetch one extra to determine if there's a next page
        ...(dto.cursor
          ? {
              cursor: { id: dto.cursor },
              skip: 1, // Skip the cursor itself
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
            take: 3, // Only fetch first 3 images for card display
          },
        },
      }),
    ]);

    // Determine pagination
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

  async getBySlug(slug: string) {
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
      throw new NotFoundException(`Property with slug ${slug} not found`);
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

  private buildWhereClause(dto: SearchPropertyDto): Prisma.PropertyWhereInput {
    const conditions: Prisma.PropertyWhereInput[] = [];

    // Always filter for published properties only
    conditions.push({ status: 'PUBLISHED' });

    // Keyword search — match against title, locationText, city, district, summary
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

    // Property type filter
    if (dto.propertyType) {
      conditions.push({ propertyType: dto.propertyType });
    }

    // Listing type filter
    if (dto.listingType) {
      conditions.push({ listingType: dto.listingType });
    }

    // Price range
    if (dto.minPrice !== undefined || dto.maxPrice !== undefined) {
      const priceFilter: Prisma.DecimalFilter = {};
      if (dto.minPrice !== undefined) priceFilter.gte = dto.minPrice;
      if (dto.maxPrice !== undefined) priceFilter.lte = dto.maxPrice;
      conditions.push({ priceAmount: priceFilter });
    }

    // Location filters
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

    // Area range
    if (dto.minArea !== undefined || dto.maxArea !== undefined) {
      const areaFilter: Prisma.DecimalNullableFilter = {};
      if (dto.minArea !== undefined) areaFilter.gte = dto.minArea;
      if (dto.maxArea !== undefined) areaFilter.lte = dto.maxArea;
      conditions.push({ areaValue: areaFilter });
    }

    if (dto.areaUnit) {
      conditions.push({ areaUnit: dto.areaUnit });
    }

    // Featured filter
    if (dto.isFeatured !== undefined) {
      conditions.push({ isFeatured: dto.isFeatured });
    }

    // SubType filter — filter by property subType (DETACHED_HOME, VILLA, etc.)
    if (dto.subType) {
      const subTypeFilters: Prisma.PropertyWhereInput[] = [];

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

    // Bedroom filter — applies to houses and apartments
    if (dto.bedrooms !== undefined) {
      conditions.push({
        OR: [
          { houseDetails: { bedrooms: { gte: dto.bedrooms } } },
          { apartmentDetails: { bedrooms: { gte: dto.bedrooms } } },
        ],
      });
    }

    // Bathroom filter — applies to houses and apartments
    if (dto.bathrooms !== undefined) {
      conditions.push({
        OR: [
          { houseDetails: { bathrooms: { gte: dto.bathrooms } } },
          { apartmentDetails: { bathrooms: { gte: dto.bathrooms } } },
        ],
      });
    }

    // Furnishing filter — applies to houses and apartments
    if (dto.furnishing) {
      conditions.push({
        OR: [
          { houseDetails: { furnishingStatus: dto.furnishing } },
          { apartmentDetails: { furnishingStatus: dto.furnishing } },
        ],
      });
    }

    // Facing direction filter — applies to lands
    if (dto.facingDirection) {
      conditions.push({
        landDetails: { facingDirection: dto.facingDirection },
      });
    }

    return conditions.length > 0 ? { AND: conditions } : {};
  }

  private buildOrderBy(
    sortBy?: SortBy,
  ): Prisma.PropertyOrderByWithRelationInput[] {
    switch (sortBy) {
      case SortBy.PRICE_ASC:
        return [{ priceAmount: 'asc' }, { createdAt: 'desc' }];
      case SortBy.PRICE_DESC:
        return [{ priceAmount: 'desc' }, { createdAt: 'desc' }];
      case SortBy.OLDEST:
        return [{ createdAt: 'asc' }];
      case SortBy.NEWEST:
      default:
        return [{ createdAt: 'desc' }];
    }
  }

  private buildLandingCategories(
    properties: LandingPropertySnapshot[],
  ): LandingCategorySummary[] {
    return LANDING_CATEGORY_DEFINITIONS.map((category) => ({
      key: category.key,
      label: category.label,
      count: properties.filter(category.matches).length,
    }));
  }

  private buildLandingCities(
    properties: LandingPropertySnapshot[],
  ): LandingCitySummary[] {
    const cities = new Map<
      string,
      {
        city: string;
        count: number;
        featuredCount: number;
        latestCreatedAt: number;
        imageUrl: string | null;
        imageScore: number;
        propertyTypeCounts: Record<PropertyType, number>;
      }
    >();

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
          [PropertyType.HOUSE]: 0,
          [PropertyType.APARTMENT]: 0,
          [PropertyType.LAND]: 0,
        },
      };

      cityEntry.count += 1;
      cityEntry.propertyTypeCounts[property.propertyType] += 1;

      if (property.isFeatured) {
        cityEntry.featuredCount += 1;
      }

      const createdAt = property.createdAt.getTime();
      cityEntry.latestCreatedAt = Math.max(
        cityEntry.latestCreatedAt,
        createdAt,
      );

      const imageUrl = property.images[0]?.url ?? null;
      const imageScore =
        createdAt + (property.isFeatured ? 10_000_000_000_000 : 0);

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
        dominantPropertyType: this.resolveDominantPropertyType(
          city.propertyTypeCounts,
        ),
      }));
  }

  private resolveDominantPropertyType(
    counts: Record<PropertyType, number>,
  ): PropertyType | null {
    const ranking = [
      PropertyType.HOUSE,
      PropertyType.APARTMENT,
      PropertyType.LAND,
    ];
    let bestType: PropertyType | null = null;
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
}
