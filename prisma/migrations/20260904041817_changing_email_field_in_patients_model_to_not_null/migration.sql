/*
  Warnings:

  - Made the column `email` on table `patients` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "patients" ALTER COLUMN "email" SET NOT NULL;
