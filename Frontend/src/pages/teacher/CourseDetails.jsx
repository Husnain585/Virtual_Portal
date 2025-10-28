// src/pages/teacher/CourseDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCourseById } from "../../api/course.api";
import Button from "../../components/common/Button";

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      const res = await getCourseById(id);
      setCourse(res);
    };
    fetchCourse();
  }, [id]);

  if (!course) return <p>Loading course...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{course.name}</h1>
      <p className="text-gray-600 mt-1">{course.description}</p>

      <div className="mt-6 flex gap-4">
        <Link to={`/teacher/courses/${id}/assignments`}>
          <Button>View Assignments</Button>
        </Link>
        <Link to={`/teacher/courses/${id}/grades`}>
          <Button variant="outline">View Grades</Button>
        </Link>
        <Link to={`/teacher/courses/${id}/submissions`}>
          <Button variant="outline">Submissions</Button>
        </Link>
      </div>
    </div>
  );
};

export default CourseDetails;
