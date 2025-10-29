// src/forms/LoginForm.jsx - UPDATED
import React, { useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import Loader from "../common/Loader";
import { useAuth } from "../../hooks/useAuth"; // Import useAuth

const LoginForm = ({ onSuccess }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth(); // Get login from context

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      // Use AuthContext login instead of direct API call
      const res = await login(form);
      onSuccess && onSuccess(res);
    } catch (err) {
      setError(err?.message || "Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Login</h2>
      
      <Input
        label="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        required
        autoComplete="email"
      />
      
      <Input
        label="Password"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        required
        className="mt-3"
        autoComplete="current-password"
      />
      
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      
      <Button type="submit" className="w-full mt-4" disabled={loading}>
        {loading ? <Loader size={5} /> : "Login"}
      </Button>
    </form>
  );
};

export default LoginForm;