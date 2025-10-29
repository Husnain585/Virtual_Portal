// src/routes/ProtectedRoute.jsx - FIXED
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; // Import useAuth

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth(); // Use from AuthContext
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;