// src/services/fileUpload.service.js
import axiosClient from "../api/axiosClient";

const fileUploadService = {
  uploadFile: async (url, file, additionalData = {}) => {
    const formData = new FormData();
    formData.append("file", file);

    Object.keys(additionalData).forEach((key) => {
      formData.append(key, additionalData[key]);
    });

    const response = await axiosClient.post(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  },

  uploadMultiple: async (url, files, additionalData = {}) => {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("files", file);
    });

    Object.keys(additionalData).forEach((key) => {
      formData.append(key, additionalData[key]);
    });

    const response = await axiosClient.post(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  },
};

export default fileUploadService;
