-- CreateTable
CREATE TABLE `CompanyInfo` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `mission` VARCHAR(191) NULL,
    `vision` VARCHAR(191) NULL,
    `contactEmail` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `latitude` DECIMAL(10, 7) NULL,
    `longitude` DECIMAL(10, 7) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Property` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `summary` VARCHAR(191) NULL,
    `description` VARCHAR(191) NOT NULL,
    `propertyType` ENUM('HOUSE', 'APARTMENT', 'LAND') NOT NULL,
    `listingType` ENUM('SALE', 'RENT') NOT NULL,
    `priceAmount` DECIMAL(14, 2) NOT NULL,
    `currency` ENUM('NPR', 'USD') NOT NULL DEFAULT 'NPR',
    `pricePeriod` ENUM('TOTAL', 'MONTHLY', 'YEARLY') NOT NULL DEFAULT 'TOTAL',
    `status` ENUM('DRAFT', 'PUBLISHED', 'SOLD', 'RENTED', 'ARCHIVED') NOT NULL DEFAULT 'DRAFT',
    `isFeatured` BOOLEAN NOT NULL DEFAULT false,
    `badgeLabel` VARCHAR(191) NULL,
    `badgeTone` ENUM('NEUTRAL', 'WARM', 'COOL') NULL,
    `locationText` VARCHAR(191) NOT NULL,
    `district` VARCHAR(191) NULL,
    `city` VARCHAR(191) NULL,
    `latitude` DECIMAL(10, 7) NULL,
    `longitude` DECIMAL(10, 7) NULL,
    `areaValue` DECIMAL(12, 2) NULL,
    `areaUnit` ENUM('SQ_FT', 'SQ_M', 'AANA', 'ROPANI') NULL,
    `titleStatus` VARCHAR(191) NULL DEFAULT 'Clear Lal Purja',
    `waterAvailability` VARCHAR(191) NULL,
    `electricity` VARCHAR(191) NULL,
    `isVerified` BOOLEAN NOT NULL DEFAULT false,
    `isOwnerApproved` BOOLEAN NOT NULL DEFAULT false,
    `publishedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `videoUrl` VARCHAR(191) NULL,
    `mapIframe` TEXT NULL,
    `locationPageId` VARCHAR(191) NULL,
    `agentId` VARCHAR(191) NULL,

    UNIQUE INDEX `Property_slug_key`(`slug`),
    INDEX `Property_propertyType_status_idx`(`propertyType`, `status`),
    INDEX `Property_listingType_status_idx`(`listingType`, `status`),
    INDEX `Property_city_district_idx`(`city`, `district`),
    INDEX `Property_priceAmount_idx`(`priceAmount`),
    INDEX `Property_status_propertyType_listingType_priceAmount_idx`(`status`, `propertyType`, `listingType`, `priceAmount`),
    INDEX `Property_status_isFeatured_idx`(`status`, `isFeatured`),
    INDEX `Property_status_createdAt_idx`(`status`, `createdAt`),
    INDEX `Property_isVerified_idx`(`isVerified`),
    INDEX `Property_slug_idx`(`slug`),
    INDEX `Property_locationPageId_idx`(`locationPageId`),
    INDEX `Property_agentId_idx`(`agentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HouseDetails` (
    `id` VARCHAR(191) NOT NULL,
    `propertyId` VARCHAR(191) NOT NULL,
    `subType` ENUM('BUNGALOW', 'VILLA', 'DUPLEX', 'TOWNHOUSE') NOT NULL,
    `usageType` ENUM('RESIDENTIAL', 'COMMERCIAL', 'SEMI_COMMERCIAL') NOT NULL DEFAULT 'RESIDENTIAL',
    `bedrooms` INTEGER NULL,
    `bathrooms` INTEGER NULL,
    `kitchens` INTEGER NULL,
    `floors` INTEGER NULL,
    `parkingSpaces` INTEGER NULL,
    `furnishingStatus` ENUM('UNFURNISHED', 'SEMI_FURNISHED', 'FULLY_FURNISHED') NULL,
    `buildYear` INTEGER NULL,

    UNIQUE INDEX `HouseDetails_propertyId_key`(`propertyId`),
    INDEX `HouseDetails_propertyId_idx`(`propertyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ApartmentDetails` (
    `id` VARCHAR(191) NOT NULL,
    `propertyId` VARCHAR(191) NOT NULL,
    `subType` ENUM('STUDIO', 'APARTMENT', 'PENTHOUSE', 'CONDO') NOT NULL,
    `bedrooms` INTEGER NULL,
    `bathrooms` INTEGER NULL,
    `balconies` INTEGER NULL,
    `floorNumber` INTEGER NULL,
    `totalFloors` INTEGER NULL,
    `hasLift` BOOLEAN NOT NULL DEFAULT false,
    `hasParking` BOOLEAN NOT NULL DEFAULT false,
    `furnishingStatus` ENUM('UNFURNISHED', 'SEMI_FURNISHED', 'FULLY_FURNISHED') NULL,

    UNIQUE INDEX `ApartmentDetails_propertyId_key`(`propertyId`),
    INDEX `ApartmentDetails_propertyId_idx`(`propertyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LandDetails` (
    `id` VARCHAR(191) NOT NULL,
    `propertyId` VARCHAR(191) NOT NULL,
    `subType` ENUM('RESIDENTIAL_PLOT', 'COMMERCIAL_LAND', 'AGRICULTURAL_LAND') NOT NULL,
    `roadAccessFeet` DECIMAL(8, 2) NULL,
    `frontageFeet` DECIMAL(8, 2) NULL,
    `facingDirection` ENUM('EAST', 'WEST', 'NORTH', 'SOUTH', 'NORTH_EAST', 'NORTH_WEST', 'SOUTH_EAST', 'SOUTH_WEST') NULL,
    `plotShape` VARCHAR(191) NULL,
    `zoningType` VARCHAR(191) NULL,
    `isCornerPlot` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `LandDetails_propertyId_key`(`propertyId`),
    INDEX `LandDetails_propertyId_idx`(`propertyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PropertyImage` (
    `id` VARCHAR(191) NOT NULL,
    `propertyId` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `altText` VARCHAR(200) NULL,
    `caption` VARCHAR(200) NULL,
    `width` INTEGER NULL,
    `height` INTEGER NULL,
    `mimeType` VARCHAR(191) NULL,
    `fileSize` INTEGER NULL,
    `isIndexed` BOOLEAN NOT NULL DEFAULT true,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `isPrimary` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `PropertyImage_propertyId_sortOrder_idx`(`propertyId`, `sortOrder`),
    INDEX `PropertyImage_propertyId_isPrimary_idx`(`propertyId`, `isPrimary`),
    INDEX `PropertyImage_isIndexed_idx`(`isIndexed`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Amenity` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `icon` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Amenity_name_key`(`name`),
    UNIQUE INDEX `Amenity_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PropertyAmenity` (
    `propertyId` VARCHAR(191) NOT NULL,
    `amenityId` VARCHAR(191) NOT NULL,

    INDEX `PropertyAmenity_amenityId_idx`(`amenityId`),
    PRIMARY KEY (`propertyId`, `amenityId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Inquiry` (
    `id` VARCHAR(191) NOT NULL,
    `propertyId` VARCHAR(191) NULL,
    `type` ENUM('GENERAL', 'PROPERTY', 'SCHEDULE_VISIT', 'SELLER') NOT NULL DEFAULT 'GENERAL',
    `status` ENUM('NEW', 'CONTACTED', 'CLOSED', 'SPAM') NOT NULL DEFAULT 'NEW',
    `fullName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `message` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Inquiry_propertyId_status_idx`(`propertyId`, `status`),
    INDEX `Inquiry_status_idx`(`status`),
    INDEX `Inquiry_type_status_idx`(`type`, `status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `legal_documents` (
    `id` VARCHAR(191) NOT NULL,
    `type` ENUM('PRIVACY_POLICY', 'COOKIE_POLICY', 'TERMS_AND_CONDITIONS') NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `content` TEXT NULL,
    `version` VARCHAR(191) NULL,
    `effectiveDate` DATETIME(3) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `legal_documents_type_key`(`type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `newsletters` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `subscribed` BOOLEAN NOT NULL DEFAULT true,
    `name` VARCHAR(191) NULL,
    `country` VARCHAR(191) NULL,
    `source` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `newsletters_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `faqs` (
    `id` VARCHAR(191) NOT NULL,
    `question` VARCHAR(191) NOT NULL,
    `answer` TEXT NOT NULL,
    `category` ENUM('GENERAL', 'LEGAL_AND_MALPOT', 'TAXES_AND_FEES', 'HOME_LOANS', 'NRN_AND_EXPATS', 'RENTING_AND_LEASES', 'MEASUREMENTS') NOT NULL DEFAULT 'GENERAL',
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `isPublished` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Affiliation` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `logoUrl` VARCHAR(191) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `displayOrder` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TeamMember` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `bio` VARCHAR(191) NOT NULL,
    `expertise` JSON NOT NULL,
    `education` VARCHAR(191) NOT NULL,
    `thumbnail` VARCHAR(191) NULL,
    `image` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `seoMetadataId` VARCHAR(191) NULL,

    UNIQUE INDEX `TeamMember_slug_key`(`slug`),
    UNIQUE INDEX `TeamMember_email_key`(`email`),
    UNIQUE INDEX `TeamMember_seoMetadataId_key`(`seoMetadataId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Review` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,
    `text` TEXT NOT NULL,
    `rating` INTEGER NOT NULL DEFAULT 5,
    `isFeatured` BOOLEAN NOT NULL DEFAULT false,
    `image` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BlogArticle` (
    `id` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `excerpt` TEXT NOT NULL,
    `content` TEXT NOT NULL,
    `coverImage` VARCHAR(191) NULL,
    `author` VARCHAR(191) NOT NULL,
    `authorRole` VARCHAR(191) NOT NULL,
    `authorImage` VARCHAR(191) NULL,
    `readTime` VARCHAR(191) NOT NULL,
    `isFeatured` BOOLEAN NOT NULL DEFAULT false,
    `publishDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `seoMetadataId` VARCHAR(191) NULL,
    `categoryId` VARCHAR(191) NULL,

    UNIQUE INDEX `BlogArticle_slug_key`(`slug`),
    UNIQUE INDEX `BlogArticle_seoMetadataId_key`(`seoMetadataId`),
    INDEX `BlogArticle_categoryId_idx`(`categoryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SupportTicket` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `subject` VARCHAR(191) NOT NULL,
    `message` TEXT NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'OPEN',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `seo_metadata` (
    `id` VARCHAR(191) NOT NULL,
    `metaTitle` VARCHAR(70) NULL,
    `metaDescription` VARCHAR(200) NULL,
    `canonicalUrl` TEXT NULL,
    `slug` VARCHAR(80) NOT NULL,
    `ogTitle` VARCHAR(95) NULL,
    `ogDescription` VARCHAR(200) NULL,
    `ogImageUrl` TEXT NULL,
    `ogImageWidth` INTEGER NULL,
    `ogImageHeight` INTEGER NULL,
    `ogImageAlt` VARCHAR(191) NULL,
    `twitterCard` VARCHAR(191) NULL DEFAULT 'summary_large_image',
    `twitterTitle` VARCHAR(70) NULL,
    `twitterDescription` VARCHAR(200) NULL,
    `twitterImageUrl` TEXT NULL,
    `noindex` BOOLEAN NOT NULL DEFAULT false,
    `nofollow` BOOLEAN NOT NULL DEFAULT false,
    `noarchive` BOOLEAN NOT NULL DEFAULT false,
    `nosnippet` BOOLEAN NOT NULL DEFAULT false,
    `focusKeyword` VARCHAR(100) NULL,
    `secondaryKeywords` TEXT NULL,
    `breadcrumbOverride` VARCHAR(200) NULL,
    `structuredDataOverrides` JSON NULL,
    `locale` VARCHAR(191) NULL DEFAULT 'en',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `createdBy` VARCHAR(191) NULL,
    `updatedBy` VARCHAR(191) NULL,
    `propertyId` VARCHAR(191) NULL,

    UNIQUE INDEX `seo_metadata_slug_key`(`slug`),
    INDEX `seo_metadata_noindex_idx`(`noindex`),
    INDEX `seo_metadata_focusKeyword_idx`(`focusKeyword`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `seo_audit_logs` (
    `id` VARCHAR(191) NOT NULL,
    `entityType` VARCHAR(191) NOT NULL,
    `entityId` VARCHAR(191) NOT NULL,
    `action` VARCHAR(191) NOT NULL,
    `changedBy` VARCHAR(191) NULL,
    `previousValues` JSON NULL,
    `newValues` JSON NULL,
    `reason` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `seo_audit_logs_entityType_entityId_idx`(`entityType`, `entityId`),
    INDEX `seo_audit_logs_createdAt_idx`(`createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `location_pages` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `latitude` DECIMAL(10, 7) NULL,
    `longitude` DECIMAL(10, 7) NULL,
    `district` VARCHAR(191) NULL,
    `province` VARCHAR(191) NULL,
    `displayOrder` INTEGER NOT NULL DEFAULT 0,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `propertyCount` INTEGER NOT NULL DEFAULT 0,
    `averagePrice` DECIMAL(14, 2) NULL,
    `seoMetadataId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `location_pages_slug_key`(`slug`),
    UNIQUE INDEX `location_pages_seoMetadataId_key`(`seoMetadataId`),
    INDEX `location_pages_isActive_idx`(`isActive`),
    INDEX `location_pages_district_idx`(`district`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `property_type_pages` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `propertyType` ENUM('HOUSE', 'APARTMENT', 'LAND') NOT NULL,
    `listingType` ENUM('SALE', 'RENT') NULL,
    `minBedrooms` INTEGER NULL,
    `maxBedrooms` INTEGER NULL,
    `minPrice` DECIMAL(14, 2) NULL,
    `maxPrice` DECIMAL(14, 2) NULL,
    `displayOrder` INTEGER NOT NULL DEFAULT 0,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `propertyCount` INTEGER NOT NULL DEFAULT 0,
    `seoMetadataId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `property_type_pages_slug_key`(`slug`),
    UNIQUE INDEX `property_type_pages_seoMetadataId_key`(`seoMetadataId`),
    INDEX `property_type_pages_propertyType_listingType_idx`(`propertyType`, `listingType`),
    INDEX `property_type_pages_isActive_idx`(`isActive`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `blog_categories` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `displayOrder` INTEGER NOT NULL DEFAULT 0,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `seoMetadataId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `blog_categories_slug_key`(`slug`),
    UNIQUE INDEX `blog_categories_seoMetadataId_key`(`seoMetadataId`),
    INDEX `blog_categories_isActive_idx`(`isActive`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `static_pages` (
    `id` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `content` TEXT NULL,
    `pageType` ENUM('ABOUT', 'CONTACT', 'FAQ', 'PRIVACY', 'TERMS', 'DISCLAIMER', 'SITEMAP') NOT NULL,
    `displayOrder` INTEGER NOT NULL DEFAULT 0,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `seoMetadataId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `static_pages_slug_key`(`slug`),
    UNIQUE INDEX `static_pages_seoMetadataId_key`(`seoMetadataId`),
    INDEX `static_pages_pageType_idx`(`pageType`),
    INDEX `static_pages_isActive_idx`(`isActive`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `agents` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `bio` TEXT NULL,
    `photoUrl` VARCHAR(191) NULL,
    `licenseNumber` VARCHAR(191) NULL,
    `experienceYears` INTEGER NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `displayOrder` INTEGER NOT NULL DEFAULT 0,
    `seoMetadataId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `agents_slug_key`(`slug`),
    UNIQUE INDEX `agents_seoMetadataId_key`(`seoMetadataId`),
    INDEX `agents_isActive_idx`(`isActive`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `property_views` (
    `id` VARCHAR(191) NOT NULL,
    `property_type` ENUM('HOUSE', 'APARTMENT', 'LAND') NOT NULL,
    `property_id` VARCHAR(191) NOT NULL,
    `visitor_id` VARCHAR(191) NOT NULL,
    `fingerprint` VARCHAR(191) NOT NULL,
    `ip_hash` VARCHAR(191) NOT NULL,
    `user_agent` TEXT NULL,
    `referrer` TEXT NULL,
    `country` VARCHAR(191) NULL,
    `session_id` VARCHAR(191) NULL,
    `viewed_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `property_views_property_type_property_id_idx`(`property_type`, `property_id`),
    INDEX `property_views_visitor_id_idx`(`visitor_id`),
    INDEX `property_views_fingerprint_idx`(`fingerprint`),
    INDEX `property_views_viewed_at_idx`(`viewed_at`),
    INDEX `property_views_property_type_property_id_visitor_id_idx`(`property_type`, `property_id`, `visitor_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `property_view_stats` (
    `id` VARCHAR(191) NOT NULL,
    `property_type` ENUM('HOUSE', 'APARTMENT', 'LAND') NOT NULL,
    `property_id` VARCHAR(191) NOT NULL,
    `total_views` INTEGER NOT NULL DEFAULT 0,
    `unique_views` INTEGER NOT NULL DEFAULT 0,
    `views_today` INTEGER NOT NULL DEFAULT 0,
    `views_this_week` INTEGER NOT NULL DEFAULT 0,
    `views_this_month` INTEGER NOT NULL DEFAULT 0,
    `last_viewed_at` DATETIME(3) NULL,
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `property_view_stats_property_type_idx`(`property_type`),
    UNIQUE INDEX `property_view_stats_property_type_property_id_key`(`property_type`, `property_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `redirect_rules` (
    `id` VARCHAR(191) NOT NULL,
    `sourceUrl` VARCHAR(191) NOT NULL,
    `targetUrl` VARCHAR(191) NOT NULL,
    `redirectType` ENUM('PERMANENT', 'TEMPORARY') NOT NULL DEFAULT 'PERMANENT',
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `hitCount` INTEGER NOT NULL DEFAULT 0,
    `lastHitAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `redirect_rules_sourceUrl_key`(`sourceUrl`),
    INDEX `redirect_rules_isActive_idx`(`isActive`),
    INDEX `redirect_rules_hitCount_idx`(`hitCount`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admins` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `fullName` VARCHAR(191) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `lastLogin` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `admins_email_key`(`email`),
    INDEX `admins_email_idx`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `refresh_tokens` (
    `id` VARCHAR(191) NOT NULL,
    `tokenHash` VARCHAR(191) NOT NULL,
    `adminId` VARCHAR(191) NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,
    `revokedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `refresh_tokens_tokenHash_key`(`tokenHash`),
    INDEX `refresh_tokens_adminId_idx`(`adminId`),
    INDEX `refresh_tokens_tokenHash_idx`(`tokenHash`),
    INDEX `refresh_tokens_expiresAt_idx`(`expiresAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Property` ADD CONSTRAINT `Property_locationPageId_fkey` FOREIGN KEY (`locationPageId`) REFERENCES `location_pages`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Property` ADD CONSTRAINT `Property_agentId_fkey` FOREIGN KEY (`agentId`) REFERENCES `agents`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HouseDetails` ADD CONSTRAINT `HouseDetails_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `Property`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ApartmentDetails` ADD CONSTRAINT `ApartmentDetails_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `Property`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LandDetails` ADD CONSTRAINT `LandDetails_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `Property`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PropertyImage` ADD CONSTRAINT `PropertyImage_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `Property`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PropertyAmenity` ADD CONSTRAINT `PropertyAmenity_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `Property`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PropertyAmenity` ADD CONSTRAINT `PropertyAmenity_amenityId_fkey` FOREIGN KEY (`amenityId`) REFERENCES `Amenity`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inquiry` ADD CONSTRAINT `Inquiry_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `Property`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeamMember` ADD CONSTRAINT `TeamMember_seoMetadataId_fkey` FOREIGN KEY (`seoMetadataId`) REFERENCES `seo_metadata`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BlogArticle` ADD CONSTRAINT `BlogArticle_seoMetadataId_fkey` FOREIGN KEY (`seoMetadataId`) REFERENCES `seo_metadata`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BlogArticle` ADD CONSTRAINT `BlogArticle_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `blog_categories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `seo_metadata` ADD CONSTRAINT `seo_metadata_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `Property`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `location_pages` ADD CONSTRAINT `location_pages_seoMetadataId_fkey` FOREIGN KEY (`seoMetadataId`) REFERENCES `seo_metadata`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `property_type_pages` ADD CONSTRAINT `property_type_pages_seoMetadataId_fkey` FOREIGN KEY (`seoMetadataId`) REFERENCES `seo_metadata`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `blog_categories` ADD CONSTRAINT `blog_categories_seoMetadataId_fkey` FOREIGN KEY (`seoMetadataId`) REFERENCES `seo_metadata`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `static_pages` ADD CONSTRAINT `static_pages_seoMetadataId_fkey` FOREIGN KEY (`seoMetadataId`) REFERENCES `seo_metadata`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `agents` ADD CONSTRAINT `agents_seoMetadataId_fkey` FOREIGN KEY (`seoMetadataId`) REFERENCES `seo_metadata`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `refresh_tokens` ADD CONSTRAINT `refresh_tokens_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `admins`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

