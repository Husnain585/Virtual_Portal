import React, { useEffect, useState } from "react";
import { getStudentDashboard } from "../../api/dashboard.api";
import StatsCard from "../../components/widgets/StatsCard";
import SummaryCard from "../../components/widgets/SummaryCard";

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getStudentDashboard().then(setData);
  }, []);

  if (!data) return <p>Loading dashboard...</p>;

  return (
    <div className="p-6 space-y-6">
      <div className="grid sm:grid-cols-3 gap-4">
        <StatsCard title="Enrolled Courses" value={data.coursesCount} />
        <StatsCard title="Upcoming Assignments" value={data.upcomingAssignments} />
        <StatsCard title="Recent Grades" value={data.recentGradesCount} />
      </div>

      <SummaryCard title="Recent Grades" items={data.recentGrades} />
    </div>
  );
};

export default Dashboard;
