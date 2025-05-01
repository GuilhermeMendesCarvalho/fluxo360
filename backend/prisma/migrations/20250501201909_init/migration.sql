-- CreateTable
CREATE TABLE "Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senhaHasheada" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Produto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    CONSTRAINT "Produto_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProdutoVariacao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cor" TEXT NOT NULL,
    "armazenamento" TEXT NOT NULL,
    "sku" TEXT,
    "produtoId" INTEGER NOT NULL,
    CONSTRAINT "ProdutoVariacao_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Anuncio" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "plataforma" TEXT NOT NULL,
    "tipoAnuncio" TEXT NOT NULL,
    "taxaComissao" REAL NOT NULL,
    "ativo" BOOLEAN NOT NULL,
    "produtoVariacaoId" INTEGER NOT NULL,
    CONSTRAINT "Anuncio_produtoVariacaoId_fkey" FOREIGN KEY ("produtoVariacaoId") REFERENCES "ProdutoVariacao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PrecoAnuncio" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nomeOpcao" TEXT NOT NULL,
    "precoVenda" REAL NOT NULL,
    "imposto" REAL NOT NULL,
    "custoFrete" REAL NOT NULL,
    "custoEmbalagem" REAL NOT NULL,
    "margemLucro" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "anuncioId" INTEGER NOT NULL,
    CONSTRAINT "PrecoAnuncio_anuncioId_fkey" FOREIGN KEY ("anuncioId") REFERENCES "Anuncio" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
