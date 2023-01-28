/*
  Warnings:

  - A unique constraint covering the columns `[userEmail]` on the table `habits` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "habits_userEmail_key" ON "habits"("userEmail");
