// src/pages/teacher/Assignments.jsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import Input from "../../components/common/Input";
import { createAssignment } from "../../api/assignment.api";
import { useToast } from "../../context/ToastContext";

const Assignments = () => {
  const { courseId } = useParams();
  const { data, refetch } = useFetch(`/api/courses/${courseId}/assignments`);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", dueDate: "" });
  const { success, error } = useToast();

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createAssignment(courseId, form);
      success("Assignment created");
      setModalOpen(false);
      refetch();
    } catch {
      error("Failed to create assignment");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Assignments</h1>
        <Button onClick={() => setModalOpen(true)}>Add Assignment</Button>
      </div>

      <div className="space-y-4">
        {data?.assignments?.map((a) => (
          <div key={a.id} className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-semibold">{a.title}</h3>
            <p className="text-gray-600">{a.description}</p>
            <p className="text-sm text-gray-500">Due: {a.dueDate}</p>
          </div>
        ))}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <form onSubmit={handleCreate} className="space-y-3">
          <Input
            label="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <Input
            label="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />
          <Input
            label="Due Date"
            type="date"
            value={form.dueDate}
            onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
            required
          />
          <Button type="submit" className="w-full">
            Create
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default Assignments;
