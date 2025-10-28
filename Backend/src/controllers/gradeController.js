// controllers/gradeController.js
import { Grade } from "../models/index.js";

export const addGrade = async (req, res) => {
  try {
    const { submission, student, score, feedback } = req.body;
    const grade = await Grade.create({ submission, student, score, feedback });
    res.status(201).json({ message: "Grade assigned", grade });
  } catch (error) {
    res.status(500).json({ message: error.message });
  } 
};

export const getGradesByStudent = async (req, res) => {
  try {
    const grades = await Grade.find({ student: req.params.studentId }).populate("submission");
    res.json(grades);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
