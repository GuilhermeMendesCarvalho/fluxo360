import { Router } from 'express';
import { criarProdutoCompleto, listarProdutos } from '../controllers/produtoController';
import { adicionarVariacao } from '../controllers/variacaoController';
import { autenticar } from '../middlewares/authMiddleware';

const router = Router();

router.post('/completo', autenticar, criarProdutoCompleto);
router.get('/', autenticar, listarProdutos);
router.post('/:id/variacoes', autenticar, adicionarVariacao);

export default router;
