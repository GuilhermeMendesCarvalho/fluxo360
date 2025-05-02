/*
  Warnings:

  - You are about to drop the `Anuncio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PrecoAnuncio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `preco` on the `Produto` table. All the data in the column will be lost.
  - You are about to drop the column `armazenamento` on the `ProdutoVariacao` table. All the data in the column will be lost.
  - You are about to drop the column `cor` on the `ProdutoVariacao` table. All the data in the column will be lost.
  - You are about to drop the column `sku` on the `ProdutoVariacao` table. All the data in the column will be lost.
  - Added the required column `preco` to the `ProdutoVariacao` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Anuncio";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "PrecoAnuncio";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "AtributoVariacao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "valor" TEXT NOT NULL,
    "variacaoId" INTEGER NOT NULL,
    CONSTRAINT "AtributoVariacao_variacaoId_fkey" FOREIGN KEY ("variacaoId") REFERENCES "ProdutoVariacao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Produto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "usuarioId" INTEGER NOT NULL,
    CONSTRAINT "Produto_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Produto" ("descricao", "id", "nome", "usuarioId") SELECT "descricao", "id", "nome", "usuarioId" FROM "Produto";
DROP TABLE "Produto";
ALTER TABLE "new_Produto" RENAME TO "Produto";
CREATE TABLE "new_ProdutoVariacao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "preco" REAL NOT NULL,
    "produtoId" INTEGER NOT NULL,
    CONSTRAINT "ProdutoVariacao_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ProdutoVariacao" ("id", "produtoId") SELECT "id", "produtoId" FROM "ProdutoVariacao";
DROP TABLE "ProdutoVariacao";
ALTER TABLE "new_ProdutoVariacao" RENAME TO "ProdutoVariacao";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
