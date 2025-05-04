import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

export default function CadastrarOferta() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [mensagem, setMensagem] = useState("");

  const [form, setForm] = useState({
    custoProduto: 0,
    taxaComissao: 0,
    frete: 0,
    imposto: 0,
    custoAdicional: 0,
    margem: 0,
    precoVenda: 0
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: parseFloat(e.target.value) || 0 });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post(`/anuncios/${id}/ofertas`, form);
      setMensagem("Oferta criada com sucesso!");
      setTimeout(() => navigate("/anuncio"), 1500);
    } catch (error) {
      console.error("Erro ao criar oferta:", error);
      setMensagem("Erro ao criar oferta.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow">
      <h1 className="text-xl font-bold mb-4">Cadastrar Oferta</h1>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block text-sm font-medium mb-1">Custo do Produto (R$)</label>
          <input
            type="number"
            step="0.01"
            name="custoProduto"
            placeholder="Ex: 45.00"
            value={form.custoProduto}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Taxa de Comissão (%)</label>
          <input
            type="number"
            step="0.01"
            name="taxaComissao"
            placeholder="Ex: 16"
            value={form.taxaComissao}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Frete (R$)</label>
          <input
            type="number"
            step="0.01"
            name="frete"
            placeholder="Ex: 12.00"
            value={form.frete}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Imposto (%)</label>
          <input
            type="number"
            step="0.01"
            name="imposto"
            placeholder="Ex: 5"
            value={form.imposto}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Custo Adicional (R$)</label>
          <input
            type="number"
            step="0.01"
            name="custoAdicional"
            placeholder="Ex: 3.50"
            value={form.custoAdicional}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Margem de Lucro (%)</label>
          <input
            type="number"
            step="0.01"
            name="margem"
            placeholder="Ex: 25"
            value={form.margem}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Preço de Venda (R$)</label>
          <input
            type="number"
            step="0.01"
            name="precoVenda"
            placeholder="Ex: 65.00"
            value={form.precoVenda}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Cadastrar Oferta
        </button>
      </form>

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