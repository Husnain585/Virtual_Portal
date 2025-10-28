// routes/materials.js
import express from "express";
import { uploadMaterial, getMaterialsByCourse } from "../controllers/materialController.js";
import { authenticateUser } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.post("/:courseId", authenticateUser, upload.single("file"), uploadMaterial);
router.get("/:courseId", authenticateUser, getMaterialsByCourse);

export default router;
