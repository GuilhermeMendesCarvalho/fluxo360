import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export const criarAnuncio = async (req: Request, res: Response) => {
  const { titulo, plataforma, status, tipoFrete, tipoAnuncio } = req.body;

  try {
    const novoAnuncio = await prisma.anuncio.create({
      data: {
        titulo,
        plataforma,
        status,
        tipoFrete,
        tipoAnuncio,
      },
    });

    res.status(201).json(novoAnuncio);
  } catch (error) {
    console.error('Erro ao criar anúncio:', error);
    res.status(500).json({ mensagem: 'Erro interno ao criar anúncio' });
  }
};

export const listarAnuncios = async (_req: Request, res: Response) => {
  try {
    const anuncios = await prisma.anuncio.findMany({
      include: {
        ofertas: true,
      },
    });

    res.json(anuncios);
  } catch (error) {
    console.error('Erro ao listar anúncios:', error);
    res.status(500).json({ mensagem: 'Erro ao listar anúncios' });
  }
};
