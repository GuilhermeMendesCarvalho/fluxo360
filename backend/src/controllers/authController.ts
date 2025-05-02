import { Request, Response } from 'express';
import { criarUsuario, buscarUsuarioPorEmail, verificarSenha } from '../services/authService';
import generateToken from '../utils/generateToken';

export const register = async (req: Request, res: Response) => {
  const { nome, email, senha } = req.body;
  if (!nome || !email || !senha) {
    return res.status(400).json({ error: 'Preencha todos os campos.' });
  }

  const userExists = await buscarUsuarioPorEmail(email);
  if (userExists) {
    return res.status(400).json({ error: 'E-mail já cadastrado.' });
  }

  const novoUsuario = await criarUsuario(nome, email, senha);
  const token = generateToken(novoUsuario.id);

  res.status(201).json({
    usuario: {
      id: novoUsuario.id,
      nome: novoUsuario.nome,
      email: novoUsuario.email
    },
    token
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, senha } = req.body;
  if (!email || !senha) {
    return res.status(400).json({ error: 'Preencha todos os campos.' });
  }

  const usuario = await buscarUsuarioPorEmail(email);
  if (!usuario || !(await verificarSenha(senha, usuario.senhaHasheada))) {
    return res.status(401).json({ error: 'Credenciais inválidas.' });
  }

  const token = generateToken(usuario.id);
  res.json({ token });
};
