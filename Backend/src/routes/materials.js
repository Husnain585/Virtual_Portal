// routes/materials.js
import express from "express";
import { uploadMaterial, getMaterialsByCourse } from "../controllers/materialController.js";
import { isAuthenticatedUser } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.post("/:courseId", isAuthenticatedUser, upload.single("file"), uploadMaterial);
router.get("/:courseId", isAuthenticatedUser, getMaterialsByCourse);

export default router;
