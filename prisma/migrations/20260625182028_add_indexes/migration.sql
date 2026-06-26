/*
  Warnings:

  - A unique constraint covering the columns `[question]` on the table `QuestionBank` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "AssessmentAttempt" DROP CONSTRAINT "AssessmentAttempt_applicationId_fkey";

-- AlterTable
ALTER TABLE "AssessmentAttempt" ALTER COLUMN "applicationId" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "AssessmentAttemptQuestion_attemptId_idx" ON "AssessmentAttemptQuestion"("attemptId");

-- CreateIndex
CREATE INDEX "AssessmentAttemptQuestion_questionId_idx" ON "AssessmentAttemptQuestion"("questionId");

-- CreateIndex
CREATE INDEX "AssessmentAttemptRolePlay_attemptId_idx" ON "AssessmentAttemptRolePlay"("attemptId");

-- CreateIndex
CREATE INDEX "AssessmentAttemptRolePlay_questionId_idx" ON "AssessmentAttemptRolePlay"("questionId");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionBank_question_key" ON "QuestionBank"("question");

-- AddForeignKey
ALTER TABLE "AssessmentAttempt" ADD CONSTRAINT "AssessmentAttempt_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;
