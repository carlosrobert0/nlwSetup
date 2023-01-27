/*
  Warnings:

  - You are about to drop the column `user_email` on the `habits` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "habits" DROP CONSTRAINT "habits_user_email_fkey";

-- AlterTable
ALTER TABLE "habits" DROP COLUMN "user_email",
ADD COLUMN     "userEmail" TEXT;

-- AddForeignKey
ALTER TABLE "habits" ADD CONSTRAINT "habits_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "users"("email") ON DELETE SET NULL ON UPDATE CASCADE;
