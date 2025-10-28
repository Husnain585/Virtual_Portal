// src/pages/admin/Announcements.jsx
import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Modal from "../../components/common/Modal";
import { createAnnouncement, deleteAnnouncement } from "../../api/announcement.api";
import { useToast } from "../../context/ToastContext";

const Announcements = () => {
  const { data, refetch } = useFetch("/api/announcements");
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ title: "", body: "" });
  const { success, error } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAnnouncement(form);
      success("Announcement published");
      refetch();
      setModalOpen(false);
    } catch {
      error("Failed to create announcement");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAnnouncement(id);
      success("Announcement removed");
      refetch();
    } catch {
      error("Delete failed");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-semibold">Announcements</h1>
        <Button onClick={() => setModalOpen(true)}>New Announcement</Button>
      </div>

      <div className="space-y-4">
        {data?.announcements?.map((a) => (
          <div
            key={a.id}
            className="bg-white rounded-xl shadow p-4 flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold text-gray-800">{a.title}</h3>
              <p className="text-gray-600 text-sm">{a.body}</p>
            </div>
            <Button variant="danger" size="sm" onClick={() => handleDelete(a.id)}>
              Delete
            </Button>
          </div>
        ))}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <form onSubmit={handleSubmit} className="space-y-3 p-4">
          <Input
            label="Title"
            name="title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <Input
            label="Body"
            name="body"
            value={form.body}
            onChange={(e) => setForm({ ...form, body: e.target.value })}
            required
          />
          <Button type="submit" className="w-full">
            Publish
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default Announcements;
