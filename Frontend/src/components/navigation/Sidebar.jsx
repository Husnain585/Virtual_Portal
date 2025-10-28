// src/layout/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  BookOpen,
  Users,
  ClipboardList,
  BarChart,
  LogOut,
} from "lucide-react";

const Sidebar = ({ onLogout }) => {
  const menu = [
    { to: "/dashboard", icon: <Home size={18} />, label: "Dashboard" },
    { to: "/courses", icon: <BookOpen size={18} />, label: "Courses" },
    { to: "/assignments", icon: <ClipboardList size={18} />, label: "Assignments" },
    { to: "/students", icon: <Users size={18} />, label: "Users" },
    { to: "/reports", icon: <BarChart size={18} />, label: "Reports" },
  ];

  return (
    <aside className="w-64 bg-white border-r h-screen fixed left-0 top-0 flex flex-col">
      <div className="p-4 border-b font-semibold text-lg text-blue-700">
        Dashboard
      </div>

      <nav className="flex-1 overflow-y-auto">
        {menu.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-blue-50 transition ${
                isActive ? "bg-blue-100 text-blue-600 font-semibold" : ""
              }`
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t p-3">
        <button
          onClick={onLogout}
          className="flex items-center gap-2 px-3 py-2 w-full text-left text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
