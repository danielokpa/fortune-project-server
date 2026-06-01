/*
  Warnings:

  - A unique constraint covering the columns `[countryId,name]` on the table `states` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "states_countryId_name_key" ON "states"("countryId", "name");
