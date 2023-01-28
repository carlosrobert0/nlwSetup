/*
  Warnings:

  - Made the column `userEmail` on table `habits` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "habits" DROP CONSTRAINT "habits_userEmail_fkey";

-- AlterTable
ALTER TABLE "habits" ALTER COLUMN "userEmail" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "habits" ADD CONSTRAINT "habits_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
