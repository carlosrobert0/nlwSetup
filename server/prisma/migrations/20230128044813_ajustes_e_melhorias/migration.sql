/*
  Warnings:

  - You are about to drop the column `userEmail` on the `habits` table. All the data in the column will be lost.
  - Added the required column `user_email` to the `habits` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "habits" DROP CONSTRAINT "habits_userEmail_fkey";

-- AlterTable
ALTER TABLE "habits" DROP COLUMN "userEmail",
ADD COLUMN     "user_email" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "habits" ADD CONSTRAINT "habits_user_email_fkey" FOREIGN KEY ("user_email") REFERENCES "users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
