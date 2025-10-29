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
// src/api/auth.api.js
export async function loginAPI({ email, password }) {
  try {
    console.log('🔐 LOGIN DEBUG START ==================');
    console.log('📤 Sending login request with:', { 
      email: email || 'EMPTY EMAIL', 
      password: password ? '***' : 'EMPTY PASSWORD' 
    });
    
    // Check if values are actually defined
    if (!email || !password) {
      console.error('❌ MISSING CREDENTIALS:', {
        emailExists: !!email,
        passwordExists: !!password,
        email,
        password: password ? 'has value' : 'empty'
      });
      throw new Error('Email and password are required');
    }

    const res = await axiosClient.post("/auth/login", { email, password });
    
    console.log('✅ LOGIN SUCCESS - Response:', res.data);
    console.log('🔐 LOGIN DEBUG END ==================');
    
    if (res.data?.user) {
      authService.saveAuthData(res.data);
    }
    return res.data;
  } catch (err) {
    console.error('❌ LOGIN FAILED - Full error details:');
    console.error('Error object:', err);
    console.error('Response status:', err.response?.status);
    console.error('Response data:', err.response?.data);
    console.error('Response headers:', err.response?.headers);
    console.error('Request config:', err.config);
    
    // Throw a more specific error
    const errorMessage = err.response?.data?.message || err.message || 'Login failed';
    throw new Error(errorMessage);
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