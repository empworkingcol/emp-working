import React, { createContext, useState, ReactNode } from 'react';
import Cookies from 'js-cookie';

import { decodeToken, getToken, setToken } from './Auth.service';

type User = {
  email: string;
  user_name: string;
  user_id: string;
  token: string;
  rol: {
    rol_name: string;
  };
};

type LastAction = {
  path: string;
  modalState?: { isModalOpen: boolean };
};

type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  login: (token: string) => void;
  logout: () => void;
  saveLastAction: (path: string, modalState?: { isModalOpen: boolean }) => void;
  lastAction: LastAction | null;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [lastAction, setLastAction] = useState<LastAction | null>(null);

  if (!user) {
    const token = getToken();
    if (token) {
      const decodedUser = decodeToken(token);
      if (decodedUser) {
        setUser({
          token: token,
          ...decodedUser.user
        });
      }
    }
  }

  const login = (newToken: string) => {
    setToken(newToken);
    const decodedUser = decodeToken(newToken);
    if (decodedUser) {
      setUser({
        token: newToken,
        ...decodedUser.user
      });
      setLastAction(null);
    } else {
      console.error('Invalid token');
    }
  };

  const logout = () => {
    setUser(null);
    Cookies.remove('session_tkn');
  };

  const saveLastAction = (path: string, modalState?: { isModalOpen: boolean }) => {
    setLastAction({ path, modalState });
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, saveLastAction, lastAction }}>
      {children}
    </AuthContext.Provider>
  );
};
