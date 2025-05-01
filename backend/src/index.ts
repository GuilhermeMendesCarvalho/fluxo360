import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Rota básica de teste
app.get('/', (req, res) => {
  res.send('🚀 API do Fluxo360 está online!');
});

// Subir servidor
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`🟢 Servidor rodando em http://localhost:${PORT}`);
});
