// src/api/dashboard.api.js
import axiosClient from "./axiosClient";

/**
 * 🔹 Get Admin Dashboard Data
 */
export const getAdminDashboard = async () => {
  try {
    const response = await axiosClient.get("/dashboard/admin");
    return response.data;
  } catch (error) {
    console.error("Error fetching admin dashboard:", error);
    throw error.response?.data || error.message;
  }
};

/**
 * 🔹 Get Teacher Dashboard Data
 */
export const getTeacherDashboard = async () => {
  try {
    const response = await axiosClient.get("/dashboard/teacher");
    return response.data;
  } catch (error) {
    console.error("Error fetching teacher dashboard:", error);
    throw error.response?.data || error.message;
  }
};

/**
 * 🔹 Get Student Dashboard Data
 */
export const getStudentDashboard = async () => {
  try {
    const response = await axiosClient.get("/dashboard/student");
    return response.data;
  } catch (error) {
    console.error("Error fetching student dashboard:", error);
    throw error.response?.data || error.message;
  }
};
