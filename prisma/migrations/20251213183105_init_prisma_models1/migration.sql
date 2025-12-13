/*
  Warnings:

  - Changed the type of `eligibleBatch` on the `ProformaN` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "ProformaN" DROP COLUMN "eligibleBatch",
ADD COLUMN     "eligibleBatch" INTEGER NOT NULL;
