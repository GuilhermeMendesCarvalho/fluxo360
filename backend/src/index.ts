import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import produtoRoutes from './routes/produtoRoutes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/produtos', produtoRoutes); // <- mover para cá, após o app existir

app.get('/', (req, res) => {
  res.send('🚀 API do Fluxo360 está online!');
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`🟢 Servidor rodando em http://localhost:${PORT}`);
});
