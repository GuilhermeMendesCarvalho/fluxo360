
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function CadastroAnuncio() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    titulo: "",
    plataforma: "",
    tipoFrete: "",
    tipoAnuncio: "",
    status: "ativo"
  });

  const [mensagem, setMensagem] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/anuncios", form);
      setMensagem("Anúncio criado com sucesso!");
      setTimeout(() => navigate("/anuncio"), 1500);
    } catch (error) {
      console.error("Erro ao criar anúncio:", error);
      setMensagem("Erro ao criar anúncio.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow">
      <h1 className="text-xl font-bold mb-4">Cadastrar Anúncio</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="titulo"
          placeholder="Título"
          value={form.titulo}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="plataforma"
          placeholder="Plataforma (ex: Mercado Livre)"
          value={form.plataforma}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <select
          name="tipoFrete"
          value={form.tipoFrete}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Selecione o tipo de frete</option>
          <option value="grátis">Frete grátis</option>
          <option value="pago">Frete pago</option>
        </select>
        <select
          name="tipoAnuncio"
          value={form.tipoAnuncio}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Selecione o tipo de anúncio</option>
          <option value="Clássico">Clássico</option>
          <option value="Premium">Premium</option>
        </select>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Cadastrar
        </button>
      </form>
      {mensagem && <p className="text-center mt-4">{mensagem}</p>}
    </div>
  );
}
