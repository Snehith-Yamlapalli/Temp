/*
  Warnings:

  - You are about to drop the `Placed` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Placed";

-- CreateTable
CREATE TABLE "FTEP" (
    "id" TEXT NOT NULL,
    "rollno" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "degree" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FTEP_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Intern" (
    "id" TEXT NOT NULL,
    "rollno" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "degree" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Intern_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FTEP_rollno_year_key" ON "FTEP"("rollno", "year");

-- CreateIndex
CREATE UNIQUE INDEX "Intern_rollno_year_key" ON "Intern"("rollno", "year");
