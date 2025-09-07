import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/navigation/Navbar';

export const UserLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};