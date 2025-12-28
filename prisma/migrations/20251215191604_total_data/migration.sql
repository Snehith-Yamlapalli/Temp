/*
  Warnings:

  - The `Location` column on the `ProformaN` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('APPLIED', 'SHORTLISTED', 'REJECTED', 'OFFERED');

-- AlterTable
ALTER TABLE "ProformaN" DROP COLUMN "Location",
ADD COLUMN     "Location" TEXT[];

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "instituteEmail" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "degree" TEXT NOT NULL,
    "batch" INTEGER NOT NULL,
    "CGPA" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Application" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'APPLIED',
    "appliedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "branchAtApply" TEXT NOT NULL,
    "degreeAtApply" TEXT NOT NULL,
    "batchAtApply" INTEGER NOT NULL,
    "resumeUrlAtApply" TEXT,
    "remarks" TEXT,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "profileName" TEXT NOT NULL,
    "CGPA" DOUBLE PRECISION,
    "allowedBranches" TEXT[],
    "allowedDegrees" TEXT[],
    "allowedBatches" INTEGER[],
    "deadline" TIMESTAMP(3) NOT NULL,
    "jobDescription" TEXT NOT NULL,
    "location" TEXT,
    "ctc" TEXT,
    "numberOfPositions" INTEGER,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "website" TEXT,
    "HRName" TEXT NOT NULL,
    "Designation" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_instituteEmail_key" ON "Student"("instituteEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Application_studentId_profileId_key" ON "Application"("studentId", "profileId");

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
