
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
        {[
          { name: "custoProduto", label: "Custo do Produto" },
          { name: "taxaComissao", label: "Taxa de Comissão (%)" },
          { name: "frete", label: "Frete (R$)" },
          { name: "imposto", label: "Imposto (%)" },
          { name: "custoAdicional", label: "Custo Adicional" },
          { name: "margem", label: "Margem (%)" },
          { name: "precoVenda", label: "Preço de Venda (R$)" }
        ].map(({ name, label }) => (
          <input
            key={name}
            type="number"
            step="0.01"
            name={name}
            placeholder={label}
            value={form[name as keyof typeof form]}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        ))}

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Cadastrar Oferta
        </button>
      </form>
      {mensagem && <p className="text-center mt-4">{mensagem}</p>}
    </div>
  );
}
