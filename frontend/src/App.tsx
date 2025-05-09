
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
import { useAuth } from './context/AuthContext';
import Sidebar from "./components/Sidebar";
import CadastroAnuncio from "./pages/CadastroAnuncio";
import UserMenu from './components/UserMenu';
import CadastrarOferta from "./pages/CadastrarOferta";
import EditarOferta from './pages/EditarOferta';
import SimuladorPreco from './pages/SimuladorPreco';

function App() {
  const { autenticado } = useAuth();
  return (
    <div className='flex'>
    {autenticado && <Sidebar />}
      <div className='flex-1 p-4'>
        <UserMenu />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/usuario" element={<ProtectedRoute><Usuario /></ProtectedRoute>} />
          <Route path="/produto" element={<ProtectedRoute><Produto /></ProtectedRoute>} />
          <Route path="/produtos" element={<ProtectedRoute><Produto /></ProtectedRoute>} />
          <Route path="/anuncio/cadastro" element={<ProtectedRoute><CadastroAnuncio /></ProtectedRoute>}/>
          <Route path="/produto/cadastro" element={<ProtectedRoute><CadastroProduto /></ProtectedRoute>} />
          <Route path="/adicionar-variacao/:id" element={<ProtectedRoute><AdicionarVariacao /></ProtectedRoute>} />
          <Route path="/anuncio" element={<ProtectedRoute><Anuncio /></ProtectedRoute>} />
          <Route path="/anuncio/:id/oferta" element={<ProtectedRoute><CadastrarOferta /></ProtectedRoute>} />
          <Route path="/precificacao" element={<ProtectedRoute><Precificacao /></ProtectedRoute>} />
          <Route path="/estoque" element={<ProtectedRoute><Estoque /></ProtectedRoute>} />
          <Route path="/oferta/:id/editar" element={<ProtectedRoute><EditarOferta /></ProtectedRoute>} />
          <Route path="/simulador" element={<ProtectedRoute><SimuladorPreco /></ProtectedRoute>} />
        </Routes>

      </div>
    </div>
  );
}

export default App;
