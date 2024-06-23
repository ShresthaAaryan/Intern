// AuthContext.tsx

import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  token: string | null;
  userId: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: () => boolean;
}

const AuthContext = createContext<AuthContextType>({
  token: null,
  userId: null,
  login: async (username: string, password: string) => {},
  logout: () => {},
  isAuthenticated: () => false,
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: React.ReactNode; 

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [userId, setUserId] = useState<string | null>(localStorage.getItem('userId'));
  const navigate = useNavigate();

  const login = async (username: string, password: string) => {
    try {
      // Perform login logic here
      navigate('/home');
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Login failed');
    }
  };

  const logout = () => {
    // Perform logout logic here
    navigate('/login');
  };

  const isAuthenticated = () => !!token;

  return (
    <AuthContext.Provider value={{ token, userId, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
