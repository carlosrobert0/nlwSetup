-- CreateTable
CREATE TABLE "habits" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "user_email" TEXT,

    CONSTRAINT "habits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "habits_week_days" (
    "id" TEXT NOT NULL,
    "habit_id" TEXT NOT NULL,
    "week_day" INTEGER NOT NULL,

    CONSTRAINT "habits_week_days_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "days" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "days_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "day_habits" (
    "id" TEXT NOT NULL,
    "day_id" TEXT NOT NULL,
    "habit_id" TEXT NOT NULL,

    CONSTRAINT "day_habits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "uid" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "photoURL" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("uid")
);

-- CreateIndex
CREATE UNIQUE INDEX "habits_week_days_habit_id_week_day_key" ON "habits_week_days"("habit_id", "week_day");

-- CreateIndex
CREATE UNIQUE INDEX "days_date_key" ON "days"("date");

-- CreateIndex
CREATE UNIQUE INDEX "day_habits_day_id_habit_id_key" ON "day_habits"("day_id", "habit_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "habits" ADD CONSTRAINT "habits_user_email_fkey" FOREIGN KEY ("user_email") REFERENCES "users"("email") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "habits_week_days" ADD CONSTRAINT "habits_week_days_habit_id_fkey" FOREIGN KEY ("habit_id") REFERENCES "habits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "day_habits" ADD CONSTRAINT "day_habits_day_id_fkey" FOREIGN KEY ("day_id") REFERENCES "days"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "day_habits" ADD CONSTRAINT "day_habits_habit_id_fkey" FOREIGN KEY ("habit_id") REFERENCES "habits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
