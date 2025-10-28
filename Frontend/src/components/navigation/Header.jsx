// src/layout/Header.jsx
import React from "react";
import Breadcrumb from "../common/Breadcrumb";
import Button from "../common/Button";

const Header = ({ title, breadcrumbItems = [], actionLabel, onAction }) => {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b bg-white px-6 py-4">
      <div>
        {breadcrumbItems.length > 0 && (
          <Breadcrumb items={breadcrumbItems} />
        )}
        <h1 className="text-2xl font-bold text-gray-800 mt-1">{title}</h1>
      </div>

      {actionLabel && (
        <Button onClick={onAction} className="mt-3 sm:mt-0">
          {actionLabel}
        </Button>
      )}
    </header>
  );
};

export default Header;
