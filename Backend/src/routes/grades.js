// routes/grades.js
import express from "express";
import { addGrade, getGradesByStudent } from "../controllers/gradeController.js";
import { authenticateUser } from "../middleware/auth.js";

const router = express.Router();

router.post("/", authenticateUser, addGrade);
router.get("/student/:studentId", authenticateUser, getGradesByStudent);

export default router;
