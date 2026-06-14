import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DashboardView from '../components/HODDashboardViews/DashboardView';
import AllGrievancesView from '../components/HODDashboardViews/AllGrievancesView';
const HODDashboard = () => {
    const { tenantCode } = useParams();
    const hodNavigation = [
        {
            category: "Overview",
            items: [
                { id: "dashboard", label: "Dashboard", icon: "LayoutDashboard", path: "#dashboard", isActive: true },
            ]
        },

        {
            category: "Grievance Management",
            items: [
                { id: "all-grievances", label: "All Grievances", icon: "FileText", path: "#all-grievances", isActive: true },
                { id: "new-grievances", label: "New Grievances", icon: "FilePlus2", path: "#new-grievances", isActive: true },
                { id: "pending-grievances", label: "Pending Grievances", icon: "Clock3", path: "#pending-grievances", isActive: true },
                { id: "in-progress", label: "In Progress", icon: "Loader", path: "#in-progress", isActive: true },
                { id: "resolved", label: "Resolved", icon: "CheckCircle2", path: "#resolved", isActive: true },
                { id: "closed", label: "Closed", icon: "Archive", path: "#closed", isActive: true }
            ]
        },

        {
            category: "Assignment & Workflow",
            items: [
                { id: "assign-grievances", label: "Assign Grievances", icon: "UserPlus", path: "#assign", isActive: true },
                { id: "reassign", label: "Reassign Cases", icon: "Repeat", path: "#reassign", isActive: true },
                { id: "workflow", label: "Workflow Status", icon: "GitBranch", path: "#workflow", isActive: true },
                { id: "sla-monitor", label: "SLA Monitoring", icon: "Timer", path: "#sla", isActive: true }
            ]
        },

        {
            category: "Team Management",
            items: [
                { id: "authorities", label: "Authorities", icon: "Users", path: "#authorities", isActive: true },
                { id: "workload", label: "Workload Distribution", icon: "PieChart", path: "#workload", isActive: true },
                { id: "performance", label: "Performance Metrics", icon: "TrendingUp", path: "#performance", isActive: true }
            ]
        },

        {
            category: "Escalations",
            items: [
                { id: "overdue", label: "Overdue Cases", icon: "AlertTriangle", path: "#overdue", isActive: true },
                { id: "escalated", label: "Escalated Grievances", icon: "ArrowUpCircle", path: "#escalated", isActive: true },
                { id: "critical", label: "Critical Cases", icon: "ShieldAlert", path: "#critical", isActive: true }
            ]
        },

        {
            category: "Communication",
            items: [
                { id: "announcements", label: "Department Notices", icon: "BellRing", path: "#announcements", isActive: true },
                { id: "notifications", label: "Notifications", icon: "Bell", path: "#notifications", isActive: true },
                { id: "templates", label: "Response Templates", icon: "FileCheck", path: "#templates", isActive: true }
            ]
        },

        {
            category: "Reports",
            items: [
                { id: "reports", label: "Reports", icon: "FileBarChart", path: "#reports", isActive: true },
                { id: "monthly-report", label: "Monthly Summary", icon: "CalendarDays", path: "#monthly-report", isActive: true },
                { id: "export", label: "Export Data", icon: "Download", path: "#export", isActive: true }
            ]
        },

        {
            category: "AI Assistant",
            items: [
                { id: "ai-insights", label: "AI Insights", icon: "Brain", path: "#ai-insights", isActive: true },
                { id: "ai-assignment", label: "Smart Assignment", icon: "Bot", path: "#ai-assignment", isActive: true },
                { id: "duplicate-detection", label: "Duplicate Detection", icon: "ScanSearch", path: "#duplicates", isActive: true }
            ]
        }
    ];

    const [activeTab, setActiveTab] = useState('dashboard');
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    return (
        <div className="min-h-screen  bg-zinc-50 text-zinc-800 font-sans antialiased flex">

            {/* Modular Layout Sidebar Left Block */}
            <Sidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                collapsed={sidebarCollapsed}
                setCollapsed={setSidebarCollapsed}
                menuItems={hodNavigation}
            />


            <main className={`flex-1   mx-auto w-full transition-all duration-300 flex  ${sidebarCollapsed ? "ml-20" : "ml-64"} `}>
                {activeTab === 'dashboard' && (
                    <DashboardView />
                )}
                {activeTab === 'all-grievances' && (
                    <AllGrievancesView />
                )}
            </main>
        </div>
    )
}

export default HODDashboard