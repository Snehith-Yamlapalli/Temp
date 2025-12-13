/*
  Warnings:

  - You are about to drop the `Proforma` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Proforma";

-- CreateTable
CREATE TABLE "ProformaN" (
    "id" SERIAL NOT NULL,
    "companyName" TEXT NOT NULL,
    "CompanyCategory" TEXT NOT NULL,
    "jobRole" TEXT NOT NULL,
    "profile" TEXT NOT NULL,
    "Location" TEXT NOT NULL,
    "CTC" INTEGER NOT NULL,
    "CTCBase" INTEGER NOT NULL,
    "CTCStocks" INTEGER NOT NULL,
    "CTCSignOn" INTEGER NOT NULL,
    "CTCReLoc" INTEGER NOT NULL,
    "CTCOth" INTEGER NOT NULL,
    "Intership" TEXT NOT NULL,
    "Intershipstipend" INTEGER NOT NULL,
    "DriveMode" TEXT NOT NULL,
    "cgpaCutoff" DOUBLE PRECISION NOT NULL,
    "eligibleBatch" TEXT[],
    "eligibleBranches" VARCHAR(191)[],
    "DriveDates" TEXT[],
    "round1" TEXT NOT NULL,
    "round2" TEXT NOT NULL,
    "round3" TEXT NOT NULL,
    "round4" TEXT NOT NULL,
    "Deadline" TIMESTAMP(3) NOT NULL,
    "Spoc" TEXT,
    "SpocCont" TEXT NOT NULL,
    "jobDescriptionUrl" TEXT,
    "jobDescriptionKey" TEXT,
    "jobDescriptionName" TEXT,
    "jobDescriptionSize" INTEGER,
    "jobDescriptionMime" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProformaN_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ProformaN_createdAt_idx" ON "ProformaN"("createdAt");
