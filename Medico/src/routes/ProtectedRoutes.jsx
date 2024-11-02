import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/context_api/AuthContext';
import toast from 'react-hot-toast';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, userRole, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) return;

    if (!isAuthenticated && userRole !== requiredRole) {
      toast.error("You must log in to view this page!");
      navigate('/'); 
      return null;
    } 
 

  if (!isAuthenticated || (requiredRole && userRole !== requiredRole)) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
