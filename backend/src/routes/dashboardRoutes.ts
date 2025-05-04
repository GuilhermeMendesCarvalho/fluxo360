
import { Router } from "express";
import { obterResumoDashboard } from "../controllers/dashboardController";
import { autenticar } from "../middlewares/authMiddleware";

const router = Router();

router.get("/dashboard", autenticar, obterResumoDashboard);

export default router;
