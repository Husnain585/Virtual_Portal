// middleware/upload.js
import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = "uploads/";

    // Determine subfolder based on route or request context
    if (req.baseUrl.includes("assignments")) folder += "assignments/";
    else if (req.baseUrl.includes("submissions")) folder += "submissions/";
    else if (req.baseUrl.includes("materials")) folder += "materials/";

    // Create folder if it doesn't exist
    fs.mkdirSync(folder, { recursive: true });

    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(
      file.originalname
    )}`;
    cb(null, uniqueName);
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowed = [".pdf", ".doc", ".docx", ".ppt", ".pptx", ".zip", ".jpg", ".png"];
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowed.includes(ext)) {
      return cb(new Error("Invalid file type"));
    }
    cb(null, true);
  },
});
