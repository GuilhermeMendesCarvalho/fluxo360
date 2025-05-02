import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import produtoRoutes from './routes/produtoRoutes';

const app = express();
const PORT = 3333;

app.use(cors());
app.use(express.json());

// Registro das rotas
app.use(authRoutes);
app.use(produtoRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
