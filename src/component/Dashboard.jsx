import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

// Import the three dashboards
import AdminDashboard from "../pages/AdminDashboard";
import StaffDashboard from "../pages/StaffDashBoard";
import UserDashboard from "../pages/UserDashboard";

const Dashboard = () => {
  const { user } = useAuth(); // current logged-in user from context
  console.log(user.email);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);
  const [userInfo, setUserInfo] = useState({})

  useEffect(() => {
    // If no user is logged in, redirect to login
    if (!user) {
      navigate("/login");
      return;
    }

    // If user exist, fetch their role from backend
    const fetchUserRole = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/users?email=${user.email}`
        );
        if (!res.ok) throw new Error("Failed to fetch user data");

        const data = await res.json();
        setRole(data.role); // 'admin', 'staff', or 'user'
        setUserInfo(data);
      } catch (err) {
        console.error("Error fetching user role:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h2 className="text-xl text-blue-600 font-semibold animate-pulse">
          Loading Dashboard...
        </h2>
      </div>
    );
  }

  // Role-based routing
  switch (role) {
    case "admin":
      return <AdminDashboard />;
    case "staff":
      return <StaffDashboard />;
    case "user":
      return <UserDashboard userInfo={userInfo} />;
    default:
      return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
          <h2 className="text-2xl font-semibold text-red-600 mb-2">
            Unauthorized Access
          </h2>
          <p className="text-gray-600">
            Your account role is not recognized. Please contact support.
          </p>
        </div>
      );
  }
};

export default Dashboard;
