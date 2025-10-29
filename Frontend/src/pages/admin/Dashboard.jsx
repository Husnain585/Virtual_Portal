// src/pages/admin/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { getAdminDashboard } from "../../api/dashboard.api";
import { getAnnouncements } from "../../api/announcement.api";
import { useAuth } from "../../hooks/useAuth";
import StatsCard from "../../components/widgets/StatsCard";
import ChartCard from "../../components/widgets/ChartCard";
import SummaryCard from "../../components/widgets/SummaryCard";
import AnnouncementCard from "../../components/widgets/AnnouncementCard";
import { 
  Users, 
  BookOpen, 
  FileText, 
  TrendingUp, 
  AlertCircle,
  RefreshCw,
  UserPlus,
  Settings,
  Bell,
  Shield
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
        getAdminDashboard(),
        getAnnouncements({ limit: 5 })
      ]);

      setData(dashboardRes);
      setAnnouncements(announcementsRes.announcements || []);
    } catch (err) {
      console.error("Error fetching admin dashboard:", err);
      setError(err.message || "Failed to load dashboard data");
      // Set fallback data
      setData({
        totalUsers: 0,
        activeCourses: 0,
        submissions: 0,
        pendingApprovals: 0,
        growthData: [],
        recentActivities: [],
        systemStats: {}
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
          <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
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
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.firstName}! System overview and analytics.</p>
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
          title="Total Users" 
          value={data?.totalUsers || 0} 
          icon={Users}
          trend="up"
          change="+12 this month"
        />
        <StatsCard 
          title="Active Courses" 
          value={data?.activeCourses || 0} 
          icon={BookOpen}
          trend="up"
          change="+3 new courses"
        />
        <StatsCard 
          title="Assignments Submitted" 
          value={data?.submissions || 0} 
          icon={FileText}
          trend="up"
          change="+45 this week"
        />
        <StatsCard 
          title="Pending Approvals" 
          value={data?.pendingApprovals || 0} 
          icon={Shield}
          trend={data?.pendingApprovals > 5 ? "down" : "up"}
          change={data?.pendingApprovals > 5 ? "Needs attention" : "All clear"}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Charts & Analytics */}
        <div className="lg:col-span-2 space-y-6">
          {/* Growth Analytics */}
          {data?.growthData && data.growthData.length > 0 && (
            <ChartCard 
              title="User Growth Over Time" 
              data={data.growthData} 
              dataKey="count"
              color="#10b981"
            />
          )}

          {/* System Statistics */}
          {data?.systemStats && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl shadow p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">User Distribution</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Students</span>
                    <span className="font-semibold">{data.systemStats.students || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Teachers</span>
                    <span className="font-semibold">{data.systemStats.teachers || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Admins</span>
                    <span className="font-semibold">{data.systemStats.admins || 0}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Course Statistics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Courses</span>
                    <span className="font-semibold">{data.systemStats.totalCourses || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Active This Week</span>
                    <span className="font-semibold">{data.systemStats.activeThisWeek || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Departments</span>
                    <span className="font-semibold">{data.systemStats.departments || 0}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Recent Activities */}
          <SummaryCard
            title="Recent System Activities"
            description="Latest administrative actions and events"
            items={data?.recentActivities?.map((a) => ({
              id: a.id,
              label: a.activity,
              value: a.timestamp,
              user: a.user,
              type: a.type
            })) || []}
            emptyMessage="No recent activities"
            type="activities"
          />
        </div>

        {/* Right Column - Announcements & Quick Actions */}
        <div className="space-y-6">
          <AnnouncementCard 
            announcements={announcements}
            emptyMessage="No announcements"
            showActions={true}
          />

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="flex items-center gap-2 mb-4">
              <Settings size={20} className="text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-800">Quick Actions</h3>
            </div>
            <div className="space-y-3">
              <button className="w-full text-left p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <div className="flex items-center gap-2">
                  <UserPlus size={18} className="text-blue-600" />
                  <div>
                    <div className="font-medium text-blue-800">Manage Users</div>
                    <div className="text-sm text-blue-600">Add, edit, or remove users</div>
                  </div>
                </div>
              </button>
              <button className="w-full text-left p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                <div className="flex items-center gap-2">
                  <BookOpen size={18} className="text-green-600" />
                  <div>
                    <div className="font-medium text-green-800">Course Management</div>
                    <div className="text-sm text-green-600">Create and manage courses</div>
                  </div>
                </div>
              </button>
              <button className="w-full text-left p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                <div className="flex items-center gap-2">
                  <Bell size={18} className="text-purple-600" />
                  <div>
                    <div className="font-medium text-purple-800">Post Announcement</div>
                    <div className="text-sm text-purple-600">Broadcast to all users</div>
                  </div>
                </div>
              </button>
              <button className="w-full text-left p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                <div className="flex items-center gap-2">
                  <Shield size={18} className="text-orange-600" />
                  <div>
                    <div className="font-medium text-orange-800">System Settings</div>
                    <div className="text-sm text-orange-600">Configure platform settings</div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* System Health */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">System Health</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Server Status</span>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Online
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Database</span>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Connected
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Storage Usage</span>
                <span className="text-sm font-medium text-gray-700">45%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Active Sessions</span>
                <span className="text-sm font-medium text-gray-700">{data?.systemStats?.activeSessions || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;