import React from "react";
import { useAuth } from "../context/AuthContext.jsx";
import Navbar from "../components/Navbar";
import UserDashboard from "../components/UserDashboard";
import AdminDashboard from "../components/AdminDashboard";
import AuthorityDashboard from "../components/AuthorityDashboard";

const Dashboard = () => {
  const { user, loading } = useAuth();

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-[#030303] flex items-center justify-center font-mono text-xs text-zinc-500 tracking-widest uppercase">
        <div className="flex flex-col items-center gap-3">
          <div className="w-4 h-4 border border-violet-500 border-t-transparent rounded-full animate-spin"></div>
          Authenticating Instance...
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-[#030303] text-zinc-100 antialiased flex flex-col overflow-hidden">
      {/* Global Top Navigation Bar */}
      <Navbar />

      {/* Structural Offset - Takes exactly the remaining view height */}
      <div className="flex-1 flex pt-16 overflow-hidden w-full">
        {user.role === "user" && <UserDashboard />}
        {user.role === "admin" && <AdminDashboard />}
        {user.role === "authority" && <AuthorityDashboard />}
      </div>
    </div>
  );
};

export default Dashboard;