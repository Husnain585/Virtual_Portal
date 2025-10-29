// routes/dashboard.js
import express from "express";
import { 
  getDashboardData,
  getStudentDashboard,
  getTeacherDashboard,
  getAdminDashboard 
} from "../controllers/dashboardController.js";
import { isAuthenticatedUser } from "../middleware/auth.js";

const router = express.Router();

// Generic dashboard (keep existing)
router.get("/", isAuthenticatedUser, getDashboardData);

// Role-specific dashboards
router.get("/student", isAuthenticatedUser, getStudentDashboard);
router.get("/teacher", isAuthenticatedUser, getTeacherDashboard);
router.get("/admin", isAuthenticatedUser, getAdminDashboard);

export default router;