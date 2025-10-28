// src/dashboard/SummaryCard.jsx
import React from "react";

const SummaryCard = ({ title, description, items = [] }) => {
  return (
    <div className="bg-white rounded-2xl shadow p-5">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      {description && <p className="text-sm text-gray-500 mb-3">{description}</p>}
      <ul className="divide-y divide-gray-200">
        {items.length > 0 ? (
          items.map((item, idx) => (
            <li key={idx} className="py-2 text-gray-700 flex justify-between">
              <span>{item.label}</span>
              <span className="font-medium">{item.value}</span>
            </li>
          ))
        ) : (
          <li className="py-2 text-gray-400 text-sm">No data available</li>
        )}
      </ul>
    </div>
  );
};

export default SummaryCard;
