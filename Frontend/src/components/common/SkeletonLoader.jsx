// src/components/common/SkeletonLoader.jsx
import React from "react";
import PropTypes from "prop-types";

const SkeletonLoader = ({ width = "w-full", height = "h-6", count = 1, className = "" }) => {
  return (
    <div className={`animate-pulse space-y-2 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`bg-gray-300 dark:bg-gray-700 rounded-md ${width} ${height}`}
        ></div>
      ))}
    </div>
  );
};

SkeletonLoader.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  count: PropTypes.number,
  className: PropTypes.string,
};

export default SkeletonLoader;
