// src/api/auth.api.js
import axiosClient from "./axiosClient.js";
import authService from "../services/auth.service";

/**
 * Login
 * POST /api/auth/login
 * body: { email, password }
 * returns: { token, user }
 */
// src/api/auth.api.js - Frontend
export async function loginAPI({ email, password }) {
  try {
    console.log('🔄 Attempting login with:', { email });
    
    const res = await axiosClient.post("/auth/login", { email, password });
    const data = res.data;
    
    console.log('✅ Login response:', data);
    
    if (data?.user) {
      authService.saveAuthData(data.user);
    }
    return data;
  } catch (err) {
    console.error('❌ Login error:', err.response?.data || err.message);
    throw err?.response?.data || err;
  }
}

/**
 * Register
 * POST /api/auth/register
 * body: { firstName, lastName, email, password, role }
 */
export async function register(payload) {
  try {
    const res = await axiosClient.post("/auth/register", payload);
    return res.data;
  } catch (err) {
    throw err?.response?.data || err;
  }
}

/**
 * Logout
 * POST /api/auth/logout
 */
export async function logoutAPI() {
  try {
    const res = await axiosClient.post("/auth/logout");
    // client-side cleanup - use authService
    authService.logout();
    return res.data;
  } catch (err) {
    // still clear client token to be safe
    authService.logout();
    throw err?.response?.data || err;
  }
}

/**
 * Forgot password
 * POST /api/auth/forgot-password  { email }
 */
export async function forgotPassword(email) {
  try {
    const res = await axiosClient.post("/auth/forgot-password", { email });
    return res.data;
  } catch (err) {
    throw err?.response?.data || err;
  }
}

/**
 * Reset password
 * POST /api/auth/reset-password  { token, newPassword }
 */
export async function resetPassword(payload) {
  try {
    const res = await axiosClient.post("/auth/reset-password", payload);
    return res.data;
  } catch (err) {
    throw err?.response?.data || err;
  }
}