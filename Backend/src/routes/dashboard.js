// routes/dashboard.js
import express from "express";
import { getDashboardData } from "../controllers/dashboardController.js";
import { authenticateUser } from "../middleware/auth.js";

const router = express.Router();

router.get("/", authenticateUser, getDashboardData);

export default router;
