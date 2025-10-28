// src/common/Loader.jsx
import React from "react";

const Loader = ({ size = 8, color = "border-blue-500" }) => {
  return (
    <div className="flex justify-center items-center py-4">
      <div
        className={`w-${size} h-${size} border-4 border-t-transparent ${color} rounded-full animate-spin`}
      />
    </div>
  );
};

export default Loader;
