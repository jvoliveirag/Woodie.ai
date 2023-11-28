/*
  Warnings:

  - You are about to drop the `Video` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Video";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "providedInfo" BOOLEAN NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Team_email_key" ON "Team"("email");
