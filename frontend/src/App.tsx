import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Usuario from './pages/Usuario';
import Produto from './pages/Produto';
import Anuncio from './pages/Anuncio';
import Precificacao from './pages/Precificacao';
import Estoque from './pages/Estoque';
import ProtectedRoute from './Components/ProtectedRoute';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
        <Route path="usuario" element={<Usuario />} />
        <Route path="produto" element={<Produto />} />
        <Route path="anuncio" element={<Anuncio />} />
        <Route path="precificacao" element={<Precificacao />} />
        <Route path="estoque" element={<Estoque />} />
      </Route>
    </Routes>
  );
}
