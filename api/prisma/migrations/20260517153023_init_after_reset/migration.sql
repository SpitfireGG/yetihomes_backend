/*
  Warnings:

  - You are about to alter the column `altText` on the `PropertyImage` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to alter the column `caption` on the `PropertyImage` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - A unique constraint covering the columns `[seoMetadataId]` on the table `BlogArticle` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `TeamMember` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[seoMetadataId]` on the table `TeamMember` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `TeamMember` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StaticPageType" AS ENUM ('ABOUT', 'CONTACT', 'FAQ', 'PRIVACY', 'TERMS', 'DISCLAIMER', 'SITEMAP');

-- CreateEnum
CREATE TYPE "RedirectType" AS ENUM ('PERMANENT', 'TEMPORARY');

-- AlterTable
ALTER TABLE "Amenity" ADD COLUMN     "icon" TEXT;

-- AlterTable
ALTER TABLE "BlogArticle" ADD COLUMN     "categoryId" TEXT,
ADD COLUMN     "seoMetadataId" TEXT;

-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "agentId" TEXT,
ADD COLUMN     "locationPageId" TEXT;

-- AlterTable
ALTER TABLE "PropertyImage" ADD COLUMN     "fileSize" INTEGER,
ADD COLUMN     "height" INTEGER,
ADD COLUMN     "isIndexed" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "mimeType" TEXT,
ADD COLUMN     "width" INTEGER,
ALTER COLUMN "altText" SET DATA TYPE VARCHAR(200),
ALTER COLUMN "caption" SET DATA TYPE VARCHAR(200);

-- AlterTable
ALTER TABLE "TeamMember" ADD COLUMN     "seoMetadataId" TEXT,
ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "seo_metadata" (
    "id" TEXT NOT NULL,
    "metaTitle" VARCHAR(70),
    "metaDescription" VARCHAR(200),
    "canonicalUrl" TEXT,
    "slug" VARCHAR(80) NOT NULL,
    "ogTitle" VARCHAR(95),
    "ogDescription" VARCHAR(200),
    "ogImageUrl" TEXT,
    "ogImageWidth" INTEGER,
    "ogImageHeight" INTEGER,
    "ogImageAlt" TEXT,
    "twitterCard" TEXT DEFAULT 'summary_large_image',
    "twitterTitle" VARCHAR(70),
    "twitterDescription" VARCHAR(200),
    "twitterImageUrl" TEXT,
    "noindex" BOOLEAN NOT NULL DEFAULT false,
    "nofollow" BOOLEAN NOT NULL DEFAULT false,
    "noarchive" BOOLEAN NOT NULL DEFAULT false,
    "nosnippet" BOOLEAN NOT NULL DEFAULT false,
    "focusKeyword" VARCHAR(100),
    "secondaryKeywords" TEXT,
    "breadcrumbOverride" VARCHAR(200),
    "structuredDataOverrides" JSONB,
    "locale" TEXT DEFAULT 'en',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "propertyId" TEXT,

    CONSTRAINT "seo_metadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seo_audit_logs" (
    "id" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "changedBy" TEXT,
    "previousValues" JSONB,
    "newValues" JSONB,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "seo_audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "location_pages" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "latitude" DECIMAL(10,7),
    "longitude" DECIMAL(10,7),
    "district" TEXT,
    "province" TEXT,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "propertyCount" INTEGER NOT NULL DEFAULT 0,
    "averagePrice" DECIMAL(14,2),
    "seoMetadataId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "location_pages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property_type_pages" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "propertyType" "PropertyType" NOT NULL,
    "listingType" "ListingType",
    "minBedrooms" INTEGER,
    "maxBedrooms" INTEGER,
    "minPrice" DECIMAL(14,2),
    "maxPrice" DECIMAL(14,2),
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "propertyCount" INTEGER NOT NULL DEFAULT 0,
    "seoMetadataId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "property_type_pages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blog_categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "seoMetadataId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "blog_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "static_pages" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "pageType" "StaticPageType" NOT NULL,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "seoMetadataId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "static_pages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "agents" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "bio" TEXT,
    "photoUrl" TEXT,
    "licenseNumber" TEXT,
    "experienceYears" INTEGER,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "seoMetadataId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "agents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property_views" (
    "id" TEXT NOT NULL,
    "property_type" "PropertyType" NOT NULL,
    "property_id" TEXT NOT NULL,
    "visitor_id" TEXT NOT NULL,
    "fingerprint" TEXT NOT NULL,
    "ip_hash" TEXT NOT NULL,
    "user_agent" TEXT,
    "referrer" TEXT,
    "country" TEXT,
    "session_id" TEXT,
    "viewed_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "property_views_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property_view_stats" (
    "id" TEXT NOT NULL,
    "property_type" "PropertyType" NOT NULL,
    "property_id" TEXT NOT NULL,
    "total_views" INTEGER NOT NULL DEFAULT 0,
    "unique_views" INTEGER NOT NULL DEFAULT 0,
    "views_today" INTEGER NOT NULL DEFAULT 0,
    "views_this_week" INTEGER NOT NULL DEFAULT 0,
    "views_this_month" INTEGER NOT NULL DEFAULT 0,
    "last_viewed_at" TIMESTAMPTZ,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "property_view_stats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "redirect_rules" (
    "id" TEXT NOT NULL,
    "sourceUrl" TEXT NOT NULL,
    "targetUrl" TEXT NOT NULL,
    "redirectType" "RedirectType" NOT NULL DEFAULT 'PERMANENT',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "hitCount" INTEGER NOT NULL DEFAULT 0,
    "lastHitAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "redirect_rules_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "seo_metadata_slug_key" ON "seo_metadata"("slug");

-- CreateIndex
CREATE INDEX "seo_metadata_noindex_idx" ON "seo_metadata"("noindex");

-- CreateIndex
CREATE INDEX "seo_metadata_focusKeyword_idx" ON "seo_metadata"("focusKeyword");

-- CreateIndex
CREATE INDEX "seo_audit_logs_entityType_entityId_idx" ON "seo_audit_logs"("entityType", "entityId");

-- CreateIndex
CREATE INDEX "seo_audit_logs_createdAt_idx" ON "seo_audit_logs"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "location_pages_slug_key" ON "location_pages"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "location_pages_seoMetadataId_key" ON "location_pages"("seoMetadataId");

-- CreateIndex
CREATE INDEX "location_pages_isActive_idx" ON "location_pages"("isActive");

-- CreateIndex
CREATE INDEX "location_pages_district_idx" ON "location_pages"("district");

-- CreateIndex
CREATE UNIQUE INDEX "property_type_pages_slug_key" ON "property_type_pages"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "property_type_pages_seoMetadataId_key" ON "property_type_pages"("seoMetadataId");

-- CreateIndex
CREATE INDEX "property_type_pages_propertyType_listingType_idx" ON "property_type_pages"("propertyType", "listingType");

-- CreateIndex
CREATE INDEX "property_type_pages_isActive_idx" ON "property_type_pages"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "blog_categories_slug_key" ON "blog_categories"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "blog_categories_seoMetadataId_key" ON "blog_categories"("seoMetadataId");

-- CreateIndex
CREATE INDEX "blog_categories_isActive_idx" ON "blog_categories"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "static_pages_slug_key" ON "static_pages"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "static_pages_seoMetadataId_key" ON "static_pages"("seoMetadataId");

-- CreateIndex
CREATE INDEX "static_pages_pageType_idx" ON "static_pages"("pageType");

-- CreateIndex
CREATE INDEX "static_pages_isActive_idx" ON "static_pages"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "agents_slug_key" ON "agents"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "agents_seoMetadataId_key" ON "agents"("seoMetadataId");

-- CreateIndex
CREATE INDEX "agents_isActive_idx" ON "agents"("isActive");

-- CreateIndex
CREATE INDEX "property_views_property_type_property_id_idx" ON "property_views"("property_type", "property_id");

-- CreateIndex
CREATE INDEX "property_views_visitor_id_idx" ON "property_views"("visitor_id");

-- CreateIndex
CREATE INDEX "property_views_fingerprint_idx" ON "property_views"("fingerprint");

-- CreateIndex
CREATE INDEX "property_views_viewed_at_idx" ON "property_views"("viewed_at");

-- CreateIndex
CREATE INDEX "property_views_property_type_property_id_visitor_id_idx" ON "property_views"("property_type", "property_id", "visitor_id");

-- CreateIndex
CREATE INDEX "property_view_stats_property_type_idx" ON "property_view_stats"("property_type");

-- CreateIndex
CREATE UNIQUE INDEX "property_view_stats_property_type_property_id_key" ON "property_view_stats"("property_type", "property_id");

-- CreateIndex
CREATE UNIQUE INDEX "redirect_rules_sourceUrl_key" ON "redirect_rules"("sourceUrl");

-- CreateIndex
CREATE INDEX "redirect_rules_isActive_idx" ON "redirect_rules"("isActive");

-- CreateIndex
CREATE INDEX "redirect_rules_hitCount_idx" ON "redirect_rules"("hitCount");

-- CreateIndex
CREATE INDEX "ApartmentDetails_propertyId_idx" ON "ApartmentDetails"("propertyId");

-- CreateIndex
CREATE UNIQUE INDEX "BlogArticle_seoMetadataId_key" ON "BlogArticle"("seoMetadataId");

-- CreateIndex
CREATE INDEX "BlogArticle_categoryId_idx" ON "BlogArticle"("categoryId");

-- CreateIndex
CREATE INDEX "HouseDetails_propertyId_idx" ON "HouseDetails"("propertyId");

-- CreateIndex
CREATE INDEX "Inquiry_status_idx" ON "Inquiry"("status");

-- CreateIndex
CREATE INDEX "Inquiry_type_status_idx" ON "Inquiry"("type", "status");

-- CreateIndex
CREATE INDEX "LandDetails_propertyId_idx" ON "LandDetails"("propertyId");

-- CreateIndex
CREATE INDEX "Property_status_propertyType_listingType_priceAmount_idx" ON "Property"("status", "propertyType", "listingType", "priceAmount");

-- CreateIndex
CREATE INDEX "Property_status_isFeatured_idx" ON "Property"("status", "isFeatured");

-- CreateIndex
CREATE INDEX "Property_status_createdAt_idx" ON "Property"("status", "createdAt");

-- CreateIndex
CREATE INDEX "Property_isVerified_idx" ON "Property"("isVerified");

-- CreateIndex
CREATE INDEX "Property_slug_idx" ON "Property"("slug");

-- CreateIndex
CREATE INDEX "Property_locationPageId_idx" ON "Property"("locationPageId");

-- CreateIndex
CREATE INDEX "Property_agentId_idx" ON "Property"("agentId");

-- CreateIndex
CREATE INDEX "PropertyImage_propertyId_isPrimary_idx" ON "PropertyImage"("propertyId", "isPrimary");

-- CreateIndex
CREATE INDEX "PropertyImage_isIndexed_idx" ON "PropertyImage"("isIndexed");

-- CreateIndex
CREATE UNIQUE INDEX "TeamMember_slug_key" ON "TeamMember"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "TeamMember_seoMetadataId_key" ON "TeamMember"("seoMetadataId");

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_locationPageId_fkey" FOREIGN KEY ("locationPageId") REFERENCES "location_pages"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "agents"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamMember" ADD CONSTRAINT "TeamMember_seoMetadataId_fkey" FOREIGN KEY ("seoMetadataId") REFERENCES "seo_metadata"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogArticle" ADD CONSTRAINT "BlogArticle_seoMetadataId_fkey" FOREIGN KEY ("seoMetadataId") REFERENCES "seo_metadata"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogArticle" ADD CONSTRAINT "BlogArticle_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "blog_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seo_metadata" ADD CONSTRAINT "seo_metadata_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "location_pages" ADD CONSTRAINT "location_pages_seoMetadataId_fkey" FOREIGN KEY ("seoMetadataId") REFERENCES "seo_metadata"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property_type_pages" ADD CONSTRAINT "property_type_pages_seoMetadataId_fkey" FOREIGN KEY ("seoMetadataId") REFERENCES "seo_metadata"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog_categories" ADD CONSTRAINT "blog_categories_seoMetadataId_fkey" FOREIGN KEY ("seoMetadataId") REFERENCES "seo_metadata"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "static_pages" ADD CONSTRAINT "static_pages_seoMetadataId_fkey" FOREIGN KEY ("seoMetadataId") REFERENCES "seo_metadata"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agents" ADD CONSTRAINT "agents_seoMetadataId_fkey" FOREIGN KEY ("seoMetadataId") REFERENCES "seo_metadata"("id") ON DELETE SET NULL ON UPDATE CASCADE;
