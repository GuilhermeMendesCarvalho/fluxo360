import { createContext, useContext, useState, ReactNode } from 'react';

type AuthContextType = {
  usuario: any;
  login: (userData: { email: string; senha: string }) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [usuario, setUsuario] = useState(null);

  const login = (userData: { email: string; senha: string }) => {
    if (
      userData.email === 'admin@fluxo360.com' &&
      userData.senha === '123456'
    ) {
      setUsuario(userData);
    } else {
      alert('Credenciais inválidas');
    }
  };

  const logout = () => setUsuario(null);

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro do AuthProvider');
  return context;
};
