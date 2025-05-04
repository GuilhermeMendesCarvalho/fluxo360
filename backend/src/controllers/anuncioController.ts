import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export const criarAnuncio = async (req: Request, res: Response) => {
  const { titulo, plataforma, status, tipoFrete, tipoAnuncio } = req.body;
  const usuarioId = req.usuarioId;

  if (!usuarioId) {
    return res.status(401).json({ mensagem: 'Usuário não autenticado' });
  }

  try {
    const novoAnuncio = await prisma.anuncio.create({
      data: {
        titulo,
        usuarioId,
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


export const buscarAnuncioPorId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const anuncio = await prisma.anuncio.findUnique({
      where: { id: Number(id) },
      include: { ofertas: true },
    });

    if (!anuncio) {
      return res.status(404).json({ mensagem: "Anúncio não encontrado" });
    }

    res.json(anuncio);
  } catch (error) {
    console.error("Erro ao buscar anúncio:", error);
    res.status(500).json({ mensagem: "Erro interno ao buscar anúncio" });
  }
};

export const atualizarAnuncio = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { titulo, plataforma, status, tipoFrete, tipoAnuncio } = req.body;
  const usuarioId = req.usuarioId;

  try {
    const anuncio = await prisma.anuncio.findUnique({ where: { id: Number(id) } });

    if (!anuncio || anuncio.usuarioId !== usuarioId) {
      return res.status(403).json({ mensagem: "Acesso negado ou anúncio inexistente" });
    }

    const atualizado = await prisma.anuncio.update({
      where: { id: Number(id) },
      data: { titulo, plataforma, status, tipoFrete, tipoAnuncio },
    });

    res.json(atualizado);
  } catch (error) {
    console.error("Erro ao atualizar anúncio:", error);
    res.status(500).json({ mensagem: "Erro interno ao atualizar anúncio" });
  }
};

export const deletarAnuncio = async (req: Request, res: Response) => {
  const { id } = req.params;
  const usuarioId = req.usuarioId;

  try {
    const anuncio = await prisma.anuncio.findUnique({ where: { id: Number(id) } });

    if (!anuncio || anuncio.usuarioId !== usuarioId) {
      return res.status(403).json({ mensagem: "Acesso negado ou anúncio inexistente" });
    }

    await prisma.anuncio.delete({ where: { id: Number(id) } });

    res.status(204).send();
  } catch (error) {
    console.error("Erro ao deletar anúncio:", error);
    res.status(500).json({ mensagem: "Erro interno ao deletar anúncio" });
  }
};
