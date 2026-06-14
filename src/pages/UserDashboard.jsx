import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar';
import HomeView from '../components/UserDashboardViews/HomeView';
import SubmitGrievanceView from '../components/UserDashboardViews/SubmitGrievanceView';
import DraftComplaintView from '../components/UserDashboardViews/DraftComplaintView';
import TrackComplaintView from '../components/UserDashboardViews/TrackComplaintView';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const UserDashboard = () => {
    const { tenantCode } = useParams();
    const { GetTenant } = useAuth();
    const portalNavigation = [
        {
            category: "General",
            items: [
                { id: "home", label: "Dashboard / Home", icon: "Home", path: "#home", isActive: true },
            ]
        },
        {
            category: "Grievance Submission",
            items: [
                { id: "submit-new", label: "Submit New Grievance", icon: "FilePlus2", path: "#submit-new", isActive: true },
                { id: "drafts", label: "Draft Complaints", icon: "FileText", path: "#drafts", isActive: true }
            ]
        },
        {
            category: "Track Grievance",
            items: [
                { id: "track-id", label: "Track by Tracking ID", icon: "Search", path: "#track-id", isActive: true },
                { id: "status-timeline", label: "View Status Timeline", icon: "GitCommit", path: "#status-timeline", isActive: false },
                { id: "download-receipt", label: "Download Acknowledgement", icon: "Download", path: "#download-receipt", isActive: false }
            ]
        },
        {
            category: "Notices & Info",
            items: [
                { id: "public-notices", label: "Public Notices", icon: "BellRing", path: "#public-notices", isActive: false },
                { id: "circulars", label: "Circulars", icon: "Layers", path: "#circulars", isActive: false },
                { id: "maint-alerts", label: "Maintenance Alerts", icon: "Wrench", path: "#maintenance-alerts", isActive: false }
            ]
        },
        {
            category: "Support & Resources",
            items: [
                { id: "faqs", label: "FAQs", icon: "HelpCircle", path: "#faqs", isActive: false },
                { id: "process-flow", label: "Process Flow", icon: "Network", path: "#process-flow", isActive: false },
                { id: "tutorials", label: "Video Tutorials", icon: "PlayCircle", path: "#tutorials", isActive: false }
            ]
        },
        {
            category: "Knowledge Base",
            items: [
                { id: "policies", label: "Policies", icon: "Scale", path: "#policies", isActive: false },
                { id: "charter", label: "Citizen Charter", icon: "BookOpen", path: "#citizen-charter", isActive: false },
                { id: "service-guidelines", label: "Service Guidelines", icon: "Compass", path: "#service-guidelines", isActive: false }
            ]
        },
        {
            category: "Organization",
            items: [
                { id: "dept-directory", label: "Department Directory", icon: "Building2", path: "#departments", isActive: false },
                { id: "dept-responsibilities", label: "Responsibilities", icon: "Briefcase", path: "#responsibilities", isActive: false },
                { id: "public-reports", label: "Public Reports & Analytics", icon: "LineChart", path: "#public-reports", isActive: false }
            ]
        },
        {
            category: "Engagement",
            items: [
                { id: "feedback", label: "Submit Feedback", icon: "MessageSquareHeart", path: "#feedback", isActive: false },
                { id: "rate-exp", label: "Rate Resolution Experience", icon: "Star", path: "#rate-experience", isActive: false },
                { id: "contact-us", label: "Contact Us & Helplines", icon: "PhoneCall", path: "#contact", isActive: false }
            ]
        }
    ];

    const [activeTab, setActiveTab] = useState('home');
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    useEffect(() => {
        GetTenant(tenantCode);
    }, [tenantCode])

    return (
        <div className="min-h-screen  bg-zinc-50 text-zinc-800 font-sans antialiased flex">

            {/* Modular Layout Sidebar Left Block */}
            <Sidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                collapsed={sidebarCollapsed}
                setCollapsed={setSidebarCollapsed}
                menuItems={portalNavigation}
            />


            <main className={`flex-1 p-6 md:p-8  mx-auto w-full transition-all duration-300 flex  ${sidebarCollapsed ? "ml-20" : "ml-64"} `}>
                {activeTab === 'home' && (
                    <HomeView />
                )}
                {activeTab === 'submit-new' && (
                    <SubmitGrievanceView />
                )}
                {activeTab === 'drafts' && (
                    <DraftComplaintView />
                )}
                {activeTab === 'track-id' && (
                    <TrackComplaintView />
                )}
            </main>
        </div>
    )
}

export default UserDashboard