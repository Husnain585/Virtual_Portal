import React from "react";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";

const Courses = () => {
  const { data, loading } = useFetch("/api/courses?enrolled=true");

  if (loading) return <p>Loading courses...</p>;

  return (
    <div className="p-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {data?.courses?.map((course) => (
        <Link
          to={`/student/courses/${course.id}`}
          key={course.id}
          className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition"
        >
          <h3 className="font-semibold">{course.name}</h3>
          <p className="text-gray-500 text-sm">{course.code}</p>
        </Link>
      ))}
    </div>
  );
};

export default Courses;
