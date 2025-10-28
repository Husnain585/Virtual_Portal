// src/dashboard/ChartCard.jsx
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const ChartCard = ({ title, data = [], dataKey = "value", color = "#3b82f6" }) => {
  return (
    <div className="bg-white rounded-2xl shadow p-5">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">{title}</h3>
      {data.length > 0 ? (
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="text-sm text-gray-500 text-center">No chart data available</p>
      )}
    </div>
  );
};

export default ChartCard;
