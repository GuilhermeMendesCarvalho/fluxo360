import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'chave_secreta';

export const autenticar = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ erro: 'Token não fornecido.' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { userId: number; role: string };

    req.user = {
      id: payload.userId,
      role: payload.role,
    };

    next();
  } catch {
    return res.status(401).json({ erro: 'Token inválido.' });
  }
};

export const somenteAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ erro: 'Acesso restrito a administradores.' });
  }

  next();
};
