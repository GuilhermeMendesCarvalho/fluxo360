
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

interface AuthContextType {
  autenticado: boolean;
  login: (email: string, senha: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [autenticado, setAutenticado] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setAutenticado(true);
    }
  }, []);

  const login = async (email: string, senha: string) => {
    try {
      const response = await api.post<{ token: string }>("/auth/login", {
        email,
        senha,
      });
      const token = response.data.token;

      if (token) {
        localStorage.setItem("token", token);
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setAutenticado(true);
        return true;
      }
    } catch (error) {
      console.error("Erro no login:", error);
    }

    return false;
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    setAutenticado(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ autenticado, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
