
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen w-60 bg-gray-800 text-white flex flex-col p-4">
      <h1 className="text-xl font-bold mb-6">Fluxo360</h1>
      <nav className="flex flex-col gap-4">
        <Link to="/" className="hover:text-yellow-400">Dashboard</Link>
        <Link to="/produtos" className="hover:text-yellow-400">Produtos</Link>
        <Link to="/anuncio" className="hover:text-yellow-400">Anúncios</Link>
        <Link to="/simulador" className="hover:text-yellow-400">Simulador</Link>
      </nav>
      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="w-full mt-6 py-2 bg-red-600 rounded hover:bg-red-700"
        >
          Sair
        </button>
      </div>
    </div>
  );
}
