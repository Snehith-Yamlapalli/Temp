/*
  Warnings:

  - You are about to drop the column `Branch` on the `Placed` table. All the data in the column will be lost.
  - You are about to drop the column `Company` on the `Placed` table. All the data in the column will be lost.
  - You are about to drop the column `Degree` on the `Placed` table. All the data in the column will be lost.
  - You are about to drop the column `Role` on the `Placed` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[rollno,year]` on the table `Placed` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `branch` to the `Placed` table without a default value. This is not possible if the table is not empty.
  - Added the required column `company` to the `Placed` table without a default value. This is not possible if the table is not empty.
  - Added the required column `degree` to the `Placed` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `Placed` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rollno` to the `Placed` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Placed` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Placed" DROP COLUMN "Branch",
DROP COLUMN "Company",
DROP COLUMN "Degree",
DROP COLUMN "Role",
ADD COLUMN     "branch" TEXT NOT NULL,
ADD COLUMN     "company" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "degree" TEXT NOT NULL,
ADD COLUMN     "role" TEXT NOT NULL,
ADD COLUMN     "rollno" TEXT NOT NULL,
ADD COLUMN     "year" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Placed_rollno_year_key" ON "Placed"("rollno", "year");
