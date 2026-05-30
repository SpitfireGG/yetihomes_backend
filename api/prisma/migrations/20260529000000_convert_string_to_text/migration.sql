-- AlterTable: Convert String columns to TEXT to prevent "value too long" errors

ALTER TABLE `CompanyInfo` MODIFY COLUMN `description` TEXT NOT NULL;
ALTER TABLE `CompanyInfo` MODIFY COLUMN `mission` TEXT NULL;
ALTER TABLE `CompanyInfo` MODIFY COLUMN `vision` TEXT NULL;

ALTER TABLE `Property` MODIFY COLUMN `summary` TEXT NULL;
ALTER TABLE `Property` MODIFY COLUMN `description` TEXT NOT NULL;
ALTER TABLE `Property` MODIFY COLUMN `titleStatus` TEXT NULL DEFAULT 'Clear Lal Purja';
ALTER TABLE `Property` MODIFY COLUMN `waterAvailability` TEXT NULL;
ALTER TABLE `Property` MODIFY COLUMN `electricity` TEXT NULL;

ALTER TABLE `Inquiry` MODIFY COLUMN `message` TEXT NOT NULL;

ALTER TABLE `TeamMember` MODIFY COLUMN `role` TEXT NOT NULL;
ALTER TABLE `TeamMember` MODIFY COLUMN `bio` TEXT NOT NULL;
ALTER TABLE `TeamMember` MODIFY COLUMN `education` TEXT NOT NULL;

ALTER TABLE `LandDetails` MODIFY COLUMN `plotShape` TEXT NULL;
ALTER TABLE `LandDetails` MODIFY COLUMN `zoningType` TEXT NULL;
