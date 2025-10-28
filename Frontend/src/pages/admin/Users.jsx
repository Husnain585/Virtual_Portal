// src/pages/admin/Users.jsx
import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import useDebounce from "../../hooks/useDebounce";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { deleteUser } from "../../api/user.api";
import { useToast } from "../../context/ToastContext";

const Users = () => {
  const [search, setSearch] = useState("");
  const debounced = useDebounce(search, 400);
  const { data, loading, refetch } = useFetch(`/api/users?search=${debounced}`);
  const { success, error } = useToast();

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      success("User deleted");
      refetch();
    } catch (err) {
      error("Failed to delete user");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">User Management</h1>
      <Input
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4"
      />
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Role</th>
              <th className="py-2 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {data?.users?.map((user) => (
              <tr key={user.id} className="border-t hover:bg-gray-50">
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4 capitalize">{user.role}</td>
                <td className="py-2 px-4 text-right">
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Users;
