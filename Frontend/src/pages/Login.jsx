// src/pages/Login.jsx
import React from "react";
import LoginForm from "../components/forms/LoginForm";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../context/ToastContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const { success, error } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    try {
      const res = await login(formData);
      success(`Welcome, ${res.user.name || res.user.email}`);
      navigate("/");
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
