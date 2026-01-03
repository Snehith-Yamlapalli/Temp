/*
  Warnings:

  - A unique constraint covering the columns `[studentId,Company]` on the table `Application` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Application_studentId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Application_studentId_Company_key" ON "Application"("studentId", "Company");
