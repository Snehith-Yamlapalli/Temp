/*
  Warnings:

  - Added the required column `Name` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cgpa` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profile` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `Application` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "Name" TEXT NOT NULL,
ADD COLUMN     "cgpa" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "profile" TEXT NOT NULL,
ADD COLUMN     "role" TEXT NOT NULL;
