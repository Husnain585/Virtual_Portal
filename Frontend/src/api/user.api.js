// src/api/user.api.js
import axiosClient from "./axiosClient";

/**
 * GET /api/users
 * Query: ?role=&search=&page=&limit=
 */
export async function getUsers(params = {}) {
  try {
    const res = await axiosClient.get("/users", { params });
    return res.data;
  } catch (err) {
    throw err?.response?.data || err;
  }
}

/**
 * GET /api/users/:id
 */
export async function getUserById(id) {
  try {
    const res = await axiosClient.get(`/users/${id}`);
    return res.data;
  } catch (err) {
    throw err?.response?.data || err;
  }
}

/**
 * POST /api/users
 * Create user (admin)
 * body: { firstName, lastName, email, role, password }
 */
export async function createUser(payload) {
  try {
    const res = await axiosClient.post("/users", payload);
    return res.data;
  } catch (err) {
    throw err?.response?.data || err;
  }
}

/**
 * PUT /api/users/:id
 * Update user
 */
export async function updateUser(id, payload) {
  try {
    const res = await axiosClient.put(`/users/${id}`, payload);
    return res.data;
  } catch (err) {
    throw err?.response?.data || err;
  }
}

/**
 * DELETE /api/users/:id
 */
export async function deleteUser(id) {
  try {
    const res = await axiosClient.delete(`/users/${id}`);
    return res.data;
  } catch (err) {
    throw err?.response?.data || err;
  }
}

/**
 * PUT /api/users/:id/change-password
 * body: { oldPassword, newPassword } or { newPassword } depending on API
 */
export async function changeUserPassword(id, payload) {
  try {
    const res = await axiosClient.put(`/users/${id}/change-password`, payload);
    return res.data;
  } catch (err) {
    throw err?.response?.data || err;
  }
}
