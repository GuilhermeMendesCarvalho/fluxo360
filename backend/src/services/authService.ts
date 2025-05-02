import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const criarUsuario = async (nome: string, email: string, senha: string) => {
  const senhaHasheada = await bcrypt.hash(senha, 10);
  return await prisma.usuario.create({
    data: { nome, email, senhaHasheada }
  });
};

export const buscarUsuarioPorEmail = async (email: string) => {
  return await prisma.usuario.findUnique({ where: { email } });
};

export const verificarSenha = async (senha: string, hash: string) => {
  return await bcrypt.compare(senha, hash);
};
