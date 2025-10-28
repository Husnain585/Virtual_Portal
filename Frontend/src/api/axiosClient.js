// src/api/axiosClient.js
import axios from "axios";
import authService from "../services/auth.service";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Attach token before each request
axiosClient.interceptors.request.use(
  (config) => {
    const token = authService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ⚠️ Handle 401 Unauthorized globally
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      authService.logout();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Add setAuthToken function
export const setAuthToken = (token) => {
  if (token) {
    // If you need to store user data as well, you might need to adjust this
    authService.saveAuthData(token, {}); // Empty user object, adjust as needed
  } else {
    authService.logout();
  }
};

export default axiosClient;