'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_USERS } from '../lib/constants';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
    // On initial load, check for a user session in localStorage.
    try {
      const storedUser = localStorage.getItem('dashboardUser');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.error("Failed to parse user from localStorage", e);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (email, password) => {
    const foundUser = MOCK_USERS[email];
    if (foundUser && foundUser.password === password) {
      const userData = { email, role: foundUser.role, name: foundUser.name };
      setUser(userData);
      localStorage.setItem('dashboardUser', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('dashboardUser');
  };

  const value = { user, login, logout, isAdmin: user?.role === 'admin' };

  // Don't render children until the initial loading is done
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};