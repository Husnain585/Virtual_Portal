// src/dashboard/StatsCard.jsx
import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const StatsCard = ({ title, value, change, icon: Icon, trend = "up" }) => {
  const trendColor = trend === "up" ? "text-green-600" : "text-red-600";
  const TrendIcon = trend === "up" ? ArrowUpRight : ArrowDownRight;

  return (
    <div className="bg-white rounded-2xl shadow p-5 flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
        {change && (
          <div className={`flex items-center gap-1 text-sm ${trendColor}`}>
            <TrendIcon size={16} />
            <span>{change}</span>
          </div>
        )}
      </div>
      {Icon && (
        <div className="p-3 bg-blue-100 rounded-full text-blue-600">
          <Icon size={22} />
        </div>
      )}
    </div>
  );
};

export default StatsCard;
