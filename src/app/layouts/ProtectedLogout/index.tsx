import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from 'src/app/core/useAuth';

interface ProtectedLogoutProps {
  children: ReactNode;
}

const ProtectedLogout: React.FC<ProtectedLogoutProps> = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default ProtectedLogout;
