// utils/fileUpload.js
import fs from "fs";
import path from "path";

/**
 * Build a public file URL
 */
export const getFileUrl = (req, filePath) => {
  return `${req.protocol}://${req.get("host")}/${filePath}`;
};

/**
 * Delete file from disk safely
 */
export const deleteFile = (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`🗑️ Deleted file: ${filePath}`);
    }
  } catch (error) {
    console.error("Error deleting file:", error.message);
  }
};
