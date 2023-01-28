/*
  Warnings:

  - You are about to drop the column `userEmail` on the `habits_week_days` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "habits_week_days" DROP CONSTRAINT "habits_week_days_userEmail_fkey";

-- AlterTable
ALTER TABLE "habits_week_days" DROP COLUMN "userEmail";
