/*
  Warnings:

  - The primary key for the `CompanyInfo` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- CreateEnum
CREATE TYPE "PropertyType" AS ENUM ('HOUSE', 'APARTMENT', 'LAND');

-- CreateEnum
CREATE TYPE "ListingType" AS ENUM ('SALE', 'RENT');

-- CreateEnum
CREATE TYPE "PricePeriod" AS ENUM ('TOTAL', 'MONTHLY', 'YEARLY');

-- CreateEnum
CREATE TYPE "PropertyStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'SOLD', 'RENTED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "CurrencyCode" AS ENUM ('NPR', 'USD');

-- CreateEnum
CREATE TYPE "AreaUnit" AS ENUM ('SQ_FT', 'SQ_M', 'AANA', 'ROPANI');

-- CreateEnum
CREATE TYPE "BadgeTone" AS ENUM ('NEUTRAL', 'WARM', 'COOL');

-- CreateEnum
CREATE TYPE "FurnishingStatus" AS ENUM ('UNFURNISHED', 'SEMI_FURNISHED', 'FULLY_FURNISHED');

-- CreateEnum
CREATE TYPE "HouseSubType" AS ENUM ('BUNGALOW', 'VILLA', 'DUPLEX', 'TOWNHOUSE');

-- CreateEnum
CREATE TYPE "HouseUsageType" AS ENUM ('RESIDENTIAL', 'COMMERCIAL', 'SEMI_COMMERCIAL');

-- CreateEnum
CREATE TYPE "ApartmentSubType" AS ENUM ('STUDIO', 'APARTMENT', 'PENTHOUSE', 'CONDO');

-- CreateEnum
CREATE TYPE "LandSubType" AS ENUM ('RESIDENTIAL_PLOT', 'COMMERCIAL_LAND', 'AGRICULTURAL_LAND');

-- CreateEnum
CREATE TYPE "FacingDirection" AS ENUM ('EAST', 'WEST', 'NORTH', 'SOUTH', 'NORTH_EAST', 'NORTH_WEST', 'SOUTH_EAST', 'SOUTH_WEST');

-- CreateEnum
CREATE TYPE "InquiryType" AS ENUM ('GENERAL', 'PROPERTY', 'SCHEDULE_VISIT', 'SELLER');

-- CreateEnum
CREATE TYPE "InquiryStatus" AS ENUM ('NEW', 'CONTACTED', 'CLOSED', 'SPAM');

-- AlterTable
ALTER TABLE "CompanyInfo" DROP CONSTRAINT "CompanyInfo_pkey",
ADD COLUMN     "latitude" DECIMAL(10,7),
ADD COLUMN     "longitude" DECIMAL(10,7),
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "updatedAt" DROP DEFAULT,
ADD CONSTRAINT "CompanyInfo_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Property" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "summary" TEXT,
    "description" TEXT NOT NULL,
    "propertyType" "PropertyType" NOT NULL,
    "listingType" "ListingType" NOT NULL,
    "priceAmount" DECIMAL(14,2) NOT NULL,
    "currency" "CurrencyCode" NOT NULL DEFAULT 'NPR',
    "pricePeriod" "PricePeriod" NOT NULL DEFAULT 'TOTAL',
    "status" "PropertyStatus" NOT NULL DEFAULT 'DRAFT',
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "badgeLabel" TEXT,
    "badgeTone" "BadgeTone",
    "locationText" TEXT NOT NULL,
    "district" TEXT,
    "city" TEXT,
    "latitude" DECIMAL(10,7),
    "longitude" DECIMAL(10,7),
    "areaValue" DECIMAL(12,2),
    "areaUnit" "AreaUnit",
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HouseDetails" (
    "id" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "subType" "HouseSubType" NOT NULL,
    "usageType" "HouseUsageType" NOT NULL DEFAULT 'RESIDENTIAL',
    "bedrooms" INTEGER,
    "bathrooms" INTEGER,
    "kitchens" INTEGER,
    "floors" INTEGER,
    "parkingSpaces" INTEGER,
    "furnishingStatus" "FurnishingStatus",
    "buildYear" INTEGER,

    CONSTRAINT "HouseDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApartmentDetails" (
    "id" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "subType" "ApartmentSubType" NOT NULL,
    "bedrooms" INTEGER,
    "bathrooms" INTEGER,
    "balconies" INTEGER,
    "floorNumber" INTEGER,
    "totalFloors" INTEGER,
    "hasLift" BOOLEAN NOT NULL DEFAULT false,
    "hasParking" BOOLEAN NOT NULL DEFAULT false,
    "furnishingStatus" "FurnishingStatus",

    CONSTRAINT "ApartmentDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LandDetails" (
    "id" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "subType" "LandSubType" NOT NULL,
    "roadAccessFeet" DECIMAL(8,2),
    "frontageFeet" DECIMAL(8,2),
    "facingDirection" "FacingDirection",
    "plotShape" TEXT,
    "zoningType" TEXT,
    "isCornerPlot" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "LandDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PropertyImage" (
    "id" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "altText" TEXT,
    "caption" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PropertyImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Amenity" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Amenity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PropertyAmenity" (
    "propertyId" TEXT NOT NULL,
    "amenityId" TEXT NOT NULL,

    CONSTRAINT "PropertyAmenity_pkey" PRIMARY KEY ("propertyId","amenityId")
);

-- CreateTable
CREATE TABLE "Inquiry" (
    "id" TEXT NOT NULL,
    "propertyId" TEXT,
    "type" "InquiryType" NOT NULL DEFAULT 'GENERAL',
    "status" "InquiryStatus" NOT NULL DEFAULT 'NEW',
    "fullName" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Inquiry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Property_slug_key" ON "Property"("slug");

-- CreateIndex
CREATE INDEX "Property_propertyType_status_idx" ON "Property"("propertyType", "status");

-- CreateIndex
CREATE INDEX "Property_listingType_status_idx" ON "Property"("listingType", "status");

-- CreateIndex
CREATE INDEX "Property_city_district_idx" ON "Property"("city", "district");

-- CreateIndex
CREATE INDEX "Property_priceAmount_idx" ON "Property"("priceAmount");

-- CreateIndex
CREATE UNIQUE INDEX "HouseDetails_propertyId_key" ON "HouseDetails"("propertyId");

-- CreateIndex
CREATE UNIQUE INDEX "ApartmentDetails_propertyId_key" ON "ApartmentDetails"("propertyId");

-- CreateIndex
CREATE UNIQUE INDEX "LandDetails_propertyId_key" ON "LandDetails"("propertyId");

-- CreateIndex
CREATE INDEX "PropertyImage_propertyId_sortOrder_idx" ON "PropertyImage"("propertyId", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "Amenity_name_key" ON "Amenity"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Amenity_slug_key" ON "Amenity"("slug");

-- CreateIndex
CREATE INDEX "PropertyAmenity_amenityId_idx" ON "PropertyAmenity"("amenityId");

-- CreateIndex
CREATE INDEX "Inquiry_propertyId_status_idx" ON "Inquiry"("propertyId", "status");

-- AddForeignKey
ALTER TABLE "HouseDetails" ADD CONSTRAINT "HouseDetails_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApartmentDetails" ADD CONSTRAINT "ApartmentDetails_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LandDetails" ADD CONSTRAINT "LandDetails_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertyImage" ADD CONSTRAINT "PropertyImage_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertyAmenity" ADD CONSTRAINT "PropertyAmenity_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertyAmenity" ADD CONSTRAINT "PropertyAmenity_amenityId_fkey" FOREIGN KEY ("amenityId") REFERENCES "Amenity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inquiry" ADD CONSTRAINT "Inquiry_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE SET NULL ON UPDATE CASCADE;
