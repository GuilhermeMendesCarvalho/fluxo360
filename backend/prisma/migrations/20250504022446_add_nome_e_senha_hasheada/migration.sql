-- CreateTable
CREATE TABLE "Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senhaHasheada" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Produto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "usuarioId" INTEGER NOT NULL,
    CONSTRAINT "Produto_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProdutoVariacao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "preco" REAL NOT NULL,
    "produtoId" INTEGER NOT NULL,
    CONSTRAINT "ProdutoVariacao_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Atributo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "valor" TEXT NOT NULL,
    "variacaoId" INTEGER NOT NULL,
    CONSTRAINT "Atributo_variacaoId_fkey" FOREIGN KEY ("variacaoId") REFERENCES "ProdutoVariacao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Anuncio" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "plataforma" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "tipoFrete" TEXT NOT NULL,
    "tipoAnuncio" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Oferta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "custoProduto" REAL NOT NULL,
    "taxaComissao" REAL NOT NULL,
    "frete" REAL NOT NULL,
    "imposto" REAL NOT NULL,
    "custoAdicional" REAL NOT NULL,
    "margem" REAL NOT NULL,
    "precoVenda" REAL NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "anuncioId" INTEGER NOT NULL,
    CONSTRAINT "Oferta_anuncioId_fkey" FOREIGN KEY ("anuncioId") REFERENCES "Anuncio" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
