import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DashboardView from '../components/HODDashboardViews/DashboardView';
import AllGrievancesView from '../components/HODDashboardViews/AllGrievancesView';
import axios from 'axios';
import AssignGrievancesView from '../components/HODDashboardViews/AssignGrievancesView';
import DepartmentTeamManagementView from '../components/HODDashboardViews/DepartmentTeamManagementView';
const HODDashboard = () => {
    const token = localStorage.getItem("token");
    const [userData, setUserData] = useState({
        name: "",
        departmentL: "",
        role: "",
        tenantName: "",
        tenantCode: ""
    })
    const [grievances, setGrievances] = useState({
        data: [],
        headers: [],
        filters: [],
        viewDetails: [],
    });
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
            ]
        },

        {
            category: "Assignment & Workflow",
            items: [
                { id: "assign-grievances", label: "Assign Grievances", icon: "UserPlus", path: "#assign", isActive: true },
            ]
        },

        {
            category: "Team Management",
            items: [
                { id: "authorities", label: "Authorities", icon: "Users", path: "#authorities", isActive: true },
            ]
        },

    ];

    const [activeTab, setActiveTab] = useState('dashboard');
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);


    const GetDepartmentData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/auth/department-info`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response);
            if (response.data.status === 'success') {
                setUserData({
                    name: response.data.data.name,
                    departmentL: response.data.data.department,
                    role: response.data.data.role,
                    tenantName: response.data.data.tenantName,
                    tenantCode: response.data.data.tenantCode
                })
            }
        } catch (err) {
            console.error('Error fetching departments:', err);
        }
    };
    const GetGrievanceData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/grievances/department`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response);
            if (response.data.status === 'success') {
                setGrievances({
                    data: response.data.data,
                    headers: response.data.headersKey,
                    filters: response.data.filters,
                    viewDetails: response.data.viewDetails
                })
            }
        } catch (err) {
            console.error('Error fetching departments:', err);
        }
    };
    useEffect(() => {
        GetDepartmentData();
        GetGrievanceData();
    }, [userData.tenantCode])

    useEffect(() => {
        localStorage.setItem("tenantData", JSON.stringify({
            tenantCode: userData.tenantCode,
            department: userData.departmentL
        }))
    }, [userData.tenantCode, userData.departmentL])

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
                    <DashboardView userData={userData} />
                )}
                {activeTab === 'all-grievances' && (
                    <AllGrievancesView grievances={grievances.data} headers={grievances.headers} filters={grievances.filters} viewDetails={grievances.viewDetails} />
                )}
                {activeTab === 'assign-grievances' && (
                    <AssignGrievancesView grievances={grievances.data}  />
                )}
                {activeTab === 'authorities' && (
                    <DepartmentTeamManagementView />
                )}
            </main>
        </div>
    )
}

export default HODDashboard