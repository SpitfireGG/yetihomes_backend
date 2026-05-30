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

    const [total, properties] = await Promise.all([
      this.prisma.property.count({ where }),
      this.prisma.property.findMany({
        where,
        orderBy,
        ...(dto.cursor
          ? {
              cursor: { id: dto.cursor },
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
    const categoriesCount = await Promise.all([
      this.prisma.property.count({
        where: {
          status: 'PUBLISHED',
          OR: [
            { propertyType: PropertyType.APARTMENT },
            { propertyType: PropertyType.HOUSE, houseDetails: { usageType: HouseUsageType.RESIDENTIAL } },
          ],
        },
      }),
      this.prisma.property.count({
        where: {
          status: 'PUBLISHED',
          OR: [
            { houseDetails: { usageType: HouseUsageType.COMMERCIAL } },
            { landDetails: { subType: LandSubType.COMMERCIAL_LAND } },
          ],
        },
      }),
      this.prisma.property.count({
        where: {
          status: 'PUBLISHED',
          houseDetails: { usageType: HouseUsageType.SEMI_COMMERCIAL },
        },
      }),
      this.prisma.property.count({
        where: {
          status: 'PUBLISHED',
          houseDetails: { subType: HouseSubType.VILLA },
        },
      }),
      this.prisma.property.count({
        where: { status: 'PUBLISHED', propertyType: PropertyType.APARTMENT },
      }),
      this.prisma.property.count({
        where: { status: 'PUBLISHED', propertyType: PropertyType.LAND },
      }),
    ]);

    const categories = [
      { key: 'residential', label: 'Residential', count: categoriesCount[0] },
      { key: 'commercial', label: 'Commercial', count: categoriesCount[1] },
      { key: 'semi-commercial', label: 'Semi-Commercial', count: categoriesCount[2] },
      { key: 'villa', label: 'Villa', count: categoriesCount[3] },
      { key: 'apartments', label: 'Apartments', count: categoriesCount[4] },
      { key: 'land-plot', label: 'Land Plot', count: categoriesCount[5] },
    ];

    const topCitiesRaw = await this.prisma.$queryRaw<any[]>`
      SELECT 
        COALESCE(NULLIF(TRIM(city), ''), NULLIF(TRIM(district), '')) as cityName,
        COUNT(id) as count,
        SUM(CASE WHEN isFeatured THEN 1 ELSE 0 END) as featuredCount,
        MAX(createdAt) as latestCreatedAt
      FROM Property
      WHERE status = 'PUBLISHED'
      GROUP BY LOWER(COALESCE(NULLIF(TRIM(city), ''), NULLIF(TRIM(district), '')))
      HAVING cityName IS NOT NULL
      ORDER BY count DESC, featuredCount DESC, latestCreatedAt DESC
      LIMIT ${LANDING_CITY_LIMIT}
    `;

    const cities = await Promise.all(
      topCitiesRaw.map(async (row) => {
        const cityName = row.cityName;

        const typeCounts = await this.prisma.property.groupBy({
          by: ['propertyType'],
          where: {
            status: 'PUBLISHED',
            OR: [
              { city: { equals: cityName } },
              { district: { equals: cityName } },
            ],
          },
          _count: { id: true },
          orderBy: { _count: { id: 'desc' } },
          take: 1,
        });
        const dominantPropertyType = typeCounts[0]?.propertyType || null;

        const bestProperty = await this.prisma.property.findFirst({
          where: {
            status: 'PUBLISHED',
            OR: [
              { city: { equals: cityName } },
              { district: { equals: cityName } },
            ],
          },
          orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }],
          select: {
            images: {
              select: { url: true },
              orderBy: [{ isPrimary: 'desc' as const }, { sortOrder: 'asc' as const }],
              take: 1,
            },
          },
        });

        const imageUrl = bestProperty?.images?.[0]?.url || null;

        return {
          city: cityName,
          count: Number(row.count),
          imageUrl,
          dominantPropertyType,
        };
      })
    );

    return { categories, cities };
  }

  private buildWhereClause(dto: SearchPropertyDto): Prisma.PropertyWhereInput {
    const conditions: Prisma.PropertyWhereInput[] = [];

    conditions.push({ status: 'PUBLISHED' });

    if (dto.q) {
      const keyword = dto.q.trim();
      conditions.push({
        OR: [
          { title: { contains: keyword } },
          { locationText: { contains: keyword } },
          { city: { contains: keyword } },
          { district: { contains: keyword } },
          { summary: { contains: keyword } },
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
      const priceFilter: Prisma.DecimalFilter = {};
      if (dto.minPrice !== undefined) priceFilter.gte = dto.minPrice;
      if (dto.maxPrice !== undefined) priceFilter.lte = dto.maxPrice;
      conditions.push({ priceAmount: priceFilter });
    }

    if (dto.city) {
      conditions.push({
        city: { contains: dto.city },
      });
    }

    if (dto.district) {
      conditions.push({
        district: { contains: dto.district },
      });
    }

    if (dto.minArea !== undefined || dto.maxArea !== undefined) {
      const areaFilter: Prisma.DecimalNullableFilter = {};
      if (dto.minArea !== undefined) areaFilter.gte = dto.minArea;
      if (dto.maxArea !== undefined) areaFilter.lte = dto.maxArea;
      conditions.push({ areaValue: areaFilter });
    }

    if (dto.areaUnit) {
      conditions.push({ areaUnit: dto.areaUnit });
    }

    if (dto.isFeatured !== undefined) {
      conditions.push({ isFeatured: dto.isFeatured });
    }

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

}
