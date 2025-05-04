
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

interface Anuncio {
  id: number;
  titulo: string;
  plataforma: string;
  status: string;
  tipoFrete: string;
  tipoAnuncio: string;
}

export default function Anuncio() {
  const [anuncios, setAnuncios] = useState<Anuncio[]>([]);
  const [plataforma, setPlataforma] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const carregar = async () => {
    try {
      const params: any = {};
      if (plataforma) params.plataforma = plataforma;
      if (status) params.status = status;

      const resposta = await api.get<Anuncio[]>("/anuncios", { params });
      setAnuncios(resposta.data);
    } catch (error) {
      console.error("Erro ao carregar anúncios:", error);
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  const aplicarFiltro = (e: React.FormEvent) => {
    e.preventDefault();
    carregar();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Meus Anúncios</h1>

      <form onSubmit={aplicarFiltro} className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Filtrar por plataforma"
          value={plataforma}
          onChange={(e) => setPlataforma(e.target.value)}
          className="border p-2 rounded w-full sm:w-auto"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 rounded w-full sm:w-auto"
        >
          <option value="">Todos os status</option>
          <option value="ativo">Ativo</option>
          <option value="pausado">Pausado</option>
          <option value="encerrado">Encerrado</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Filtrar
        </button>
      </form>

      <div className="grid grid-cols-1 gap-4">
        {anuncios.map((anuncio) => (
          <div key={anuncio.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">{anuncio.titulo}</h2>
              <p className="text-sm text-gray-500">{anuncio.plataforma} | {anuncio.tipoAnuncio} | {anuncio.status}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => navigate(`/anuncio/${anuncio.id}/oferta`)}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                Cadastrar Oferta
              </button>
              <button
                onClick={() => navigate(`/anuncio/${anuncio.id}/editar`)}
                className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700"
              >
                Editar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
