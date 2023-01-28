-- AlterTable
ALTER TABLE "habits_week_days" ADD COLUMN     "userEmail" TEXT;

-- AddForeignKey
ALTER TABLE "habits_week_days" ADD CONSTRAINT "habits_week_days_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "users"("email") ON DELETE SET NULL ON UPDATE CASCADE;
