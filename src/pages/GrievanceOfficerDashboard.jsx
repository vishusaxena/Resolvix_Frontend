import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useParams } from "react-router-dom";
import axios from "axios";
import GrievanceOfficerDashboardView from "../components/GrievanceOfficerDashboard/GrievanceOfficerDashboardView";
import AssignedGrievanceView from "../components/GrievanceOfficerDashboard/AssignedGrievanceView";

const GrievanceOfficerDashboard = () => {
    const { tenantCode } = useParams();
    const token = localStorage.getItem("token");

    const [userData, setUserData] = useState({
        name: "",
        department: "",
        role: "",
        tenantName: "",
    });

    const [grievances, setGrievances] = useState({
        data: [],
        headers: [],
        filters: [],
    });

    const grievanceOfficerNavigation = [
        {
            category: "Overview",
            items: [
                {
                    id: "dashboard",
                    label: "Dashboard",
                    icon: "LayoutDashboard",
                    path: "#dashboard",
                    isActive: true,
                },
            ],
        },

        {
            category: "My Grievances",
            items: [
                {
                    id: "assigned-grievances",
                    label: "Assigned Grievances",
                    icon: "FileText",
                    path: "#assigned-grievances",
                    isActive: true,
                },
            ],
        },
    ];

    const [activeTab, setActiveTab] = useState("dashboard");
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const GetOfficerData = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/auth/department-info",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.status === "success") {
                setUserData({
                    name: response.data.data.name,
                    department: response.data.data.department,
                    role: response.data.data.role,
                    tenantName: response.data.data.tenantName,
                });
            }
        } catch (err) {
            console.error("Error fetching officer data:", err);
        }
    };

    const GetGrievanceData = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/grievances/department",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.status === "success") {
                setGrievances({
                    data: response.data.data,
                    headers: response.data.headersKey,
                    filters: response.data.filters,
                });
            }
        } catch (err) {
            console.error("Error fetching grievances:", err);
        }
    };

    useEffect(() => {
        GetOfficerData();
        GetGrievanceData();
    }, []);

    return (
        <div className="min-h-screen bg-zinc-50 text-zinc-800 font-sans antialiased flex">
            <Sidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                collapsed={sidebarCollapsed}
                setCollapsed={setSidebarCollapsed}
                menuItems={grievanceOfficerNavigation}
            />

            <main
                className={`flex-1 mx-auto w-full transition-all duration-300 ${sidebarCollapsed ? "ml-20" : "ml-64"
                    }`}
            >
                {/* Dashboard */}
                {activeTab === "dashboard" && (
                    <GrievanceOfficerDashboardView />
                )}

                {/* Assigned Grievances */}
                {activeTab === "assigned-grievances" && (
                    <AssignedGrievanceView />
                )}

                {/* Pending */}
                {activeTab === "pending-grievances" && (
                    <div className="p-8">
                        Pending Grievances View
                    </div>
                )}

                {/* In Progress */}
                {activeTab === "in-progress" && (
                    <div className="p-8">
                        In Progress Grievances View
                    </div>
                )}

                {/* Resolved */}
                {activeTab === "resolved" && (
                    <div className="p-8">
                        Resolved Grievances View
                    </div>
                )}

                {/* Notifications */}
                {activeTab === "notifications" && (
                    <div className="p-8">
                        Notifications View
                    </div>
                )}

                {/* Performance */}
                {activeTab === "my-performance" && (
                    <div className="p-8">
                        My Performance View
                    </div>
                )}
            </main>
        </div>
    );
};

export default GrievanceOfficerDashboard;