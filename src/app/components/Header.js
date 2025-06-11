'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleDarkMode = () => {
    const newIsDarkMode = !isDarkMode;
    setIsDarkMode(newIsDarkMode);
    if (newIsDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
      
      <div className="flex items-center space-x-4">
        {user && (
            <span className="text-gray-600 dark:text-gray-300 hidden sm:block">
              Welcome, {user.name}
            </span>
        )}
        
        <button
          onClick={toggleDarkMode}
          title="Toggle Dark Mode"
          aria-label="Toggle Dark Mode"
          className="bg-gray-200 dark:bg-gray-900 hover:bg-gray-300 dark:hover:bg-black w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-md transition-colors duration-300"
        >
          {isDarkMode 
            ? <span className="text-gray-400">🌙</span> 
            : <span className="text-yellow-500">☀️</span>
          }
        </button>

        {user && (
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;