
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Usuario from './pages/Usuario';
import Produto from './pages/Produto';
import CadastroProduto from './pages/CadastroProduto';
import Anuncio from './pages/Anuncio';
import Precificacao from './pages/Precificacao';
import Estoque from './pages/Estoque';
import AdicionarVariacao from './pages/AdicionarVariacao';
import ProtectedRoute from './components/ProtectedRoute';
import EditarOferta from './pages/EditarOferta';
import SimuladorPreco from './pages/SimuladorPreco';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/usuario" element={<ProtectedRoute><Usuario /></ProtectedRoute>} />
      <Route path="/produto" element={<ProtectedRoute><Produto /></ProtectedRoute>} />
      <Route path="/produto/cadastro" element={<ProtectedRoute><CadastroProduto /></ProtectedRoute>} />
      <Route path="/adicionar-variacao/:id" element={<ProtectedRoute><AdicionarVariacao /></ProtectedRoute>} />
      <Route path="/anuncio" element={<ProtectedRoute><Anuncio /></ProtectedRoute>} />
      <Route path="/precificacao" element={<ProtectedRoute><Precificacao /></ProtectedRoute>} />
      <Route path="/estoque" element={<ProtectedRoute><Estoque /></ProtectedRoute>} />
    <Route path="/oferta/:id/editar" element={<EditarOferta />} />
      <Route path="/simulador" element={<SimuladorPreco />} />
      </Routes>
  );
}

export default App;
