/*
  Warnings:

  - Added the required column `jobRole` to the `Assessment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobRole` to the `QuestionBank` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobRole` to the `RolePlayBank` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "JobRole" AS ENUM ('DRIVER', 'CUSTOMER_SUPPORT', 'ADMIN_EXECUTIVE', 'INVENTORY', 'OPERATIONS', 'GENERAL');

-- AlterTable
ALTER TABLE "Assessment" ADD COLUMN     "jobRole" "JobRole" NOT NULL;

-- AlterTable
ALTER TABLE "QuestionBank" ADD COLUMN     "jobRole" "JobRole" NOT NULL;

-- AlterTable
ALTER TABLE "RolePlayBank" ADD COLUMN     "jobRole" "JobRole" NOT NULL;
