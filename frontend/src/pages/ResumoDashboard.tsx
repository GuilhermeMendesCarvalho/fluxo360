import { useEffect, useState } from "react";
import api from "../services/api";

interface DashboardData {
  totalProdutos: number;
  totalAnuncios: number;
  totalOfertas: number;
  ofertasAtivas: number;
}

export default function ResumoDashboard() {
  const [dados, setDados] = useState<DashboardData | null>(null);

  useEffect(() => {
    async function carregarDados() {
      try {
        const response = await api.get<DashboardData>("/dashboard");
        setDados(response.data);
      } catch (error) {
        console.error("Erro ao carregar dashboard:", error);
      }
    }

    carregarDados();
  }, []);

  if (!dados) {
    return <p className="text-center text-gray-500 mt-8">Carregando dados...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Resumo Geral</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card titulo="Produtos" valor={dados.totalProdutos} />
        <Card titulo="Anúncios" valor={dados.totalAnuncios} />
        <Card titulo="Ofertas" valor={dados.totalOfertas} />
        <Card titulo="Ofertas Ativas" valor={dados.ofertasAtivas} />
      </div>
    </div>
  );
}

function Card({ titulo, valor }: { titulo: string; valor: number }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center justify-center">
      <span className="text-sm text-gray-500">{titulo}</span>
      <strong className="text-3xl text-blue-600">{valor}</strong>
    </div>
  );
}
