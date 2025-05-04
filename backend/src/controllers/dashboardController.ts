
import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const obterResumoDashboard = async (req: Request, res: Response) => {
  const usuarioId = req.usuarioId;

  try {
    const [totalProdutos, totalAnuncios, totalOfertas, ofertasAtivas] = await Promise.all([
      prisma.produto.count({ where: { usuarioId } }),
      prisma.anuncio.count({ where: { usuarioId } }),
      prisma.oferta.count({
        where: {
          anuncio: {
            usuarioId
          }
        }
      }),
      prisma.oferta.count({
        where: {
          status: true,
          anuncio: {
            usuarioId
          }
        }
      })
    ]);

    res.json({
      totalProdutos,
      totalAnuncios,
      totalOfertas,
      ofertasAtivas
    });
  } catch (error) {
    console.error("Erro ao obter dashboard:", error);
    res.status(500).json({ mensagem: "Erro interno ao obter dashboard" });
  }
};
