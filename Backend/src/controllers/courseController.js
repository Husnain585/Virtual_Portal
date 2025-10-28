// controllers/courseController.js
import { Course, User } from "../models/index.js";

// Create a course
export const createCourse = async (req, res) => {
  try {
    const { title, description } = req.body;
    const course = await Course.create({
      title,
      description,
      instructor: req.user.id,
    });
    res.status(201).json({ message: "Course created", course });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all courses
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("instructor", "name email");
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single course
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate("instructor students", "name email");
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update course
export const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete course
export const deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: "Course deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Enroll student in a course
export const enrollCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    const user = await User.findById(req.user.id);

    if (!course || !user) return res.status(404).json({ message: "Not found" });

    if (course.students.includes(user._id))
      return res.status(400).json({ message: "Already enrolled" });

    course.students.push(user._id);
    user.enrolledCourses.push(course._id);

    await course.save();
    await user.save();

    res.json({ message: "Enrollment successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
