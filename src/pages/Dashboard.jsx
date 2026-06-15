import React from "react";
import { useAuth } from "../context/AuthContext.jsx";
import Navbar from "../components/Navbar";
import TenantConfig from "./TenantConfig.jsx";
import UserDashboard from "./UserDashboard.jsx";
import HODDashboard from "./HODDashboard.jsx";

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
    <div className="">
      {/* Structural Offset - Takes exactly the remaining view height */}
      {user.role === "Superadmin" && <TenantConfig />}
      {user.role === "Department Head" && <HODDashboard />}
    </div>
  );
};

export default Dashboard;