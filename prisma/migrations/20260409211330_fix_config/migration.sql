/*
  Warnings:

  - You are about to drop the column `clave` on the `Config` table. All the data in the column will be lost.
  - You are about to drop the column `valor` on the `Config` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "AppConfig" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clave" TEXT NOT NULL,
    "valor" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Config" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "fichas" INTEGER NOT NULL DEFAULT 0,
    "fichasHoy" INTEGER NOT NULL DEFAULT 0,
    "fechaHoy" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_Config" ("fechaHoy", "fichas", "fichasHoy", "id") SELECT "fechaHoy", "fichas", "fichasHoy", "id" FROM "Config";
DROP TABLE "Config";
ALTER TABLE "new_Config" RENAME TO "Config";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "AppConfig_clave_key" ON "AppConfig"("clave");
