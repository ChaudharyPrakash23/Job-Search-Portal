import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Users, Briefcase, Bookmark, FileText, PlusCircle, Menu, X } from "react-feather";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/api/admin/dashboard", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setDashboardData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <div className="w-full bg-blue-700 text-white py-4 px-6 flex justify-between items-center shadow-lg md:hidden">
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* sidbar........... */}
      <div
        className={`fixed md:relative w-64 bg-white shadow-lg p-6 space-y-6 h-full transform mt-20 ml-1 rounded-md z-50 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-50`}
      >
        <h1 className="text-2xl font-bold text-gray-800 hidden md:block mt-6">Admin Panel</h1>

        <nav className="flex flex-col space-y-4">
          <Link to="/Createjob" className="flex items-center space-x-3 text-blue-600 font-medium hover:bg-blue-100 p-3 rounded-lg">
            <PlusCircle size={20} />
            <span>Create Job</span>
          </Link>
          <Link to="/Managejob" className="flex items-center space-x-3 text-green-600 font-medium hover:bg-green-100 p-3 rounded-lg">
            <Briefcase size={20} />
            <span>Manage Jobs</span>
          </Link>
        </nav>
      </div>

      <div className="flex-1 p-6 flex flex-col items-center">
        <h1 className="text-2xl font-bold text-gray-800 text-center w-full">Admin Dashboard</h1>

        {loading ? (
          <p className="text-gray-500 text-center mt-10">Loading dashboard data...</p>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5 w-full">
              {[
                { label: "Total Users", count: dashboardData.totalUsers, icon: <Users size={24} />, color: "bg-blue-600" },
                { label: "Total Jobs", count: dashboardData.totalJobs, icon: <Briefcase size={24} />, color: "bg-green-600" },
                { label: "Saved Jobs", count: dashboardData.totalSavedJobs, icon: <Bookmark size={24} />, color: "bg-yellow-600" },
                { label: "Applications", count: dashboardData.totalApplications, icon: <FileText size={24} />, color: "bg-red-600" },
              ].map((stat, index) => (
                <div key={index} className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4">
                  <div className={`${stat.color} text-white p-3 rounded-full`}>{stat.icon}</div>
                  <div>
                    <h3 className="text-sm md:text-lg font-semibold">{stat.label}</h3>
                    <p className="text-lg md:text-2xl font-bold">{stat.count}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 bg-white shadow-md rounded-lg p-4 md:p-6 w-full">
              <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-3 md:mb-4">Recent Jobs</h2>
              <div className="space-y-3 md:space-y-4">
                {dashboardData.recentJobs.length === 0 ? (
                  <p className="text-gray-500">No recent jobs found.</p>
                ) : (
                  dashboardData.recentJobs.map((job) => (
                    <div key={job._id} className="flex justify-between items-center p-3 md:p-4 border-b border-gray-200">
                      <div>
                        <h3 className="text-sm md:text-lg font-semibold">{job.title}</h3>
                        <p className="text-xs md:text-sm text-gray-600">{job.company}</p>
                      </div>
                      <p className="text-xs md:text-sm text-gray-500">{new Date(job.createdAt).toDateString()}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
