import { Router } from 'express';
import { criarProdutoCompleto, listarProdutos } from '../controllers/produto.controller';
import { adicionarVariacao } from '../controllers/variacao.controller';
import { autenticar } from '../middlewares/authMiddleware';

const router = Router();

router.post('/produtos/completo', autenticar, criarProdutoCompleto);
router.get('/produtos', autenticar, listarProdutos);
router.post('/produtos/:id/variacoes', autenticar, adicionarVariacao); // novo endpoint

export default router;
