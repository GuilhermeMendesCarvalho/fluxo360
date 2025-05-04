import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

export default function Dashboard() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-4 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
