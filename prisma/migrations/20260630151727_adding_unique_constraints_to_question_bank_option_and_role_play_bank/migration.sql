/*
  Warnings:

  - A unique constraint covering the columns `[questionId,optionText]` on the table `QuestionBankOption` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[category,prompt]` on the table `RolePlayBank` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "QuestionBankOption_questionId_optionText_key" ON "QuestionBankOption"("questionId", "optionText");

-- CreateIndex
CREATE UNIQUE INDEX "RolePlayBank_category_prompt_key" ON "RolePlayBank"("category", "prompt");
