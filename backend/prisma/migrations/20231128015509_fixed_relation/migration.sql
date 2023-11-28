-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TeamInfo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "info" TEXT NOT NULL,
    CONSTRAINT "TeamInfo_id_fkey" FOREIGN KEY ("id") REFERENCES "Team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TeamInfo" ("createdAt", "id", "info") SELECT "createdAt", "id", "info" FROM "TeamInfo";
DROP TABLE "TeamInfo";
ALTER TABLE "new_TeamInfo" RENAME TO "TeamInfo";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
