/*
  Warnings:

  - The `eligibleBatch` column on the `ProformaN` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "ProformaN" DROP COLUMN "eligibleBatch",
ADD COLUMN     "eligibleBatch" TEXT[];

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "InternOffer" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "PlacementOffer" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "cgpaVerified" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Placed" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "Role" TEXT NOT NULL,
    "Company" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Placed_pkey" PRIMARY KEY ("id")
);
