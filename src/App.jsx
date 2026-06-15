import React from "react";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import TenantConfig from "./pages/TenantConfig";
import PrivateRoutes from "./context/privateRoutes";
import PublicRoutes from "./context/publicRoutes";
import UserDashboard from "./pages/UserDashboard";
import HODDashboard from "./pages/HODDashboard";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<PublicRoutes><Auth /></PublicRoutes>} />
        <Route path="/dashboard" element={<PrivateRoutes> <Dashboard /></PrivateRoutes>} />
        <Route path="/dashboard/userview/:tenantCode" element={<PublicRoutes><UserDashboard /></PublicRoutes>} />
        <Route path="/dashboard/hodview" element={<PrivateRoutes><HODDashboard /></PrivateRoutes>} />

      </Routes>
    </div>
  );
};

export default App;
