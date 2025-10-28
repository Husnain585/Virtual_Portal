// src/pages/admin/Dashboard.jsx
import React, { useEffect, useState } from "react";
import StatsCard from "../../components/widgets/StatsCard";
import ChartCard from "../../components/widgets/ChartCard";
import SummaryCard from "../../components/widgets/SummaryCard";
import { getAdminDashboard } from "../../api/dashboard.api";

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAdminDashboard();
      setData(res);
    };
    fetchData();
  }, []);

  if (!data) return <p className="text-center py-10">Loading dashboard...</p>;

  return (
    <div className="p-6 grid gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard title="Total Users" value={data.totalUsers} />
        <StatsCard title="Active Courses" value={data.activeCourses} />
        <StatsCard title="Assignments Submitted" value={data.submissions} />
      </div>

      <ChartCard title="Student Growth" data={data.growthData} dataKey="count" />

      <SummaryCard
        title="Recent Activities"
        items={data.recentActivities.map((a) => ({
          label: a.activity,
          value: a.timestamp,
        }))}
      />
    </div>
  );
};

export default Dashboard;
