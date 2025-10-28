// src/pages/teacher/Grades.jsx
import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const Grades = () => {
  const { courseId } = useParams();
  const { data, loading } = useFetch(`/api/courses/${courseId}/grades`);

  if (loading) return <p>Loading grades...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Grades</h1>
      <table className="min-w-full bg-white rounded-lg shadow">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="py-2 px-4 text-left">Student</th>
            <th className="py-2 px-4 text-left">Assignment</th>
            <th className="py-2 px-4 text-left">Score</th>
          </tr>
        </thead>
        <tbody>
          {data?.grades?.map((g) => (
            <tr key={g.id} className="border-t hover:bg-gray-50">
              <td className="py-2 px-4">{g.studentName}</td>
              <td className="py-2 px-4">{g.assignmentTitle}</td>
              <td className="py-2 px-4">
                {g.score}/{g.maxScore}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Grades;
