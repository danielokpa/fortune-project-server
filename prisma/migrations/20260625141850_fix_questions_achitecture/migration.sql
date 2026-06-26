/*
  Warnings:

  - You are about to drop the `AssessmentOption` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AssessmentQuestion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RolePlayQuestion` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "QuestionCategory" AS ENUM ('PROFESSIONAL_ATTITUDE', 'EMOTIONAL_INTELLIGENCE', 'CUSTOMER_SERVICE', 'SAFETY', 'AVAILABILITY');

-- CreateEnum
CREATE TYPE "QuestionDifficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- CreateEnum
CREATE TYPE "RolePlayCategory" AS ENUM ('CUSTOMER_SERVICE', 'EMOTIONAL_INTELLIGENCE', 'PROFESSIONALISM', 'SAFETY', 'INTEGRITY', 'PROBLEM_SOLVING', 'CONFLICT_RESOLUTION');

-- DropForeignKey
ALTER TABLE "AssessmentAnswer" DROP CONSTRAINT "AssessmentAnswer_questionId_fkey";

-- DropForeignKey
ALTER TABLE "AssessmentAnswer" DROP CONSTRAINT "AssessmentAnswer_selectedOptionId_fkey";

-- DropForeignKey
ALTER TABLE "AssessmentOption" DROP CONSTRAINT "AssessmentOption_questionId_fkey";

-- DropForeignKey
ALTER TABLE "AssessmentQuestion" DROP CONSTRAINT "AssessmentQuestion_assessmentId_fkey";

-- DropForeignKey
ALTER TABLE "RolePlayAnswer" DROP CONSTRAINT "RolePlayAnswer_questionId_fkey";

-- DropForeignKey
ALTER TABLE "RolePlayQuestion" DROP CONSTRAINT "RolePlayQuestion_assessmentId_fkey";

-- DropTable
DROP TABLE "AssessmentOption";

-- DropTable
DROP TABLE "AssessmentQuestion";

-- DropTable
DROP TABLE "RolePlayQuestion";

-- CreateTable
CREATE TABLE "QuestionBank" (
    "id" TEXT NOT NULL,
    "category" "QuestionCategory" NOT NULL,
    "difficulty" "QuestionDifficulty" NOT NULL,
    "question" TEXT NOT NULL,
    "weight" INTEGER NOT NULL DEFAULT 5,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuestionBank_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionBankOption" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "optionText" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,

    CONSTRAINT "QuestionBankOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RolePlayBank" (
    "id" TEXT NOT NULL,
    "category" "RolePlayCategory",
    "prompt" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RolePlayBank_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssessmentAttemptQuestion" (
    "id" TEXT NOT NULL,
    "attemptId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "displayOrder" INTEGER NOT NULL,

    CONSTRAINT "AssessmentAttemptQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssessmentAttemptRolePlay" (
    "id" TEXT NOT NULL,
    "attemptId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "displayOrder" INTEGER NOT NULL,

    CONSTRAINT "AssessmentAttemptRolePlay_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AssessmentAttemptQuestion_attemptId_questionId_key" ON "AssessmentAttemptQuestion"("attemptId", "questionId");

-- CreateIndex
CREATE UNIQUE INDEX "AssessmentAttemptRolePlay_attemptId_questionId_key" ON "AssessmentAttemptRolePlay"("attemptId", "questionId");

-- AddForeignKey
ALTER TABLE "AssessmentAnswer" ADD CONSTRAINT "AssessmentAnswer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "QuestionBank"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssessmentAnswer" ADD CONSTRAINT "AssessmentAnswer_selectedOptionId_fkey" FOREIGN KEY ("selectedOptionId") REFERENCES "QuestionBankOption"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolePlayAnswer" ADD CONSTRAINT "RolePlayAnswer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "RolePlayBank"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionBankOption" ADD CONSTRAINT "QuestionBankOption_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "QuestionBank"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssessmentAttemptQuestion" ADD CONSTRAINT "AssessmentAttemptQuestion_attemptId_fkey" FOREIGN KEY ("attemptId") REFERENCES "AssessmentAttempt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssessmentAttemptQuestion" ADD CONSTRAINT "AssessmentAttemptQuestion_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "QuestionBank"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssessmentAttemptRolePlay" ADD CONSTRAINT "AssessmentAttemptRolePlay_attemptId_fkey" FOREIGN KEY ("attemptId") REFERENCES "AssessmentAttempt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssessmentAttemptRolePlay" ADD CONSTRAINT "AssessmentAttemptRolePlay_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "RolePlayBank"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
