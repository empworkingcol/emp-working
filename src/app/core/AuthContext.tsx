import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { decodeToken, getToken, setToken } from './Auth.service';
import { Navigate } from 'react-router-dom';

type User = {
  email: string;
  user_name: string;
  user_id: string;
  token: string;
  rol: {
    rol_name: string;
  };
};

type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  login: (token: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (newToken: string) => {
    setToken(newToken);
    const decodedUser = decodeToken(newToken);
    if (decodedUser) {
      setUser({
        token: newToken,
        ...decodedUser.user});
      return <Navigate replace to="/" />;
    } else {
      console.error('Invalid token');
    }
  };

  const logout = () => {
    setUser(null);
    document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  };

  useEffect(() => {
    const token = getToken();
    if (token) {
      const decodedUser = decodeToken(token);
      if (decodedUser) {
        setUser({
          token: token,
          ...decodedUser.user});
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
