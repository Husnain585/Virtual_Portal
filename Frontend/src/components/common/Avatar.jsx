// src/common/Avatar.jsx
import React from "react";

const Avatar = ({ src, alt = "avatar", size = "md", className = "" }) => {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-14 h-14",
  };

  return (
    <div className={`relative ${sizes[size]} rounded-full overflow-hidden ${className}`}>
      {src ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover rounded-full"
        />
      ) : (
        <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold rounded-full">
          {alt?.[0]?.toUpperCase() || "?"}
        </div>
      )}
    </div>
  );
};

export default Avatar;
