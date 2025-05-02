import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  const [aberto, setAberto] = useState(false);

  return (
    <div className="relative">
      <button
        className="absolute top-4 left-4 z-50 text-xl bg-gray-800 text-white p-2 rounded"
        onClick={() => setAberto(!aberto)}
      >
        ☰
      </button>

      {aberto && (
        <div className="absolute top-0 left-0 w-64 h-screen bg-gray-800 text-white p-6 z-40 shadow-lg">
          <nav className="flex flex-col gap-4">
            <Link to="/usuario" onClick={() => setAberto(false)}>Cadastro de Usuário</Link>
            <Link to="/produto" onClick={() => setAberto(false)}>Produto</Link>
            <Link to="/anuncio" onClick={() => setAberto(false)}>Anúncio</Link>
            <Link to="/precificacao" onClick={() => setAberto(false)}>Precificação</Link>
            <Link to="/estoque" onClick={() => setAberto(false)}>Estoque</Link>
          </nav>
        </div>
      )}
    </div>
  );
}
