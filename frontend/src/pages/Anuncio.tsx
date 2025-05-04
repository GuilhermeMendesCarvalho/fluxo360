
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
  const navigate = useNavigate();

  useEffect(() => {
    async function carregar() {
      try {
        const resposta = await api.get<Anuncio[]>("/anuncios");
        setAnuncios(resposta.data);
      } catch (error) {
        console.error("Erro ao carregar anúncios:", error);
      }
    }

    carregar();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Meus Anúncios</h1>
      <div className="grid grid-cols-1 gap-4">
        {anuncios.map((anuncio) => (
          <div key={anuncio.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">{anuncio.titulo}</h2>
              <p className="text-sm text-gray-500">{anuncio.plataforma} | {anuncio.tipoAnuncio} | {anuncio.status}</p>
            </div>
            <button
              onClick={() => navigate(`/anuncio/${anuncio.id}/oferta`)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Cadastrar Oferta
            </button>
            <button
              onClick={() => navigate(`/anuncio/${anuncio.id}/editar`)}
              className="ml-2 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Editar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
