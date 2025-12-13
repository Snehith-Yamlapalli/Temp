/*
  Warnings:

  - You are about to drop the column `Intership` on the `ProformaN` table. All the data in the column will be lost.
  - You are about to drop the column `Intershipstipend` on the `ProformaN` table. All the data in the column will be lost.
  - Added the required column `Internship` to the `ProformaN` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Internshipstipend` to the `ProformaN` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProformaN" DROP COLUMN "Intership",
DROP COLUMN "Intershipstipend",
ADD COLUMN     "Internship" TEXT NOT NULL,
ADD COLUMN     "Internshipstipend" INTEGER NOT NULL;
