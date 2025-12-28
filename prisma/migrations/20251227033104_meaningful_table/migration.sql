/*
  Warnings:

  - You are about to drop the column `date` on the `Placed` table. All the data in the column will be lost.
  - You are about to drop the column `PlacementOffer` on the `Student` table. All the data in the column will be lost.
  - Added the required column `Branch` to the `Placed` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Degree` to the `Placed` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Placed" DROP COLUMN "date",
ADD COLUMN     "Branch" TEXT NOT NULL,
ADD COLUMN     "Degree" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "PlacementOffer",
ADD COLUMN     "FTEApply" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "FTEOffer" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "InternApply" BOOLEAN NOT NULL DEFAULT false;
