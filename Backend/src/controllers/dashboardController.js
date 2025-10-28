// controllers/dashboardController.js
import { Course, Assignment, Submission } from "../models/index.js";

export const getDashboardData = async (req, res) => {
  try {
    const totalCourses = await Course.countDocuments();
    const totalAssignments = await Assignment.countDocuments();
    const totalSubmissions = await Submission.countDocuments();

    res.json({
      stats: { totalCourses, totalAssignments, totalSubmissions },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
