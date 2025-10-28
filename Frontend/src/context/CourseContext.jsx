// src/contexts/CourseContext.jsx
import React, { createContext, useState } from "react";
import {
  getCoursesAPI,
  getCourseByIdAPI,
  enrollInCourseAPI,
  deleteCourseAPI,
} from "../api/course.api";

export const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCourses = async (query = {}) => {
    setLoading(true);
    try {
      const data = await getCoursesAPI(query);
      setCourses(data);
    } finally {
      setLoading(false);
    }
  };

  const fetchCourse = async (id) => {
    setLoading(true);
    try {
      const data = await getCourseByIdAPI(id);
      setCurrentCourse(data);
    } finally {
      setLoading(false);
    }
  };

  const enrollCourse = async (courseId, studentId) => {
    const data = await enrollInCourseAPI(courseId, { studentId });
    return data;
  };

  const removeCourse = async (id) => {
    await deleteCourseAPI(id);
    setCourses((prev) => prev.filter((c) => c._id !== id));
  };

  return (
    <CourseContext.Provider
      value={{
        courses,
        currentCourse,
        loading,
        fetchCourses,
        fetchCourse,
        enrollCourse,
        removeCourse,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};
