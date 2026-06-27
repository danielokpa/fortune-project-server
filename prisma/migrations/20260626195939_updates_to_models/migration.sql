/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `Candidate` will be added. If there are existing duplicate values, this will fail.
  - Made the column `residentialAddress` on table `Candidate` required. This step will fail if there are existing NULL values in that column.
  - Made the column `gender` on table `Candidate` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dateOfBirth` on table `Candidate` required. This step will fail if there are existing NULL values in that column.
  - Made the column `stateOfOrigin` on table `Candidate` required. This step will fail if there are existing NULL values in that column.
  - Made the column `currentLocation` on table `Candidate` required. This step will fail if there are existing NULL values in that column.
  - Made the column `highestQualification` on table `Candidate` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Candidate" ALTER COLUMN "residentialAddress" SET NOT NULL,
ALTER COLUMN "gender" SET NOT NULL,
ALTER COLUMN "dateOfBirth" SET NOT NULL,
ALTER COLUMN "stateOfOrigin" SET NOT NULL,
ALTER COLUMN "currentLocation" SET NOT NULL,
ALTER COLUMN "highestQualification" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Candidate_phone_key" ON "Candidate"("phone");
