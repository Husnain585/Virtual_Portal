// routes/courses.js
import express from "express";
import {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  enrollCourse,
} from "../controllers/courseController.js";
import { authenticateUser } from "../middleware/auth.js";
import { validateRequest } from "../middleware/validation.js";
import { courseSchema } from "../validations/courseValidation.js";

const router = express.Router();

router.post("/", authenticateUser, validateRequest(courseSchema), createCourse);
router.get("/", authenticateUser, getAllCourses);
router.get("/:id", authenticateUser, getCourseById);
router.put("/:id", authenticateUser, updateCourse);
router.delete("/:id", authenticateUser, deleteCourse);

// Student enrollment
router.post("/:id/enroll", authenticateUser, enrollCourse);

export default router;
