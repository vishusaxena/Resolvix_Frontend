import React from "react";
import { useAuth } from "../context/AuthContext.jsx";
import Navbar from "../components/Navbar";
import UserDashboard from "../components/UserDashboard";
import AdminDashboard from "../components/AdminDashboard";
import AuthorityDashboard from "../components/AuthorityDashboard";

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <Navbar /> 
      {user.role === "user" && <UserDashboard />}
      {user.role === "admin" && <AdminDashboard />}
      {user.role === "authority" && <AuthorityDashboard />}
    </div>
  );
};

export default Dashboard;
