
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  nome?: string;
  email?: string;
}

export default function UserMenu() {
  const { logout } = useAuth();
  const [usuario, setUsuario] = useState<JwtPayload | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode<JwtPayload>(token);
      setUsuario(decoded);
    }
  }, []);

  return (
    <div className="w-full flex justify-end items-center px-4 py-2 bg-gray-100 border-b">
      <div className="text-sm text-gray-700 mr-4">
        Olá, <span className="font-semibold">{usuario?.nome || usuario?.email}</span>
      </div>
      <button
        onClick={logout}
        className="text-red-600 hover:underline text-sm"
      >
        Sair
      </button>
    </div>
  );
}
