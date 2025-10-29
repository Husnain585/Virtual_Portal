// routes/grades.js
import express from "express";
import { addGrade, getGradesByStudent } from "../controllers/gradeController.js";
import { isAuthenticatedUser } from "../middleware/auth.js";

const router = express.Router();

router.post("/", isAuthenticatedUser, addGrade);
router.get("/student/:studentId", isAuthenticatedUser, getGradesByStudent);

export default router;
