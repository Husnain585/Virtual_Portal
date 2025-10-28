// src/pages/teacher/Courses.jsx
import React from "react";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";

const Courses = () => {
  const { data, loading } = useFetch("/api/courses?instructorId=me");

  if (loading) return <p>Loading courses...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">My Courses</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.courses?.map((course) => (
          <Link
            to={`/teacher/courses/${course.id}`}
            key={course.id}
            className="block bg-white rounded-xl shadow hover:shadow-lg p-4 transition"
          >
            <h3 className="font-semibold text-lg">{course.name}</h3>
            <p className="text-sm text-gray-500">{course.code}</p>
            <p className="text-gray-600 mt-2">{course.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Courses;
