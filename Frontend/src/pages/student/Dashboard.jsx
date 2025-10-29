// src/pages/StudentDashboard.jsx
import React, { useEffect, useState } from "react";
import { getStudentDashboard } from "../../api/dashboard.api";
import { getAnnouncements } from "../../api/announcement.api";
import { getStudentGrades } from "../../api/grade.api";
import { useAuth } from "../../hooks/useAuth";
import StatsCard from "../../components/widgets/StatsCard";
import SummaryCard from "../../components/widgets/SummaryCard";
import AnnouncementCard from "../../components/widgets/AnnouncementCard";
import { BookOpen, Calendar, Award, Bell, AlertCircle, RefreshCw } from "lucide-react";

const StudentDashboard = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDashboardData = async () => {
    try {
      setError(null);
      const [dashboardRes, announcementsRes, gradesRes] = await Promise.all([
        getStudentDashboard(),
        getAnnouncements({ targetRole: 'student', active: true, limit: 5 }),
        user?.id ? getStudentGrades(user.id, { limit: 5 }) : Promise.resolve({ grades: [] })
      ]);

      setData(dashboardRes);
      setAnnouncements(announcementsRes.announcements || []);
      setGrades(gradesRes.grades || []);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError(err.message || "Failed to load dashboard data");
      // Set fallback data
      setData({
        coursesCount: 0,
        upcomingAssignments: 0,
        recentGradesCount: 0,
        recentGrades: [],
        upcomingAssignmentsList: []
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [user]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchDashboardData();
  };

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
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

  // Transform grades data for SummaryCard
  const transformedGrades = grades.map(grade => ({
    id: grade.id,
    label: grade.assignmentTitle,
    value: grade.grade,
    score: grade.score,
    maxScore: grade.maxScore,
    courseName: grade.courseName,
    dateGraded: grade.dateGraded
  }));

  // Get recent grades for stats (last 7 days)
  const recentGradesCount = grades.filter(grade => {
    if (!grade.dateGraded) return false;
    const gradedDate = new Date(grade.dateGraded);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return gradedDate >= weekAgo;
  }).length;

  return (
    <div className="p-6 space-y-6">
      {/* Header with Refresh */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.firstName}! Here's your academic overview.</p>
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
          title="Enrolled Courses" 
          value={data?.coursesCount || 0} 
          icon={BookOpen}
        />
        <StatsCard 
          title="Upcoming Assignments" 
          value={data?.upcomingAssignments || 0} 
          icon={Calendar}
        />
        <StatsCard 
          title="Recent Grades" 
          value={recentGradesCount} 
          icon={Award}
        />
        <StatsCard 
          title="New Announcements" 
          value={announcements.length} 
          icon={Bell}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Grades & Assignments */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Grades Section */}
          <SummaryCard 
            title="Recent Grades"
            description="Your most recently graded assignments"
            items={transformedGrades}
            emptyMessage="No grades available yet"
            type="grades"
          />

          {/* Upcoming Assignments Section */}
          <SummaryCard 
            title="Upcoming Assignments"
            description="Assignments due in the next 7 days"
            items={data?.upcomingAssignmentsList || []}
            emptyMessage="No upcoming assignments"
            type="assignments"
          />
        </div>

        {/* Right Column - Announcements */}
        <div className="space-y-6">
          <AnnouncementCard 
            announcements={announcements}
            emptyMessage="No announcements"
          />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;