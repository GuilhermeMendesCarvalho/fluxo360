
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

type Produto = {
  id: number;
  nome: string;
  preco: number;
};

export default function Produto() {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    async function carregarProdutos() {
      try {
        const res = await api.get('/produtos');
        setProdutos(res.data);
      } catch (err) {
        console.error('Erro ao carregar produtos:', err);
      }
    }
    carregarProdutos();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Lista de Produtos</h2>
        <Link to="/produto/cadastro" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Novo Produto
        </Link>
      </div>
      {produtos.length === 0 ? (
        <p>Nenhum produto cadastrado.</p>
      ) : (
        <ul className="space-y-2">
          {produtos.map((p) => (
            <li key={p.id} className="border rounded p-2 shadow">
              <strong>{p.nome}</strong> - R$ {p.preco.toFixed(2)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
