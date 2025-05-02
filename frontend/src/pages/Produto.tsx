import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

interface Produto {
  id: number;
  nome: string;
  descricao: string;
  variacoes: {
    id: number;
    preco: number;
    atributos: {
      id: number;
      nome: string;
      valor: string;
    }[];
  }[];
}

export default function Produto() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/produtos")
      .then((res) => setProdutos(res.data as Produto[]))
      .catch((err) => console.error("Erro ao carregar produtos:", err));
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Produtos</h1>
        <button onClick={() => navigate("/produto/cadastro")} className="bg-green-500 text-white px-4 py-2 rounded">
          Novo Produto
        </button>
      </div>
      {produtos.map((produto) => (
        <div key={produto.id} className="border rounded p-4 mb-4">
          <h2 className="text-xl font-semibold">{produto.nome}</h2>
          <p className="text-gray-600">{produto.descricao}</p>

          <button
            onClick={() => navigate(`/adicionar-variacao/${produto.id}`)}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Adicionar Variação
          </button>

          <div className="mt-4">
            <h3 className="font-semibold mb-2">Variações:</h3>
            {produto.variacoes.map((variacao) => (
              <div key={variacao.id} className="border rounded p-3 mb-3 bg-gray-50">
                <p className="font-medium text-sm mb-1">Preço: R$ {variacao.preco}</p>
                <ul className="list-disc ml-5 text-sm">
                  {variacao.atributos.map((attr) => (
                    <li key={attr.id}>
                      {attr.nome}: {attr.valor}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
