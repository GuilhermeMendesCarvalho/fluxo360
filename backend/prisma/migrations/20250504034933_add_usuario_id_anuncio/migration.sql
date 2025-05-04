/*
  Warnings:

  - Added the required column `usuarioId` to the `Anuncio` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Anuncio" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "plataforma" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "tipoFrete" TEXT NOT NULL,
    "tipoAnuncio" TEXT NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    CONSTRAINT "Anuncio_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Anuncio" ("id", "plataforma", "status", "tipoAnuncio", "tipoFrete", "titulo") SELECT "id", "plataforma", "status", "tipoAnuncio", "tipoFrete", "titulo" FROM "Anuncio";
DROP TABLE "Anuncio";
ALTER TABLE "new_Anuncio" RENAME TO "Anuncio";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
