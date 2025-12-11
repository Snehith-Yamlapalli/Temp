-- CreateEnum
CREATE TYPE "DriveMode" AS ENUM ('ONLINE', 'ONSITE', 'HYBRID', 'VIDEO', 'OTHER');

-- CreateTable
CREATE TABLE "Proforma" (
    "id" SERIAL NOT NULL,
    "companyName" TEXT NOT NULL,
    "jobRole" TEXT NOT NULL,
    "driveMode" "DriveMode" NOT NULL,
    "cgpaCutoff" DOUBLE PRECISION,
    "tentativeLocation" TEXT,
    "ctcBreakup" JSONB,
    "eligibleBatch" TEXT[],
    "eligibleBranches" VARCHAR(191)[],
    "driveInfo" TEXT,
    "assessmentDates" TIMESTAMP(3)[],
    "deadlineForForm" TIMESTAMP(3),
    "spoc" TEXT,
    "jobDescriptionUrl" TEXT,
    "jobDescriptionKey" TEXT,
    "jobDescriptionName" TEXT,
    "jobDescriptionSize" INTEGER,
    "jobDescriptionMime" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Proforma_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Proforma_createdAt_idx" ON "Proforma"("createdAt");
