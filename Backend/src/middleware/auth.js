// middleware/auth.js
import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwt.js";

export const authenticateUser = (req, res, next) => {
  try {
    const token =
      req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, jwtConfig.secret);
    req.user = decoded; // attach user data to request object
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};
