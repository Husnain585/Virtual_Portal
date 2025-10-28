// routes/assignments.js
import express from "express";
import {
  createAssignment,
  getAssignmentsByCourse,
  getAssignmentById,
  deleteAssignment,
} from "../controllers/assignmentController.js";
import { authenticateUser } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";
import { validateRequest } from "../middleware/validation.js";
import { assignmentSchema } from "../validations/assignmentValidation.js";

const router = express.Router();

router.post(
  "/:courseId",
  authenticateUser,
  upload.single("file"),
  validateRequest(assignmentSchema),
  createAssignment
);

router.get("/course/:courseId", authenticateUser, getAssignmentsByCourse);
router.get("/:id", authenticateUser, getAssignmentById);
router.delete("/:id", authenticateUser, deleteAssignment);

export default router;
