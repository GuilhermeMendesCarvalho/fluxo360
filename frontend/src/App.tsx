import { Routes, Route, Navigate } from 'react-router-dom';
import Produto from './pages/Produto';
import Login from './pages/Login';
import ProtectedRoute from './Components/ProtectedRoute';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
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
