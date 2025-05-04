import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  id: number;
  iat: number;
  exp: number;
}

// Declaração global para req.usuarioId
declare global {
  namespace Express {
    interface Request {
      usuarioId?: number;
    }
  }
}

export function autenticar(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    console.log('🔴 Token não fornecido');
    return res.status(401).json({ mensagem: 'Token não fornecido' });
  }

  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    console.log('🔴 Formato do token inválido');
    return res.status(401).json({ mensagem: 'Formato do token inválido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
    req.usuarioId = decoded.id;
    console.log('🟢 Token válido, ID extraído:', decoded.id);
    next();
  } catch (err) {
    console.log('🔴 Token inválido');
    return res.status(401).json({ mensagem: 'Token inválido' });
  }
}
