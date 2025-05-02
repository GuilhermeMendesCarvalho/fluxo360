import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

interface Atributo {
  nome: string;
  valor: string;
}

interface Produto {
  id: number;
  nome: string;
  descricao: string;
}

export default function AdicionarVariacao() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [produto, setProduto] = useState<Produto | null>(null);
  const [preco, setPreco] = useState<number>(0);
  const [atributos, setAtributos] = useState<Atributo[]>([{ nome: "", valor: "" }]);

  useEffect(() => {
    if (id) {
      api.get("/produtos")
        .then((res) => {
          const encontrado = res.data.find((p: Produto) => p.id === parseInt(id));
          setProduto(encontrado);
        })
        .catch((err) => console.error("Erro ao carregar produto:", err));
    }
  }, [id]);

  const handleAddAtributo = () => {
    setAtributos([...atributos, { nome: "", valor: "" }]);
  };

  const handleChangeAtributo = (index: number, field: "nome" | "valor", value: string) => {
    const novos = [...atributos];
    novos[index][field] = value;
    setAtributos(novos);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!produto) return alert("Produto não encontrado");

    try {
      await api.post(`/produtos/${produto.id}/variacoes`, {
        preco,
        atributos
      });
      alert("Variação adicionada com sucesso!");
      navigate("/produto");
    } catch (err) {
      console.error(err);
      alert("Erro ao adicionar variação");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Adicionar Variação</h2>
      {produto ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={produto.nome}
            disabled
            className="w-full border rounded p-2 bg-gray-100"
          />
          <input
            type="text"
            value={produto.descricao}
            disabled
            className="w-full border rounded p-2 bg-gray-100"
          />
          <input
            type="number"
            placeholder="Preço"
            value={preco}
            onChange={(e) => setPreco(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
          {atributos.map((attr, idx) => (
            <div key={idx} className="flex gap-2">
              <input
                type="text"
                placeholder="Nome"
                value={attr.nome}
                onChange={(e) => handleChangeAtributo(idx, "nome", e.target.value)}
                className="w-1/2 border rounded p-2"
              />
              <input
                type="text"
                placeholder="Valor"
                value={attr.valor}
                onChange={(e) => handleChangeAtributo(idx, "valor", e.target.value)}
                className="w-1/2 border rounded p-2"
              />
            </div>
          ))}
          <button type="button" onClick={handleAddAtributo} className="bg-gray-200 rounded px-4 py-2">
            + Atributo
          </button>
          <div className="flex justify-between">
            <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2">
              Gravar
            </button>
            <button type="button" onClick={() => navigate("/produto")} className="bg-gray-300 rounded px-4 py-2">
              Voltar
            </button>
          </div>
        </form>
      ) : (
        <p>Carregando produto...</p>
      )}
    </div>
  );
}
