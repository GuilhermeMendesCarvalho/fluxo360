import { Request, Response } from 'express';

export const exemploUsuarioController = (req: Request, res: Response) => {
  res.send('Controller funcionando!');
};
