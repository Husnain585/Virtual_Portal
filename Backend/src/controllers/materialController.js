// controllers/materialController.js
import { Course } from "../models/index.js";

export const uploadMaterial = async (req, res) => {
  try {
    const { courseId } = req.params;
    const file = req.file ? { filename: req.file.filename, filePath: req.file.path } : null;

    if (!file) return res.status(400).json({ message: "No file uploaded" });

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    course.materials.push(file);
    await course.save();

    res.status(201).json({ message: "Material uploaded", file });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMaterialsByCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    res.json(course.materials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
