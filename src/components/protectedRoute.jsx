// components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { isLoggedIn } from './auth';

const ProtectedRoute = ({ element }) => {
  return isLoggedIn() ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;