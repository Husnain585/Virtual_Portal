// src/pages/teacher/Dashboard.jsx
import React, { useEffect, useState } from "react";
import StatsCard from "../../components/widgets/StatsCard";
import ChartCard from "../../components/widgets/ChartCard";
import SummaryCard from "../../components/widgets/SummaryCard";
import { getTeacherDashboard } from "../../api/dashboard.api";

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      const res = await getTeacherDashboard();
      setData(res);
    };
    fetchDashboard();
  }, []);

  if (!data) return <p className="text-center py-10">Loading dashboard...</p>;

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard title="My Courses" value={data.coursesCount} />
        <StatsCard title="Pending Submissions" value={data.pendingSubmissions} />
        <StatsCard title="Graded Assignments" value={data.gradedCount} />
      </div>

      <ChartCard title="Submissions Over Time" data={data.submissionStats} dataKey="count" />

      <SummaryCard
        title="Recent Activities"
        items={data.recentActivities.map((a) => ({
          label: a.action,
          value: a.date,
        }))}
      />
    </div>
  );
};

export default Dashboard;
