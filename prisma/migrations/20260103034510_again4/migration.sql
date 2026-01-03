/*
  Warnings:

  - You are about to drop the column `jobDescriptionKey` on the `ProformaN` table. All the data in the column will be lost.
  - You are about to drop the column `jobDescriptionMime` on the `ProformaN` table. All the data in the column will be lost.
  - You are about to drop the column `jobDescriptionName` on the `ProformaN` table. All the data in the column will be lost.
  - You are about to drop the column `jobDescriptionSize` on the `ProformaN` table. All the data in the column will be lost.
  - You are about to drop the column `jobDescriptionUrl` on the `ProformaN` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProformaN" DROP COLUMN "jobDescriptionKey",
DROP COLUMN "jobDescriptionMime",
DROP COLUMN "jobDescriptionName",
DROP COLUMN "jobDescriptionSize",
DROP COLUMN "jobDescriptionUrl",
ADD COLUMN     "DescriptionKey" TEXT,
ADD COLUMN     "DescriptionMime" TEXT,
ADD COLUMN     "DescriptionName" TEXT,
ADD COLUMN     "DescriptionSize" INTEGER,
ADD COLUMN     "DescriptionUrl" TEXT;
