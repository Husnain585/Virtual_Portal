// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import authService from "../services/auth.service";
import { loginAPI, logoutAPI } from "../api/auth.api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(authService.getUser());
  const [token, setToken] = useState(authService.getToken());
  const [loading, setLoading] = useState(false);

  const isAuthenticated = !!token;

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await loginAPI({ email, password });
      authService.saveAuthData(res.token, res.user);
      setUser(res.user);
      setToken(res.token);
      return res.user;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logoutAPI();
    } catch (_) {}
    authService.logout();
    setUser(null);
    setToken(null);
  };

  useEffect(() => {
    // auto-refresh logic if needed later
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
