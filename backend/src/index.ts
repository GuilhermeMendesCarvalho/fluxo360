import express from "express";
import cors from "cors";

import usuarioRoutes from "./routes/usuarioRoutes";
import produtoRoutes from "./routes/produtoRoutes";
import variacaoRoutes from "./routes/variacaoRoutes";
import ofertaRoutes from "./routes/ofertaRoutes";
import authRoutes from "./routes/authRoutes";
import anuncioRoutes from "./routes/anuncioRoutes";

const app = express();

app.use(cors());
app.use(express.json());


app.use("/auth", authRoutes);
app.use("/usuarios", usuarioRoutes);
app.use("/produtos", produtoRoutes);
app.use("/variacoes", variacaoRoutes);
app.use("/anuncios", anuncioRoutes);

app.listen(3333, () => {
  console.log("🚀 Servidor rodando na porta 3333");
});
app.use(ofertaRoutes);