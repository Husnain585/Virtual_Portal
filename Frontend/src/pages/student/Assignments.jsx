import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const Assignments = () => {
  const { courseId } = useParams();
  const { data, loading } = useFetch(`/api/courses/${courseId}/assignments`);

  if (loading) return <p>Loading assignments...</p>;

  return (
    <div className="p-6 space-y-4">
      {data?.assignments?.map((a) => (
        <div key={a.id} className="bg-white rounded-xl shadow p-4">
          <h3 className="font-semibold">{a.title}</h3>
          <p className="text-gray-600">{a.description}</p>
          <p className="text-sm text-gray-500">Due: {a.dueDate}</p>
        </div>
      ))}
    </div>
  );
};

export default Assignments;
