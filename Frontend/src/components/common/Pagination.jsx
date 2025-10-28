// src/common/Pagination.jsx
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ page, totalPages, onPageChange }) => {
  const handlePrev = () => {
    if (page > 1) onPageChange(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) onPageChange(page + 1);
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 py-4">
      <button
        onClick={handlePrev}
        disabled={page === 1}
        className="p-2 rounded-lg border disabled:opacity-50 hover:bg-gray-50"
      >
        <ChevronLeft size={18} />
      </button>
      <span className="text-sm text-gray-700">
        Page <strong>{page}</strong> of {totalPages}
      </span>
      <button
        onClick={handleNext}
        disabled={page === totalPages}
        className="p-2 rounded-lg border disabled:opacity-50 hover:bg-gray-50"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default Pagination;
