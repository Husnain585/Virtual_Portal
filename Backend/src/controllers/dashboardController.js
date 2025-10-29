// controllers/dashboardController.js
import { Course, Assignment, Submission, User } from "../models/index.js";

// Generic dashboard (existing)
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

// Student dashboard
export const getStudentDashboard = async (req, res) => {
  try {
    const studentId = req.user.id;
    
    // Get student-specific data
    const enrolledCourses = await Course.countDocuments({ 
      enrolledStudents: studentId 
    });
    
    const pendingAssignments = await Assignment.countDocuments({
      course: { $in: await Course.find({ enrolledStudents: studentId }).select('_id') },
      dueDate: { $gte: new Date() }
    });
    
    const submittedAssignments = await Submission.countDocuments({
      student: studentId
    });

    const recentAssignments = await Assignment.find({
      course: { $in: await Course.find({ enrolledStudents: studentId }).select('_id') }
    })
    .populate('course', 'name')
    .sort({ dueDate: 1 })
    .limit(5);

    res.json({
      stats: {
        enrolledCourses,
        pendingAssignments,
        submittedAssignments
      },
      recentAssignments
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Teacher dashboard
export const getTeacherDashboard = async (req, res) => {
  try {
    const teacherId = req.user.id;
    
    const myCourses = await Course.countDocuments({ instructor: teacherId });
    const totalAssignments = await Assignment.countDocuments({
      course: { $in: await Course.find({ instructor: teacherId }).select('_id') }
    });
    const pendingSubmissions = await Submission.countDocuments({
      assignment: { $in: await Assignment.find({ 
        course: { $in: await Course.find({ instructor: teacherId }).select('_id') }
      }).select('_id') },
      graded: false
    });

    res.json({
      stats: {
        myCourses,
        totalAssignments,
        pendingSubmissions
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin dashboard
export const getAdminDashboard = async (req, res) => {
  try {
    const totalCourses = await Course.countDocuments();
    const totalAssignments = await Assignment.countDocuments();
    const totalSubmissions = await Submission.countDocuments();
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalTeachers = await User.countDocuments({ role: 'teacher' });
    const totalAdmins = await User.countDocuments({ role: 'admin' });

    res.json({
      stats: {
        totalCourses,
        totalAssignments,
        totalSubmissions,
        totalStudents,
        totalTeachers,
        totalAdmins
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};