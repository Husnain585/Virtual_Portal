// config/jwt.js
import dotenv from "dotenv";
dotenv.config();

export const jwtConfig = {
  secret: process.env.JWT_SECRET || "supersecretkey",
  expiresIn: process.env.JWT_EXPIRES_IN || "7d",
};
