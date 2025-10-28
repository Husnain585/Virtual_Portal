// controllers/assignmentController.js
import { Assignment } from "../models/index.js";

export const createAssignment = async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;
    const { courseId } = req.params;
    const file = req.file ? { filename: req.file.filename, filePath: req.file.path } : null;

    const assignment = await Assignment.create({
      title,
      description,
      dueDate,
      course: courseId,
      file,
    });

    res.status(201).json({ message: "Assignment created", assignment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAssignmentsByCourse = async (req, res) => {
  try {
    const assignments = await Assignment.find({ course: req.params.courseId });
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAssignmentById = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) return res.status(404).json({ message: "Not found" });
    res.json(assignment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAssignment = async (req, res) => {
  try {
    await Assignment.findByIdAndDelete(req.params.id);
    res.json({ message: "Assignment deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
