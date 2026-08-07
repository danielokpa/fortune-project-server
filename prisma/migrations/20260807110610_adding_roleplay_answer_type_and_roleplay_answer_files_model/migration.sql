-- CreateEnum
CREATE TYPE "RolePlayAnswerType" AS ENUM ('TEXT', 'FILE_UPLOAD', 'TEXT_AND_FILE');

-- AlterTable
ALTER TABLE "RolePlayBank" ADD COLUMN     "answerType" "RolePlayAnswerType" NOT NULL DEFAULT 'TEXT',
ADD COLUMN     "maxFiles" INTEGER,
ADD COLUMN     "minFiles" INTEGER;

-- CreateTable
CREATE TABLE "RolePlayAnswerFile" (
    "id" TEXT NOT NULL,
    "rolePlayAnswerId" TEXT NOT NULL,
    "objectKey" TEXT NOT NULL,

    CONSTRAINT "RolePlayAnswerFile_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RolePlayAnswerFile" ADD CONSTRAINT "RolePlayAnswerFile_rolePlayAnswerId_fkey" FOREIGN KEY ("rolePlayAnswerId") REFERENCES "RolePlayAnswer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
