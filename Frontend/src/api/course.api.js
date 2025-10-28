// src/api/course.api.js
import axiosClient from "./axiosClient";

/**
 * GET /api/courses
 * params: { department, instructorId, page, limit, q }
 */
export async function getCourses(params = {}) {
  try {
    const res = await axiosClient.get("/courses", { params });
    return res.data;
  } catch (err) {
    throw err?.response?.data || err;
  }
}

/**
 * GET /api/courses/:id
 */
export async function getCourseById(id) {
  try {
    const res = await axiosClient.get(`/courses/${id}`);
    return res.data;
  } catch (err) {
    throw err?.response?.data || err;
  }
}

/**
 * POST /api/courses
 * body: { name, code, creditHours, department, instructorId, description }
 * admin only
 */
export async function createCourse(payload) {
  try {
    const res = await axiosClient.post("/courses", payload);
    return res.data;
  } catch (err) {
    throw err?.response?.data || err;
  }
}

/**
 * PUT /api/courses/:id
 */
export async function updateCourse(id, payload) {
  try {
    const res = await axiosClient.put(`/courses/${id}`, payload);
    return res.data;
  } catch (err) {
    throw err?.response?.data || err;
  }
}

/**
 * DELETE /api/courses/:id
 */
export async function deleteCourse(id) {
  try {
    const res = await axiosClient.delete(`/courses/${id}`);
    return res.data;
  } catch (err) {
    throw err?.response?.data || err;
  }
}

/**
 * POST /api/courses/:id/enroll
 * body: { studentId } or empty if self-enroll
 */
export async function enrollCourse(courseId, payload = {}) {
  try {
    const res = await axiosClient.post(`/courses/${courseId}/enroll`, payload);
    return res.data;
  } catch (err) {
    throw err?.response?.data || err;
  }
}

/**
 * DELETE /api/courses/:id/enroll/:studentId
 */
export async function removeStudentFromCourse(courseId, studentId) {
  try {
    const res = await axiosClient.delete(`/courses/${courseId}/enroll/${studentId}`);
    return res.data;
  } catch (err) {
    throw err?.response?.data || err;
  }
}

/**
 * GET /api/courses/:id/students
 */
export async function getCourseStudents(courseId, params = {}) {
  try {
    const res = await axiosClient.get(`/courses/${courseId}/students`, { params });
    return res.data;
  } catch (err) {
    throw err?.response?.data || err;
  }
}

/**
 * POST /api/courses/:courseId/materials
 * file upload: FormData { files[], title?, description? }
 */
export async function uploadCourseMaterials(courseId, formData) {
  try {
    const res = await axiosClient.post(`/courses/${courseId}/materials`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (err) {
    throw err?.response?.data || err;
  }
}
