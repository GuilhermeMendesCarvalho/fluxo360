import { Routes, Route } from 'react-router-dom';
import Produto from './pages/Produto';
import Login from './pages/Login';
import ProtectedRoute from './Components/ProtectedRoute';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Produto />
          </ProtectedRoute>
        }
      />
      <Route
        path="/produto"
        element={
          <ProtectedRoute>
            <Produto />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
