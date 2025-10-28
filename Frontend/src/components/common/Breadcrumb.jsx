// src/common/Breadcrumb.jsx
import React from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ items = [] }) => {
  return (
    <nav className="flex items-center text-sm text-gray-500">
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center">
          {item.path ? (
            <Link to={item.path} className="hover:text-blue-600">
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-700 font-medium">{item.label}</span>
          )}
          {idx < items.length - 1 && (
            <ChevronRight size={16} className="mx-1 text-gray-400" />
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;
