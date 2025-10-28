// routes/auth.js
import express from "express";
import { register, login, logout, getProfile } from "../controllers/authController.js";
import { validateRequest } from "../middleware/validation.js";
import { registerSchema, loginSchema } from "../validations/authValidation.js";
import { authenticateUser } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", validateRequest(registerSchema), register);
router.post("/login", validateRequest(loginSchema), login);
router.post("/logout", authenticateUser, logout);
router.get("/profile", authenticateUser, getProfile);

export default router;
