// src/api/assignment.api.js
import axiosClient from "./axiosClient";

/**
 * GET /api/courses/:courseId/assignments
 * params: pagination, maybe type etc.
 */
export async function getCourseAssignments(courseId, params = {}) {
  try {
    const res = await axiosClient.get(`/courses/${courseId}/assignments`, { params });
    return res.data;
  } catch (err) {
    throw err?.response?.data || err;
  }
}

/**
 * GET /api/assignments/:id
 */
export async function getAssignmentById(id) {
  try {
    const res = await axiosClient.get(`/assignments/${id}`);
    return res.data;
  } catch (err) {
    throw err?.response?.data || err;
  }
}

/**
 * POST /api/courses/:courseId/assignments
 * multipart/form-data: { title, description, dueDate, type, files[] }
 */
export async function createAssignment(courseId, formData) {
  try {
    const res = await axiosClient.post(`/courses/${courseId}/assignments`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (err) {
    throw err?.response?.data || err;
  }
}

/**
 * PUT /api/assignments/:id
 * accept either JSON or FormData if files may change
 */
export async function updateAssignment(id, payload, isFormData = false) {
  try {
    const opts = isFormData
      ? { headers: { "Content-Type": "multipart/form-data" } }
      : {};
    const res = await axiosClient.put(`/assignments/${id}`, payload, opts);
    return res.data;
  } catch (err) {
    throw err?.response?.data || err;
  }
}

/**
 * DELETE /api/assignments/:id
 */
export async function deleteAssignment(id) {
  try {
    const res = await axiosClient.delete(`/assignments/${id}`);
    return res.data;
  } catch (err) {
    throw err?.response?.data || err;
  }
}

/**
 * POST /api/assignments/:id/submit
 * multipart: { files[], comments }
 */
export async function submitAssignment(assignmentId, formData) {
  try {
    const res = await axiosClient.post(`/assignments/${assignmentId}/submit`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (err) {
    throw err?.response?.data || err;
  }
}

/**
 * GET /api/assignments/:id/submissions
 */
export async function getAssignmentSubmissions(assignmentId, params = {}) {
  try {
    const res = await axiosClient.get(`/assignments/${assignmentId}/submissions`, { params });
    return res.data;
  } catch (err) {
    throw err?.response?.data || err;
  }
}

/**
 * GET /api/assignments/:id/submissions/:studentId
 */
export async function getSubmissionByStudent(assignmentId, studentId) {
  try {
    const res = await axiosClient.get(`/assignments/${assignmentId}/submissions/${studentId}`);
    return res.data;
  } catch (err) {
    throw err?.response?.data || err;
  }
}

/**
 * POST /api/assignments/:id/submissions/:submissionId/grade
 * body: { score, maxScore, comments }
 */
export async function gradeSubmission(assignmentId, submissionId, payload) {
  try {
    const res = await axiosClient.post(
      `/assignments/${assignmentId}/submissions/${submissionId}/grade`,
      payload
    );
    return res.data;
  } catch (err) {
    throw err?.response?.data || err;
  }
}
