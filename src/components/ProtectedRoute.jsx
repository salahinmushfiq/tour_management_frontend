// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SEOHelmet from './SEOHelmet';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user } = useAuth();
  const location = useLocation();

  const isAuthorized = user && allowedRoles.includes(user.role);

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isAuthorized) {
    return <Navigate to="/unauthorized" replace />;
  }

  return (
    <>
      <SEOHelmet noIndex />
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
