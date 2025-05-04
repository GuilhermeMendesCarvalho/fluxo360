import { Router } from 'express';
import { adicionarVariacao } from '../controllers/variacaoController';


const router = Router();

router.post('/', adicionarVariacao);

export default router;