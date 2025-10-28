// src/utils/constants.js

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const TOKEN_KEY = "dlp_token";
export const USER_KEY = "dlp_user";
export const THEME_KEY = "dlp_theme";

export const DEFAULT_PAGINATION = {
  page: 1,
  limit: 10,
};

export const FILE_TYPES = {
  IMAGE: ["image/jpeg", "image/png", "image/jpg"],
  DOC: ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
  ZIP: ["application/zip"],
};

export const DATE_FORMAT = "YYYY-MM-DD";
export const DATETIME_FORMAT = "YYYY-MM-DD HH:mm";
