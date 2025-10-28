// src/routes/AppRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoutes";
import RoleRoutes from "./RoleRoute";

// 🌐 Public pages
import Home from "../pages/Home";
import About from "../pages/About";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";

// 👩‍💼 Admin pages
import AdminDashboard from "../pages/admin/Dashboard";
import AdminUsers from "../pages/admin/Users";
import AdminCourses from "../pages/admin/Courses";
import AdminAnnouncements from "../pages/admin/Announcements";
import AdminSettings from "../pages/admin/Settings";

// 👨‍🏫 Teacher pages
import TeacherDashboard from "../pages/teacher/Dashboard";
import TeacherCourses from "../pages/teacher/Courses";
import TeacherCourseDetails from "../pages/teacher/CourseDetails";
import TeacherAssignments from "../pages/teacher/Assignments";
import TeacherSubmissions from "../pages/teacher/Submissions";
import TeacherGrades from "../pages/teacher/Grades";

// 🎓 Student pages
import StudentDashboard from "../pages/student/Dashboard";
import StudentCourses from "../pages/student/Courses";
import StudentCourseDetails from "../pages/student/CourseDetails";
import StudentAssignments from "../pages/student/Assignments";
import StudentGrades from "../pages/student/Grades";
import StudentProfile from "../pages/student/Profile";

const AppRoutes = () => {
  return (
    <Routes>
      {/* 🌐 Public */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* 🔐 Protected Routes */}
      <Route element={<ProtectedRoute />}>
        {/* 🧑‍💼 Admin */}
        <Route
          path="/admin/*"
          element={
            <RoleRoutes role="admin">
              <Routes>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="courses" element={<AdminCourses />} />
                <Route path="announcements" element={<AdminAnnouncements />} />
                <Route path="settings" element={<AdminSettings />} />
              </Routes>
            </RoleRoutes>
          }
        />

        {/* 👨‍🏫 Teacher */}
        <Route
          path="/teacher/*"
          element={
            <RoleRoutes role="teacher">
              <Routes>
                <Route path="dashboard" element={<TeacherDashboard />} />
                <Route path="courses" element={<TeacherCourses />} />
                <Route path="courses/:id" element={<TeacherCourseDetails />} />
                <Route path="assignments" element={<TeacherAssignments />} />
                <Route path="submissions" element={<TeacherSubmissions />} />
                <Route path="grades" element={<TeacherGrades />} />
              </Routes>
            </RoleRoutes>
          }
        />

        {/* 🎓 Student */}
        <Route
          path="/student/*"
          element={
            <RoleRoutes role="student">
              <Routes>
                <Route path="dashboard" element={<StudentDashboard />} />
                <Route path="courses" element={<StudentCourses />} />
                <Route path="courses/:id" element={<StudentCourseDetails />} />
                <Route path="assignments" element={<StudentAssignments />} />
                <Route path="grades" element={<StudentGrades />} />
                <Route path="profile" element={<StudentProfile />} />
              </Routes>
            </RoleRoutes>
          }
        />
      </Route>

      {/* ❌ Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
