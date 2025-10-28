// src/services/localStorage.service.js
const localStorageService = {
  set: (key, value) => {
    try {
      const data = typeof value === "string" ? value : JSON.stringify(value);
      localStorage.setItem(key, data);
    } catch (err) {
      console.error("localStorage set error:", err);
    }
  },

  get: (key) => {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch {
      return null;
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (err) {
      console.error("localStorage remove error:", err);
    }
  },

  clear: () => {
    try {
      localStorage.clear();
    } catch (err) {
      console.error("localStorage clear error:", err);
    }
  },
};

export default localStorageService;
