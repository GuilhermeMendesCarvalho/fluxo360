import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <aside
        className={`fixed top-0 left-0 h-full bg-slate-800 text-white transition-all duration-300 ${isOpen ? "w-60 p-4" : "w-16 p-2"}`}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white mb-6 focus:outline-none"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {isOpen && (
          <>
            <h2 className="text-lg font-bold border-b border-slate-600 pb-2 mb-4">Fluxo360</h2>
            <nav className="flex flex-col gap-2">
              <Link to="/usuario" className="hover:bg-slate-700 px-3 py-2 rounded">
                Cadastro de Usuário
              </Link>
              <Link to="/produto" className="hover:bg-slate-700 px-3 py-2 rounded">
                Produto
              </Link>
              <Link to="/anuncio" className="hover:bg-slate-700 px-3 py-2 rounded">
                Anúncio
              </Link>
              <Link to="/precificacao" className="hover:bg-slate-700 px-3 py-2 rounded">
                Precificação
              </Link>
              <Link to="/estoque" className="hover:bg-slate-700 px-3 py-2 rounded">
                Estoque
              </Link>
            </nav>
          </>
        )}
      </aside>

      <div className={`transition-all duration-300 ${isOpen ? "pl-60" : "pl-16"}`} />
    </>
  );
}
