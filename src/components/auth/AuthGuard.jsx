import React from 'react';
import { Navigate } from 'react-router-dom';

function AuthGuard({ children }) {
  const isAuthenticated = false; // Замініть на реальну логіку перевірки авторизації

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default AuthGuard;
