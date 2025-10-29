// src/components/forms/UserForm.jsx
import React, { useState, useEffect } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import { createUser, updateUser } from "../../api/user.api";
import { useToast } from "../../context/ToastContext";

const UserForm = ({ user, onSubmitSuccess }) => {
  const { success, error } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "student",
    department: ""
  });

  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        password: "", // Don't pre-fill password for security
        role: user.role || "student",
        department: user.department || ""
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (user) {
        // Update existing user
        const updateData = { ...form };
        // Don't send password if it's empty (not changing)
        if (!updateData.password) {
          delete updateData.password;
        }
        await updateUser(user.id, updateData);
        success("User updated successfully");
      } else {
        // Create new user
        await createUser(form);
        success("User created successfully");
      }
      
      onSubmitSuccess();
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "student",
        department: ""
      });
    } catch (err) {
      error(err.message || "Failed to save user");
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
        {user ? "Edit User" : "Create New User"}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="First Name"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            required
            placeholder="Enter first name"
          />
          <Input
            label="Last Name"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            required
            placeholder="Enter last name"
          />
        </div>

        <Input
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          placeholder="Enter email address"
        />

        <Input
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required={!user} // Password required only for new users
          placeholder={user ? "Leave blank to keep current password" : "Enter password"}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <Input
            label="Department"
            name="department"
            value={form.department}
            onChange={handleChange}
            placeholder="Enter department (optional)"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            type="submit"
            className="flex-1"
            disabled={loading}
          >
            {loading ? "Saving..." : user ? "Update User" : "Create User"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;