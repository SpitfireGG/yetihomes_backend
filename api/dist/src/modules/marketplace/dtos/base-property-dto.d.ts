import { ListingType, PropertyStatus, CurrencyCode, PricePeriod, AreaUnit, BadgeTone } from '@prisma/client';
import { CreateBasePropertyImageDto } from './base-property-image-dto';
export declare class BasePropertyDto {
    title: string;
    slug: string;
    summary?: string;
    description: string;
    listingType: ListingType;
    priceAmount: number;
    videoUrl?: string;
    mapIframe?: string;
    currency?: CurrencyCode;
    pricePeriod?: PricePeriod;
    status?: PropertyStatus;
    isFeatured?: boolean;
    badgeLabel?: string;
    badgeTone?: BadgeTone;
    locationText: string;
    district?: string;
    city?: string;
    latitude?: number;
    longitude?: number;
    areaValue?: number;
    areaUnit?: AreaUnit;
    images?: CreateBasePropertyImageDto[];
    amenityIds?: string[];
}
