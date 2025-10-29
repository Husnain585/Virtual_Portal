// src/contexts/AuthContext.jsx - ENHANCED
import React, { createContext, useState, useEffect } from "react";
import authService from "../services/auth.service";
import { loginAPI, logoutAPI } from "../api/auth.api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(authService.getUser());
  const [token, setToken] = useState(authService.getToken());
  const [loading, setLoading] = useState(false);

  const isAuthenticated = !!token;

  // Initialize auth state on app start
  useEffect(() => {
    const savedToken = authService.getToken();
    const savedUser = authService.getUser();
    
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(savedUser);
    }
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const res = await loginAPI(credentials);
      const userData = res.user || res.data?.user;
      const tokenData = res.token || res.data?.token;
      
      if (userData && tokenData) {
        authService.saveAuthData(tokenData, userData);
        setUser(userData);
        setToken(tokenData);
        return { user: userData, token: tokenData };
      }
      throw new Error("Invalid response format");
    } catch (err) {
      authService.logout();
      setUser(null);
      setToken(null);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logoutAPI();
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      authService.logout();
      setUser(null);
      setToken(null);
    }
  };

  // Get dashboard path based on user role
  const getDashboardPath = (userRole) => {
    switch (userRole?.toLowerCase()) {
      case 'admin':
        return '/admin/dashboard';
      case 'teacher':
        return '/teacher/dashboard';
      case 'student':
        return '/student/dashboard';
      default:
        return '/';
    }
  };

  // Get dashboard path for current user
  const userDashboardPath = user ? getDashboardPath(user.role) : '/';

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      isAuthenticated, 
      loading, 
      login, 
      logout,
      userDashboardPath,
      getDashboardPath
    }}>
      {children}
    </AuthContext.Provider>
  );
};