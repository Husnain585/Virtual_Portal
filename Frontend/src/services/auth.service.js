// src/services/auth.service.js
import localStorageService from "./localStorage.service";

const TOKEN_KEY = "dlp_token";
const USER_KEY = "dlp_user";

export const saveAuthData = (token, user) => {
  localStorageService.set(TOKEN_KEY, token);
  localStorageService.set(USER_KEY, user);
};

export const getToken = () => localStorageService.get(TOKEN_KEY);
export const getUser = () => localStorageService.get(USER_KEY);
export const isAuthenticated = () => !!localStorageService.get(TOKEN_KEY);
export const logout = () => {
  localStorageService.remove(TOKEN_KEY);
  localStorageService.remove(USER_KEY);
};

// Optional: Keep default export for backward compatibility
const authService = {
  saveAuthData,
  getToken,
  getUser,
  isAuthenticated,
  logout,
};
export default authService;