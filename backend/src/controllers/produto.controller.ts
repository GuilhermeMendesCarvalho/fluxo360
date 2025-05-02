import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export const criarProdutoCompleto = async (req: Request, res: Response) => {
  const { nome, descricao, variacoes } = req.body;
  const usuarioId = req.usuarioId;

  if (!usuarioId) {
    return res.status(401).json({ mensagem: 'Usuário não autenticado.' });
  }

  try {
    const produto = await prisma.produto.create({
      data: {
        nome,
        descricao,
        usuarioId,
        variacoes: {
          create: variacoes.map((variacao: any) => ({
            preco: variacao.preco,
            atributos: {
              create: variacao.atributos.map((attr: any) => ({
                nome: attr.nome,
                valor: attr.valor
              }))
            }
          }))
        }
      },
      include: {
        variacoes: {
          include: {
            atributos: true
          }
        }
      }
    });    

    res.status(201).json(produto);
  } catch (error) {
    console.error('Erro ao criar produto completo:', error);
    res.status(500).json({ mensagem: 'Erro ao criar produto completo.' });
  }
};

export const listarProdutos = async (req: Request, res: Response) => {
  try {
    const produtos = await prisma.produto.findMany({
      include: {
        variacoes: {
          include: {
            atributos: true
          }
        }
      }
    });
    res.json(produtos);
  } catch (err) {
    console.error('Erro ao listar produtos:', err);
    res.status(500).json({ mensagem: 'Erro ao listar produtos.' });
  }
};
