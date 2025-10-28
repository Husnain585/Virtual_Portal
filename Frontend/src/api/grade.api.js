// src/api/grade.api.js
import axiosClient from "./axiosClient";

/**
 * GET /api/students/:studentId/grades
 */
export async function getStudentGrades(studentId, params = {}) {
  try {
    const res = await axiosClient.get(`/students/${studentId}/grades`, { params });
    return res.data;
  } catch (err) {
    throw err?.response?.data || err;
  }
}

/**
 * GET /api/courses/:courseId/grades
 */
export async function getCourseGrades(courseId, params = {}) {
  try {
    const res = await axiosClient.get(`/courses/${courseId}/grades`, { params });
    return res.data;
  } catch (err) {
    throw err?.response?.data || err;
  }
}

/**
 * PUT /api/grades/:gradeId
 */
export async function updateGrade(gradeId, payload) {
  try {
    const res = await axiosClient.put(`/grades/${gradeId}`, payload);
    return res.data;
  } catch (err) {
    throw err?.response?.data || err;
  }
}
