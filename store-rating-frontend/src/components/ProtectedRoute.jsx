import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute({ roles = null, children }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  if (roles && !roles.includes(user.role)) {
    // redirect to appropriate dashboard
    if (user.role === 'admin') return <Navigate to="/admin" />;
    if (user.role === 'owner') return <Navigate to="/owner" />;
    return <Navigate to="/stores" />;
  }

  return children;
}