-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_habits" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL,
    "userEmail" TEXT,
    CONSTRAINT "habits_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "users" ("email") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_habits" ("created_at", "id", "title", "userEmail") SELECT "created_at", "id", "title", "userEmail" FROM "habits";
DROP TABLE "habits";
ALTER TABLE "new_habits" RENAME TO "habits";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
