import { prisma } from "../lib/prisma";

export const criarAnuncio = async (data: any) => {
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
