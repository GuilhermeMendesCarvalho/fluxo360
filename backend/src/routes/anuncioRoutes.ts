import { Router } from 'express';
import { criarAnuncio, listarAnuncios } from '../controllers/anuncioController';
import { autenticar } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', autenticar, listarAnuncios);
router.post('/', autenticar, criarAnuncio);

export default router;
