-- CreateTable
CREATE TABLE "Config" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "fichas" INTEGER NOT NULL DEFAULT 0,
    "fichasHoy" INTEGER NOT NULL DEFAULT 0,
    "fechaHoy" TEXT NOT NULL DEFAULT '',
    "clave" TEXT NOT NULL,
    "valor" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Cola" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "artista" TEXT NOT NULL,
    "duracion" INTEGER NOT NULL,
    "spotifyUri" TEXT NOT NULL,
    "imagenUrl" TEXT NOT NULL,
    "orden" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Config_clave_key" ON "Config"("clave");
