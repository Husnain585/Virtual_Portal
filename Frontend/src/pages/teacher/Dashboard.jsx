// src/pages/teacher/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { getTeacherDashboard } from "../../api/dashboard.api";
import { getAnnouncements } from "../../api/announcement.api";
import { useAuth } from "../../hooks/useAuth";
import StatsCard from "../../components/widgets/StatsCard";
import ChartCard from "../../components/widgets/ChartCard";
import SummaryCard from "../../components/widgets/SummaryCard";
import AnnouncementCard from "../../components/widgets/AnnouncementCard";
import { 
  BookOpen, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Users,
  Bell,
  RefreshCw,
  FileText 
} from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDashboardData = async () => {
    try {
      setError(null);
      const [dashboardRes, announcementsRes] = await Promise.all([
        getTeacherDashboard(),
        getAnnouncements({ targetRole: 'teacher', active: true, limit: 5 })
      ]);

      setData(dashboardRes);
      setAnnouncements(announcementsRes.announcements || []);
    } catch (err) {
      console.error("Error fetching teacher dashboard:", err);
      setError(err.message || "Failed to load dashboard data");
      // Set fallback data
      setData({
        coursesCount: 0,
        pendingSubmissions: 0,
        gradedCount: 0,
        totalStudents: 0,
        submissionStats: [],
        recentActivities: [],
        upcomingDeadlines: []
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchDashboardData();
  };

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading teacher dashboard...</p>
        </div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
          <AlertCircle className="text-red-500" size={24} />
          <div className="flex-1">
            <h3 className="text-red-800 font-medium">Error loading dashboard</h3>
            <p className="text-red-600 text-sm">{error}</p>
          </div>
          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header with Refresh */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Teacher Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.firstName}! Here's your teaching overview.</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          <RefreshCw size={16} className={refreshing ? "animate-spin" : ""} />
          {refreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard 
          title="My Courses" 
          value={data?.coursesCount || 0} 
          icon={BookOpen}
          trend="up"
          change="+2 this semester"
        />
        <StatsCard 
          title="Pending Submissions" 
          value={data?.pendingSubmissions || 0} 
          icon={Clock}
          trend={data?.pendingSubmissions > 10 ? "down" : "up"}
          change={data?.pendingSubmissions > 10 ? "Needs grading" : "All caught up"}
        />
        <StatsCard 
          title="Graded Assignments" 
          value={data?.gradedCount || 0} 
          icon={CheckCircle}
          trend="up"
          change="+15 this week"
        />
        <StatsCard 
          title="Total Students" 
          value={data?.totalStudents || 0} 
          icon={Users}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Charts & Activities */}
        <div className="lg:col-span-2 space-y-6">
          {/* Submission Statistics Chart */}
          {data?.submissionStats && data.submissionStats.length > 0 && (
            <ChartCard 
              title="Submissions Over Time" 
              data={data.submissionStats} 
              dataKey="count"
              color="#3b82f6"
            />
          )}

          {/* Recent Activities */}
          <SummaryCard
            title="Recent Activities"
            description="Your latest teaching activities"
            items={data?.recentActivities?.map((a) => ({
              id: a.id,
              label: a.action,
              value: a.date,
              courseName: a.courseName,
              type: a.type
            })) || []}
            emptyMessage="No recent activities"
            type="activities"
          />

          {/* Upcoming Deadlines */}
          <SummaryCard
            title="Upcoming Deadlines"
            description="Assignment deadlines approaching soon"
            items={data?.upcomingDeadlines || []}
            emptyMessage="No upcoming deadlines"
            type="assignments"
          />
        </div>

        {/* Right Column - Announcements & Quick Actions */}
        <div className="space-y-6">
          <AnnouncementCard 
            announcements={announcements}
            emptyMessage="No announcements"
          />

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText size={20} className="text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-800">Quick Actions</h3>
            </div>
            <div className="space-y-3">
              <button className="w-full text-left p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <div className="font-medium text-blue-800">Create New Assignment</div>
                <div className="text-sm text-blue-600">Set up a new assignment for your courses</div>
              </button>
              <button className="w-full text-left p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                <div className="font-medium text-green-800">Grade Submissions</div>
                <div className="text-sm text-green-600">{data?.pendingSubmissions || 0} pending submissions</div>
              </button>
              <button className="w-full text-left p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                <div className="font-medium text-purple-800">Post Announcement</div>
                <div className="text-sm text-purple-600">Share updates with students</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;