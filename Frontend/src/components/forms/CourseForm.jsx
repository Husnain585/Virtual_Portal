// src/forms/CourseForm.jsx
import React, { useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import Loader from "../common/Loader";
import { createCourse, updateCourse } from "../../api/course.api";

const CourseForm = ({ initialData = {}, onSubmitSuccess }) => {
  const isEditing = !!initialData?.id;
  const [form, setForm] = useState({
    name: initialData.name || "",
    code: initialData.code || "",
    creditHours: initialData.creditHours || "",
    department: initialData.department || "",
    instructorId: initialData.instructorId || "",
    description: initialData.description || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = isEditing
        ? await updateCourse(initialData.id, form)
        : await createCourse(form);
      onSubmitSuccess && onSubmitSuccess(res);
    } catch (err) {
      setError(err?.message || "Failed to save course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-md w-full max-w-lg mx-auto"
    >
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        {isEditing ? "Edit Course" : "Create Course"}
      </h2>
      <Input
        label="Course Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <Input
        label="Course Code"
        name="code"
        value={form.code}
        onChange={handleChange}
        required
        className="mt-3"
      />
      <div className="grid grid-cols-2 gap-3 mt-3">
        <Input
          label="Credit Hours"
          name="creditHours"
          type="number"
          value={form.creditHours}
          onChange={handleChange}
          required
        />
        <Input
          label="Department"
          name="department"
          value={form.department}
          onChange={handleChange}
          required
        />
      </div>
      <Input
        label="Instructor ID"
        name="instructorId"
        value={form.instructorId}
        onChange={handleChange}
        required
        className="mt-3"
      />
      <div className="mt-3">
        <label className="text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      <Button type="submit" className="w-full mt-4" disabled={loading}>
        {loading ? <Loader size={5} /> : isEditing ? "Update Course" : "Create Course"}
      </Button>
    </form>
  );
};

export default CourseForm;
