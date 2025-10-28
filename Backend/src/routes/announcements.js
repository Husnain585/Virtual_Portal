// routes/announcements.js
import express from "express";
import {
  createAnnouncement,
  getAnnouncementsByCourse,
} from "../controllers/announcementController.js";
import { authenticateUser } from "../middleware/auth.js";

const router = express.Router();

router.post("/:courseId", authenticateUser, createAnnouncement);
router.get("/:courseId", authenticateUser, getAnnouncementsByCourse);

export default router;
