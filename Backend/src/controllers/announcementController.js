// controllers/announcementController.js
import { Announcement } from "../models/index.js";

export const createAnnouncement = async (req, res) => {
  try {
    const { title, content } = req.body;
    const { courseId } = req.params;

    const announcement = await Announcement.create({
      course: courseId,
      title,
      content,
      createdBy: req.user.id,
    });

    res.status(201).json({ message: "Announcement created", announcement });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAnnouncementsByCourse = async (req, res) => {
  try {
    const announcements = await Announcement.find({ course: req.params.courseId });
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
