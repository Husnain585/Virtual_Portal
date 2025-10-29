// routes/announcements.js
import express from "express";
import {
  createAnnouncement,
  getAnnouncementsByCourse,
} from "../controllers/announcementController.js";
import { isAuthenticatedUser } from "../middleware/auth.js";

const router = express.Router();

router.post("/:courseId", isAuthenticatedUser, createAnnouncement);
router.get("/:courseId", isAuthenticatedUser, getAnnouncementsByCourse);

export default router;
