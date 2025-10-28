// src/forms/LoginForm.jsx
import React, { useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import Loader from "../common/Loader";
import { loginAPI } from "../../api/auth.api";

const LoginForm = ({ onSuccess }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await loginAPI(form);
      onSuccess && onSuccess(res);
    } catch (err) {
      setError(err?.message || "Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm mx-auto"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Login
      </h2>
      
      {/* Add autocomplete attributes */}
      <Input
        label="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        required
        autoComplete="email" // Add this
      />
      
      <Input
        label="Password"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        required
        className="mt-3"
        autoComplete="current-password" // Add this - fixes the warning
      />
      
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      
      <Button type="submit" className="w-full mt-4" disabled={loading}>
        {loading ? <Loader size={5} /> : "Login"}
      </Button>
    </form>
  );
};

export default LoginForm;