// app.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

// Config imports
import connectDB from "./src/config/database.js";

// Route imports
import authRoutes from "./src/routes/auth.js";
import userRoutes from "./src/routes/users.js";
import courseRoutes from "./src/routes/courses.js";
import assignmentRoutes from "./src/routes/assignments.js";
import gradeRoutes from "./src/routes/grades.js";
import dashboardRoutes from "./src/routes/dashboard.js";
import announcementRoutes from "./src/routes/announcements.js";
import materialRoutes from "./src/routes/materials.js";

dotenv.config();

const app = express();

// Required for using __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ------------------ MIDDLEWARES ------------------

// Body parsers
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware's 
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: true,
    credentials: true,
}));

// Static file serving (for uploaded files)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ------------------ DATABASE ------------------
connectDB();

// ------------------ ROUTES ------------------
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/grades", gradeRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/materials", materialRoutes);

// ------------------ ERROR HANDLING ------------------

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err.stack);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// ------------------ SERVER ------------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
