// src/forms/RegisterForm.jsx
import React, { useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import Loader from "../common/Loader";

const RegisterForm = ({ onSuccess }) => {
  const [form, setForm] = useState({ 
    name: "", 
    lastName: "", 
    email: "", 
    password: "", 
    confirmPassword: "",
    role: "student" 
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validateForm = () => {
    if (!form.name || !form.lastName || !form.email || !form.password || !form.confirmPassword) {
      setError("All fields are required");
      return false;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }

    // Basic password strength validation
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
    if (!strongPasswordRegex.test(form.password)) {
      setError("Password must contain at least 1 lowercase, 1 uppercase, 1 number, and 1 special character");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Remove confirmPassword before sending to API
      const { confirmPassword, ...submitData } = form;
      onSuccess && onSuccess(submitData);
    } catch (err) {
      setError(err?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create Account</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="First Name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          required
          placeholder="Enter your first name"
        />
        
        <Input
          label="Last Name"
          name="lastName"
          type="text"
          value={form.lastName}
          onChange={handleChange}
          required
          placeholder="Enter your last name"
        />
      </div>
      
      <Input
        label="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        required
        className="mt-4"
        autoComplete="email"
        placeholder="Enter your email"
      />
      
      <Input
        label="Password"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        required
        className="mt-4"
        autoComplete="new-password"
        placeholder="Enter your password"
      />
      
      <Input
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        value={form.confirmPassword}
        onChange={handleChange}
        required
        className="mt-4"
        autoComplete="new-password"
        placeholder="Confirm your password"
      />
      
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">I am a:</label>
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="role"
              value="student"
              checked={form.role === "student"}
              onChange={handleChange}
              className="mr-2"
            />
            Student
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="role"
              value="teacher"
              checked={form.role === "teacher"}
              onChange={handleChange}
              className="mr-2"
            />
            Teacher
          </label>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Admin accounts can only be created by existing administrators.
        </p>
      </div>
      
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}
      
      <Button type="submit" className="w-full mt-6" disabled={loading}>
        {loading ? <Loader size={5} /> : "Create Account"}
      </Button>
      
      <p className="text-center text-sm text-gray-600 mt-4">
        Already have an account?{" "}
        <a href="/login" className="text-blue-600 hover:underline font-medium">
          Sign in
        </a>
      </p>
    </form>
  );
};

export default RegisterForm;