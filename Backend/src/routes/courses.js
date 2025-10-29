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
import { isAuthenticatedUser } from "../middleware/auth.js";
import { validateRequest } from "../middleware/validation.js";
import { courseSchema } from "../validations/courseValidation.js";

const router = express.Router();

router.post("/", isAuthenticatedUser, validateRequest(courseSchema), createCourse);
router.get("/", isAuthenticatedUser, getAllCourses);
router.get("/:id", isAuthenticatedUser, getCourseById);
router.put("/:id", isAuthenticatedUser, updateCourse);
router.delete("/:id",isAuthenticatedUser, deleteCourse);

// Student enrollment
router.post("/:id/enroll", isAuthenticatedUser, enrollCourse);

export default router;
