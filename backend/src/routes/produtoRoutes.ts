
import { Router } from 'express';
import { criarProduto, listarProdutos } from '../controllers/produto.controller';
import { autenticar } from '../middlewares/authMiddleware';

const router = Router();

router.use(autenticar);

router.get('/', listarProdutos);
router.post('/', criarProduto);

export default router;
