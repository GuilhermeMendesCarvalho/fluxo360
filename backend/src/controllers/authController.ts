import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login = async (req: Request, res: Response) => {
  const { email, senha } = req.body;

  try {
    const usuario = await prisma.usuario.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        nome: true,
        senhaHasheada: true,
      },
    });
    

    if (!usuario || !(await bcrypt.compare(senha, usuario.senhaHasheada))) {
      return res.status(401).json({ mensagem: 'Credenciais inválidas.' });
    }

    const token = jwt.sign(
      {
        id: usuario.id, // 🔁 Isso é o que o middleware espera
        email: usuario.email,
        nome: usuario.nome
      },
      process.env.JWT_SECRET as string,
      { expiresIn: '1d' }
    );
    

    res.json({ token });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ mensagem: 'Erro no login.' });
  }
};
