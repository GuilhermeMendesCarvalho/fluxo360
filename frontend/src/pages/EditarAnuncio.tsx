
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

export default function EditarAnuncio() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [mensagem, setMensagem] = useState("");

  const [form, setForm] = useState({
    titulo: "",
    plataforma: "",
    tipoFrete: "",
    tipoAnuncio: "",
    status: "ativo"
  });

  useEffect(() => {
    async function carregarDados() {
      try {
        const { data } = await api.get(`/anuncios/${id}`);
        setForm(data);
      } catch (error) {
        console.error("Erro ao carregar anúncio:", error);
        setMensagem("Erro ao carregar dados.");
      }
    }

    carregarDados();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put(`/anuncios/${id}`, form);
      setMensagem("Anúncio atualizado com sucesso!");
      setTimeout(() => navigate("/anuncio"), 1500);
    } catch (error) {
      console.error("Erro ao atualizar anúncio:", error);
      setMensagem("Erro ao atualizar anúncio.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow">
      <h1 className="text-xl font-bold mb-4">Editar Anúncio</h1>
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
          placeholder="Plataforma"
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
          <option value="">Tipo de Frete</option>
          <option value="grátis">Grátis</option>
          <option value="pago">Pago</option>
        </select>
        <select
          name="tipoAnuncio"
          value={form.tipoAnuncio}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Tipo de Anúncio</option>
          <option value="Clássico">Clássico</option>
          <option value="Premium">Premium</option>
        </select>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="ativo">Ativo</option>
          <option value="pausado">Pausado</option>
          <option value="encerrado">Encerrado</option>
        </select>

        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Salvar Alterações
        </button>
      </form>

      <button
        type="button"
        onClick={() => navigate(`/anuncio/${id}/oferta`)}
        className="mt-4 text-sm text-blue-600 hover:underline"
      >
        + Nova Oferta para este Anúncio
      </button>
    

      <button
        type="button"
        onClick={() => navigate("/anuncio")}
        className="mt-4 text-sm text-blue-600 hover:underline"
      >
        ← Voltar para Anúncios
      </button>

      {mensagem && <p className="text-center mt-4">{mensagem}</p>}
    </div>
  );
}
