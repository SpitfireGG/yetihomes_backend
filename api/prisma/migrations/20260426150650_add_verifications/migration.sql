-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "electricity" TEXT,
ADD COLUMN     "isOwnerApproved" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "titleStatus" TEXT DEFAULT 'Clear Lal Purja',
ADD COLUMN     "waterAvailability" TEXT;
