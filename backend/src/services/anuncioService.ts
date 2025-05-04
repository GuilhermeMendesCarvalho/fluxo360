
import { prisma } from "../lib/prisma";

interface AnuncioInput {
  titulo: string;
  plataforma: string;
  status: string;
  tipoFrete: string;
  tipoAnuncio: string;
  usuarioId: number;
}

export const criarAnuncio = async (data: AnuncioInput) => {
  return await prisma.anuncio.create({
    data,
  });
};

export const listarAnuncios = async () => {
  return await prisma.anuncio.findMany({
    include: {
      ofertas: true,
    },
  });
};


export const buscarAnuncioPorId = async (id: number) => {
  return await prisma.anuncio.findUnique({
    where: { id },
    include: { ofertas: true },
  });
};

export const atualizarAnuncio = async (id: number, data: Partial<AnuncioInput>) => {
  return await prisma.anuncio.update({
    where: { id },
    data,
  });
};

export const deletarAnuncio = async (id: number) => {
  return await prisma.anuncio.delete({
    where: { id },
  });
};
