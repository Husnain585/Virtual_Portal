// src/pages/admin/Courses.jsx
import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import CourseForm from "../../components/forms/CourseForm";
import Modal from "../../components/common/Modal";
import Button from "../../components/common/Button";
import { deleteCourse } from "../../api/course.api";
import { useToast } from "../../context/ToastContext";

const Courses = () => {
  const { data, loading, refetch } = useFetch("/api/courses");
  const [showModal, setShowModal] = useState(false);
  const { success, error } = useToast();

  const handleDelete = async (id) => {
    try {
      await deleteCourse(id);
      success("Course deleted");
      refetch();
    } catch {
      error("Failed to delete course");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-semibold">Courses</h1>
        <Button onClick={() => setShowModal(true)}>Add Course</Button>
      </div>
      {loading ? (
        <p>Loading courses...</p>
      ) : (
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Code</th>
              <th className="py-2 px-4 text-left">Department</th>
              <th className="py-2 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {data?.courses?.map((course) => (
              <tr key={course.id} className="border-t hover:bg-gray-50">
                <td className="py-2 px-4">{course.name}</td>
                <td className="py-2 px-4">{course.code}</td>
                <td className="py-2 px-4">{course.department}</td>
                <td className="py-2 px-4 text-right">
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(course.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <CourseForm
          onSubmitSuccess={() => {
            refetch();
            setShowModal(false);
          }}
        />
      </Modal>
    </div>
  );
};

export default Courses;
