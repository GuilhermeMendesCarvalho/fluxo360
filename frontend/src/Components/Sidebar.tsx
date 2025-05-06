import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Menu, ChevronLeft } from "lucide-react";

export default function Sidebar() {
  const [encolhida, setEncolhida] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleSidebar = () => {
    setEncolhida(!encolhida);
  };

  return (
    <div className={`min-h-screen ${encolhida ? "w-16" : "w-60"} bg-gray-800 text-white flex flex-col p-4 transition-all duration-300`}>
      <div className="flex justify-between items-center mb-6">
        {!encolhida && <h1 className="text-xl font-bold">Fluxo360</h1>}
        <button onClick={toggleSidebar} className="text-white">
          {encolhida ? <Menu /> : <ChevronLeft />}
        </button>
      </div>
      
      <nav className="flex flex-col gap-4">
        <Link to="/" className="hover:text-yellow-400">
          {encolhida ? "🏠" : "Dashboard"}
        </Link>
        <Link to="/produtos" className="hover:text-yellow-400">
          {encolhida ? "📦" : "Produtos"}
        </Link>
        <Link to="/anuncio" className="hover:text-yellow-400">
          {encolhida ? "📝" : "Anúncios"}
        </Link>
        <Link to="/simulador" className="hover:text-yellow-400">
          {encolhida ? "🧮" : "Simulador"}
        </Link>
      </nav>

      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="w-full mt-6 py-2 bg-red-600 rounded hover:bg-red-700 text-sm"
        >
          {encolhida ? "🚪" : "Sair"}
        </button>
      </div>
    </div>
  );
}
