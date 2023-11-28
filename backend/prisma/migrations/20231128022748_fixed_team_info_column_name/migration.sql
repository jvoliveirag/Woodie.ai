/*
  Warnings:

  - You are about to drop the column `TeamInfo` on the `Team` table. All the data in the column will be lost.
  - Added the required column `teamInfo` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Team" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "providedInfo" BOOLEAN NOT NULL,
    "teamInfo" TEXT NOT NULL
);
INSERT INTO "new_Team" ("createdAt", "email", "id", "name", "providedInfo") SELECT "createdAt", "email", "id", "name", "providedInfo" FROM "Team";
DROP TABLE "Team";
ALTER TABLE "new_Team" RENAME TO "Team";
CREATE UNIQUE INDEX "Team_email_key" ON "Team"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
