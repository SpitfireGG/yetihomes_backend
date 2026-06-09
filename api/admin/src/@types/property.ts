export type PropertyType = "HOUSE" | "APARTMENT" | "LAND";
export type ListingType = "SALE" | "RENT";
export type PropertyStatus = "DRAFT" | "PUBLISHED" | "SOLD" | "RENTED" | "ARCHIVED";
export type PricePeriod = "TOTAL" | "MONTHLY" | "YEARLY";
export type CurrencyCode = "NPR" | "USD";
export type AreaUnit = "SQ_FT" | "SQ_M" | "AANA" | "ROPANI" | "BIGHA" | "KATTHA" | "DHUR";
export type BadgeTone = "NEUTRAL" | "WARM" | "COOL";
export type FurnishingStatus = "UNFURNISHED" | "SEMI_FURNISHED" | "FULLY_FURNISHED";
export type HouseSubType = "BUNGALOW" | "SEMI_BUNGALOW" | "VILLA" | "DUPLEX" | "TOWNHOUSE" | "COMMERCIAL" | "SEMI_COMMERCIAL" | "FLAT_SYSTEM_HOSUE" | "COLONY_HOUSE";
export type HouseUsageType = "RESIDENTIAL" | "COMMERCIAL" | "SEMI_COMMERCIAL";
export type ApartmentSubType = "STUDIO" | "APARTMENT" | "PENTHOUSE" | "CONDO" | "LUXURY";
export type LandSubType = "RESIDENTIAL_PLOT" | "COMMERCIAL_LAND" | "AGRICULTURAL_LAND" | "COLONY_LAND" | "GUTHI_LAND";
export type FacingDirection = "EAST" | "WEST" | "NORTH" | "SOUTH" | "NORTH_EAST" | "NORTH_WEST" | "SOUTH_EAST" | "SOUTH_WEST";
export type RoadType = "PITCHED" | "CONCRETE" | "GRAVEL" | "UNDER_CONSTRUCTION" | "NONE";
export type ServiceNearbyType = "SCHOOL" | "HOSPITAL" | "PHARMACY" | "SUPERMARKET" | "PARK" | "TEMPLE" | "MOSQUE" | "CHURCH" | "GYM" | "RESTAURANT" | "BANK" | "ATM" | "GAS_STATION" | "BUS_STOP" | "AIRPORT" | "OTHER";

export type InquiryType = "GENERAL" | "PROPERTY" | "SCHEDULE_VISIT" | "SELLER";
export type InquiryStatus = "NEW" | "CONTACTED" | "CLOSED" | "SPAM";

export interface Property {
  id: string;
  title: string;
  slug: string;
  propertyCode: string | null;
  summary: string | null;
  description: string;
  propertyType: PropertyType;
  listingType: ListingType;
  priceAmount: number;
  currency: CurrencyCode;
  pricePeriod: PricePeriod;
  status: PropertyStatus;
  isFeatured: boolean;
  badgeLabel: string | null;
  badgeTone: BadgeTone | null;
  locationText: string;
  district: string | null;
  city: string | null;
  latitude: number | null;
  longitude: number | null;
  areaValue: number | null;
  areaUnit: AreaUnit | null;
  titleStatus: string | null;
  waterAvailability: string | null;
  electricity: string | null;
  isVerified: boolean;
  isOwnerApproved: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  videoUrl: string | null;
  mapIframe: string | null;
  houseDetails: HouseDetails | null;
  apartmentDetails: ApartmentDetails | null;
  landDetails: LandDetails | null;
  images: PropertyImage[];
  propertyAmenities: PropertyAmenity[];
  servicesNearby: ServiceNearby[];
  inquiries: Inquiry[];
}

export interface HouseDetails {
  id: string;
  propertyId: string;
  subType: HouseSubType;
  usageType: HouseUsageType;
  bedrooms: number | null;
  bathrooms: number | null;
  kitchens: number | null;
  floors: number | null;
  parkingSpaces: number | null;
  furnishingStatus: FurnishingStatus | null;
  buildYear: number | null;
  facingDirection: FacingDirection | null;
  roadType: RoadType | null;
  roadSize: number | null;
}

export interface ApartmentDetails {
  id: string;
  propertyId: string;
  subType: ApartmentSubType;
  bedrooms: number | null;
  bathrooms: number | null;
  balconies: number | null;
  floorNumber: number | null;
  totalFloors: number | null;
  hasLift: boolean;
  hasParking: boolean;
  furnishingStatus: FurnishingStatus | null;
  facingDirection: FacingDirection | null;
  roadType: RoadType | null;
  roadSize: number | null;
}

export interface LandDetails {
  id: string;
  propertyId: string;
  subType: LandSubType;
  roadAccessFeet: number | null;
  frontageFeet: number | null;
  facingDirection: FacingDirection | null;
  plotShape: string | null;
  zoningType: string | null;
  isCornerPlot: boolean;
}

export interface PropertyImage {
  id: string;
  propertyId: string;
  url: string;
  altText: string | null;
  caption: string | null;
  sortOrder: number;
  isPrimary: boolean;
  createdAt: string;
}

export interface PropertyAmenity {
  propertyId: string;
  amenityId: string;
  amenity: Amenity;
}

export interface Amenity {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
}

export interface ServiceNearby {
  id: string;
  propertyId: string;
  serviceType: ServiceNearbyType;
  name: string;
}

export interface Inquiry {
  id: string;
  propertyId: string | null;
  type: InquiryType;
  status: InquiryStatus;
  fullName: string;
  email: string | null;
  phone: string | null;
  message: string;
  createdAt: string;
  updatedAt: string;
  property?: Property;
}

export interface PropertyFormData {
  title: string;
  slug: string;
  propertyCode?: string;
  summary?: string;
  description: string;
  propertyType: PropertyType;
  listingType: ListingType;
  priceAmount: number;
  currency?: CurrencyCode;
  pricePeriod?: PricePeriod;
  status?: PropertyStatus;
  locationText: string;
  district?: string;
  city?: string;
  areaValue?: number;
  areaUnit?: AreaUnit;
  houseDetails?: Partial<HouseDetails>;
  apartmentDetails?: Partial<ApartmentDetails>;
  landDetails?: Partial<LandDetails>;
  servicesNearby?: { serviceType: ServiceNearbyType; name: string }[];
}