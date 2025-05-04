
import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const criarOferta = async (req: Request, res: Response) => {
  const { id: anuncioId } = req.params;
  const {
    custoProduto,
    taxaComissao,
    frete,
    imposto,
    custoAdicional,
    margem,
    precoVenda,
  } = req.body;

  const usuarioId = req.usuarioId;

  try {
    const anuncio = await prisma.anuncio.findUnique({ where: { id: Number(anuncioId) } });

    if (!anuncio || anuncio.usuarioId !== usuarioId) {
      return res.status(403).json({ mensagem: "Acesso negado ou anúncio não encontrado" });
    }

    const novaOferta = await prisma.oferta.create({
      data: {
        custoProduto,
        taxaComissao,
        frete,
        imposto,
        custoAdicional,
        margem,
        precoVenda,
        anuncioId: Number(anuncioId),
      },
    });

    res.status(201).json(novaOferta);
  } catch (error) {
    console.error("Erro ao criar oferta:", error);
    res.status(500).json({ mensagem: "Erro interno ao criar oferta" });
  }
};

export const listarOfertasPorAnuncio = async (req: Request, res: Response) => {
  const { id: anuncioId } = req.params;

  try {
    const ofertas = await prisma.oferta.findMany({
      where: { anuncioId: Number(anuncioId) },
    });

    res.json(ofertas);
  } catch (error) {
    console.error("Erro ao listar ofertas:", error);
    res.status(500).json({ mensagem: "Erro interno ao listar ofertas" });
  }
};

export const ativarOferta = async (req: Request, res: Response) => {
  const { id } = req.params;
  const usuarioId = req.usuarioId;

  try {
    const oferta = await prisma.oferta.findUnique({
      where: { id: Number(id) },
      include: { anuncio: true },
    });

    if (!oferta || oferta.anuncio.usuarioId !== usuarioId) {
      return res.status(403).json({ mensagem: "Acesso negado ou oferta/anúncio inválido" });
    }

    await prisma.oferta.updateMany({
      where: { anuncioId: oferta.anuncioId },
      data: { status: false },
    });

    const ativada = await prisma.oferta.update({
      where: { id: oferta.id },
      data: { status: true },
    });

    res.json(ativada);
  } catch (error) {
    console.error("Erro ao ativar oferta:", error);
    res.status(500).json({ mensagem: "Erro interno ao ativar oferta" });
  }
};
