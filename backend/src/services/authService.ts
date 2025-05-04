import { prisma } from '../lib/prisma';
import bcrypt from 'bcryptjs';

export const criarUsuarioAdmin = async () => {
  const usuarioExistente = await prisma.usuario.findUnique({
    where: { email: 'admin@fluxo360.com' }
  });

  if (!usuarioExistente) {
    const senhaHasheada = await bcrypt.hash('senha123', 10);

    await prisma.usuario.create({
      data: {
        nome: 'Administrador',
        email: 'admin@fluxo360.com',
        senhaHasheada
      }
    });

    console.log('Usuário admin criado com sucesso!');
  } else {
    console.log('Usuário admin já existe.');
  }
};

// ⚠️ Chamada da função:
criarUsuarioAdmin();
