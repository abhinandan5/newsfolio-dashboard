'use client';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const success = login(email, password);
    if (!success) {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-2">Welcome Back!</h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-8">Sign in to continue</p>
        <form onSubmit={handleSubmit}>
          {error && <p className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">{error}</p>}
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="email">Email</label>
            <input className="w-full px-4 py-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-gray-600 focus:outline-none" id="email" type="email" placeholder="user@demo.com or admin@demo.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="password">Password</label>
            <input className="w-full px-4 py-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-gray-600 focus:outline-none" id="password" type="password" placeholder="••••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
             <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Hint: `password` for user, `admin123` for admin.</p>
          </div>
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300" type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;