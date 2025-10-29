// src/pages/Login.jsx - USING EXISTING METHOD
import React from "react";
import LoginForm from "../components/forms/LoginForm";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../context/ToastContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { getDashboardPath } = useAuth();
  const { success, error } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    try {
      success(`Welcome, ${formData.user.name || formData.user.email}`);
      
      // Using your existing getDashboardPath method
      const dashboardPath = getDashboardPath(formData.user.role);
      navigate(dashboardPath, { replace: true });
    } catch (err) {
      error(err?.message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 text-black">
      <LoginForm onSuccess={handleLogin} />
    </div>
  );
};

export default Login;