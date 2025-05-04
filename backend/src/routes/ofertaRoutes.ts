
import { Router } from "express";
import { autenticar } from "../middlewares/authMiddleware";
import {
  criarOferta,
  listarOfertasPorAnuncio,
  ativarOferta
} from "../controllers/ofertaController";

const router = Router();

// Rotas relacionadas à oferta
router.post("/anuncios/:id/ofertas", autenticar, criarOferta);
router.get("/anuncios/:id/ofertas", autenticar, listarOfertasPorAnuncio);
router.put("/ofertas/:id/ativar", autenticar, ativarOferta);

export default router;
