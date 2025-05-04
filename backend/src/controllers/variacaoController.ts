import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export const adicionarVariacao = async (req: Request, res: Response) => {
  const produtoId = parseInt(req.params.id);
  const { preco, atributos } = req.body;

  if (isNaN(produtoId)) {
    return res.status(400).json({ mensagem: 'ID de produto inválido.' });
  }

  try {
    const novaVariacao = await prisma.produtoVariacao.create({
      data: {
        preco,
        produto: {
          connect: { id: produtoId }
        },
        atributos: {
          create: atributos.map((attr: any) => ({
            nome: attr.nome,
            valor: attr.valor
          }))
        }
      },
      include: {
        atributos: true
      }
    });

    res.status(201).json(novaVariacao);
  } catch (error) {
    console.error('Erro ao adicionar variação:', error);
    res.status(500).json({ mensagem: 'Erro ao adicionar variação.' });
  }
};
