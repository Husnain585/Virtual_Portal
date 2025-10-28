// src/pages/admin/Settings.jsx
import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../hooks/useAuth";
import Button from "../../components/common/Button";

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Settings</h1>

      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold mb-2">Profile</h2>
        <p>
          <strong>Name:</strong> {user?.name}
        </p>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
        <Button onClick={logout} variant="danger" className="mt-3">
          Logout
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold mb-2">Appearance</h2>
        <p>Current theme: {theme}</p>
        <Button onClick={toggleTheme} className="mt-2">
          Toggle Theme
        </Button>
      </div>
    </div>
  );
};

export default Settings;
