import { Router } from 'express';
import {criarAnuncio, listarAnuncios, buscarAnuncioPorId, atualizarAnuncio, deletarAnuncio} from "../controllers/anuncioController";
  
import { autenticar } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', autenticar, listarAnuncios);
router.post('/', autenticar, criarAnuncio);

export default router;

router.get("/:id", autenticar, buscarAnuncioPorId);
router.put("/:id", autenticar, atualizarAnuncio);
router.delete("/:id", autenticar, deletarAnuncio);
