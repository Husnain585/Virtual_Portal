// routes/assignments.js
import express from "express";
import {
  createAssignment,
  getAssignmentsByCourse,
  getAssignmentById,
  deleteAssignment,
} from "../controllers/assignmentController.js";
import { isAuthenticatedUser } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";
import { validateRequest } from "../middleware/validation.js";
import { assignmentSchema } from "../validations/assignmentValidation.js";

const router = express.Router();

router.post(
  "/:courseId",
  isAuthenticatedUser,
  upload.single("file"),
  validateRequest(assignmentSchema),
  createAssignment
);

router.get("/course/:courseId", isAuthenticatedUser, getAssignmentsByCourse);
router.get("/:id", isAuthenticatedUser, getAssignmentById);
router.delete("/:id", isAuthenticatedUser, deleteAssignment);

export default router;
