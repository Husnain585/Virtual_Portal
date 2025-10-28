import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCourseById } from "../../api/course.api";
import Button from "../../components/common/Button";

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    getCourseById(id).then(setCourse);
  }, [id]);

  if (!course) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{course.name}</h1>
      <p className="text-gray-600">{course.description}</p>

      <div className="mt-6 flex gap-4">
        <Link to={`/student/courses/${id}/assignments`}>
          <Button>Assignments</Button>
        </Link>
        <Link to={`/student/courses/${id}/grades`}>
          <Button variant="outline">Grades</Button>
        </Link>
      </div>
    </div>
  );
};

export default CourseDetails;
