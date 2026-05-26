-- CreateEnum
CREATE TYPE "FaqCategory" AS ENUM ('GENERAL', 'LEGAL_AND_MALPOT', 'TAXES_AND_FEES', 'HOME_LOANS', 'NRN_AND_EXPATS', 'RENTING_AND_LEASES', 'MEASUREMENTS');

-- CreateTable
CREATE TABLE "faqs" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "category" "FaqCategory" NOT NULL DEFAULT 'GENERAL',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "faqs_pkey" PRIMARY KEY ("id")
);
