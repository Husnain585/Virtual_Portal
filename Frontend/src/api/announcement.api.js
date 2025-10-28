// src/api/announcement.api.js
import axiosClient from "./axiosClient";

/**
 * GET /api/announcements
 * params: ?targetRole=&page=&limit=&active=true
 */
export async function getAnnouncements(params = {}) {
  try {
    const res = await axiosClient.get("/announcements", { params });
    return res.data;
  } catch (err) {
    throw err?.response?.data || err;
  }
}

/**
 * POST /api/announcements
 * body: { title, body, targetRoles: [], startDate, endDate }
 */
export async function createAnnouncement(payload) {
  try {
    const res = await axiosClient.post("/announcements", payload);
    return res.data;
  } catch (err) {
    throw err?.response?.data || err;
  }
}

/**
 * PUT /api/announcements/:id
 */
export async function updateAnnouncement(id, payload) {
  try {
    const res = await axiosClient.put(`/announcements/${id}`, payload);
    return res.data;
  } catch (err) {
    throw err?.response?.data || err;
  }
}

/**
 * DELETE /api/announcements/:id
 */
export async function deleteAnnouncement(id) {
  try {
    const res = await axiosClient.delete(`/announcements/${id}`);
    return res.data;
  } catch (err) {
    throw err?.response?.data || err;
  }
}
