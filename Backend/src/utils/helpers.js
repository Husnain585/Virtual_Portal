// utils/helpers.js

/**
 * Format a standard API response
 */
export const sendResponse = (res, status, message, data = null) => {
  const payload = { message };
  if (data) payload.data = data;
  return res.status(status).json(payload);
};

/**
 * Async error handler for controllers
 * Usage: wrap controller functions to catch errors without try/catch
 */
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

/**
 * Role-based access control
 */
export const checkRole = (roles = []) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};
