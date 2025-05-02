
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const criarProduto = async (req: Request, res: Response) => {
  const { nome, preco, descricao } = req.body;
  const usuarioId = req.user?.id;

  if (!usuarioId) {
    return res.status(401).json({ error: 'Usuário não autenticado.' });
  }

  if (!nome || preco === undefined) {
    return res.status(400).json({ error: 'Nome e preço são obrigatórios.' });
  }

  try {
    const novoProduto = await prisma.produto.create({
      data: {
        nome,
        descricao,
        preco: parseFloat(preco),
        usuarioId,
      },
    });

    return res.status(201).json(novoProduto);
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    return res.status(500).json({ error: 'Erro interno ao criar produto.' });
  }
};

export const listarProdutos = async (req: Request, res: Response) => {
  const usuarioId = req.user?.id;

  if (!usuarioId) {
    return res.status(401).json({ error: 'Usuário não autenticado.' });
  }

  try {
    const produtos = await prisma.produto.findMany({
      where: { usuarioId },
      orderBy: { id: 'desc' },
    });
    return res.json(produtos);
  } catch (error) {
    console.error('Erro ao listar produtos:', error);
    return res.status(500).json({ error: 'Erro ao listar produtos.' });
  }
};
