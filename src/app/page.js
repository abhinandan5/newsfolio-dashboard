'use client';

import { useAuth } from './contexts/AuthContext';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';

export default function Home() {
  const { user } = useAuth();
  
  // this just decides which page to show.
  return (
    <main>
      {user ? <DashboardPage /> : <LoginPage />}
    </main>
  );
}