// src/pages/Register.jsx
import React from "react";
import RegisterForm from "../components/forms/RegisterForm";
import { useToast } from "../context/ToastContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { success, error } = useToast();
  const navigate = useNavigate();

  const handleRegister = (res) => {
    success("Registration successful! Please login.");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <RegisterForm onSuccess={handleRegister} />
    </div>
  );
};

export default Register;
