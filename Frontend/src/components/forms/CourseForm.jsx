// src/components/forms/CourseForm.jsx
import React, { useState, useEffect } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import { createCourse, updateCourse } from "../../api/course.api";
import { useToast } from "../../context/ToastContext";

const CourseForm = ({ course, onSubmitSuccess }) => {
  const { success, error } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    code: "",
    creditHours: "",
    department: "",
    description: "",
    instructorId: ""
  });

  useEffect(() => {
    if (course) {
      setForm({
        name: course.name || "",
        code: course.code || "",
        creditHours: course.creditHours || "",
        department: course.department || "",
        description: course.description || "",
        instructorId: course.instructorId || ""
      });
    }
  }, [course]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (course) {
        await updateCourse(course.id, form);
        success("Course updated successfully");
      } else {
        await createCourse(form);
        success("Course created successfully");
      }
      
      onSubmitSuccess();
      setForm({
        name: "",
        code: "",
        creditHours: "",
        department: "",
        description: "",
        instructorId: ""
      });
    } catch (err) {
      error(err.message || "Failed to save course");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">
        {course ? "Edit Course" : "Create New Course"}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Course Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Enter course name"
          />
          <Input
            label="Course Code"
            name="code"
            value={form.code}
            onChange={handleChange}
            required
            placeholder="e.g., CS101"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Credit Hours"
            name="creditHours"
            type="number"
            value={form.creditHours}
            onChange={handleChange}
            required
            placeholder="e.g., 3"
          />
          <Input
            label="Department"
            name="department"
            value={form.department}
            onChange={handleChange}
            required
            placeholder="Enter department"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter course description"
          />
        </div>

        <Input
          label="Instructor ID"
          name="instructorId"
          value={form.instructorId}
          onChange={handleChange}
          placeholder="Enter instructor ID (optional)"
        />

        <div className="flex gap-3 pt-4">
          <Button
            type="submit"
            className="flex-1"
            disabled={loading}
          >
            {loading ? "Saving..." : course ? "Update Course" : "Create Course"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CourseForm;