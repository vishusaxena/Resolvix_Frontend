import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import {
    LayoutDashboard,
    Building2,
    FolderTree,
    KeyRound,
    ShieldAlert,
    Users,
    LogOut,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import {
    DashboardView,
    TenantsView,
    DepartmentsView,
    RolesView,
    UsersView
} from '../components/MasterViews';
import axios from 'axios';
import ConfigurableDialog from '../components/ConfigurableDialog';

export default function TenantConfig() {
    const [activeTenant, setActiveTenant] = useState(null);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [reset, setReset] = useState(false);
    const [showDepartment, setShowDepartment] = useState(false);
    const [showUsers, setShowUsers] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [responseDetails, setResponseDetails] = useState({
        trackingId: "",
        accessKey: ""
    });

    const menuItems = [
        { id: 'dashboard', label: 'Overview Dashboard', icon: LayoutDashboard },
        { id: 'tenants', label: 'Tenants System', icon: Building2 },
        { id: 'departments', label: 'Departments Master', icon: FolderTree },
        { id: 'roles', label: 'Roles Architecture', icon: KeyRound },
        { id: 'users', label: 'User Master Directory', icon: Users },
    ];


    // --- RESTRUCTURED DATA ENGINE STATE ---
    const [tenants, setTenants] = useState([]);

    const [departments, setDepartments] = useState([]);
    const [roles, setRoles] = useState([]);
    const [users, setUsers] = useState([]);

    // --- DISCRETE USER ACTIONS / TRANSACTIONS ---
    const [newTenant, setNewTenant] = useState({
        tenantName: '',
        tenantType: '',
        tenantPhone: '',
        tenantEmail: '',
        tenantWebsite: '',
        tenantAddress: {
            addressLine1: '',
            city: '',
            state: '',
            country: '',
            pincode: ''
        },
        tenantStatus: true,
    });
    const [newDept, setNewDept] = useState({
        departmentName: '',
        departmentCode: '',
        departmentStatus: true,
    });
    const [newRole, setNewRole] = useState({
        roleName: "",
        roleStatus: true
    });
    const [newUser, setNewUser] = useState({
        userCode: "",
        name: "",
        email: "",
        password: "",
        role: "",
        department: "",
        isActive: true
    });

    const GetTenants = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/tenant');
            setTenants(response.data.data);
        } catch (err) {
            console.error('Error fetching tenants:', err);
        }
    };

    const handleCreateTenant = async () => {
        console.log("clicked")
        try {
            const response = await axios.post('http://localhost:5000/api/tenant', newTenant);
            if (response.data.status === 'success') {
                setTenants([...tenants, response.data.data]);
                setNewTenant({
                    tenantName: '',
                    tenantType: '',
                    tenantPhone: '',
                    tenantEmail: '',
                    tenantWebsite: '',
                    tenantAddress: {
                        addressLine1: '',
                        city: '',
                        state: '',
                        country: '',
                        pincode: ''
                    },
                    tenantStatus: true,
                });
                setResponseDetails({
                    trackingId: response.data.data.tenantCode,
                    accessKey: response.data.data.tenantKey
                })
                setIsOpen(true);
            }
            GetTenants();
            setReset(!reset);
        } catch (err) {
            console.error('Error creating tenant:', err);
        }
    };

    const handleEditTenant = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/tenant/${id}`);
            if (response.data.status === 'success') {
                setNewTenant(response.data.data);
            }
        } catch (err) {
            console.error('Error fetching tenant:', err);
        }
    };

    const handleAddDepartment = async () => {
        try {
            if (!newDept) return;

            const response = await axios.post('http://localhost:5000/api/department', { ...newDept, tenantCode: activeTenant });
            if (response.data.status === 'success') {
                setDepartments([...departments, response.data.data]);
                setNewDept({
                    departmentName: '',
                    departmentCode: '',
                    departmentStatus: true,
                });
            }
        } catch (err) {
            console.error('Error adding department:', err);
        }
    }

    const GetDepartments = async (tenantCode) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/department/${tenantCode}`);
            if (response.data.status === 'success') {
                setDepartments(response.data.data);
            }
        } catch (err) {
            console.error('Error fetching departments:', err);
        }
    };


    const handleAddRole = async () => {
        try {
            if (!newRole) return;

            const response = await axios.post('http://localhost:5000/api/roles', newRole);
            if (response.data.status === 'success') {
                GetRoles();
                setNewRole({
                    roleName: '',
                    roleStatus: true,
                });
            }
        } catch (err) {
            console.error('Error adding department:', err);
        }
    }
    const GetRoles = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/roles`);
            if (response.data.status === 'success') {
                setRoles(response.data.data);
            }
        } catch (err) {
            console.error('Error fetching roles:', err);
        }
    };
    const handleAddUser = async (e) => {
        try {
            if (!newUser) return;

            const response = await axios.post('http://localhost:5000/api/auth/register', { ...newUser, tenantCode: activeTenant });
            if (response.data.status === 'success') {
                setUsers([...users, response.data.data]);
                setNewUser({
                    userCode: "",
                    name: "",
                    email: "",
                    password: "",
                    role: "",
                    department: "",
                    isActive: true
                });
            }
        } catch (err) {
            console.error('Error adding User:', err);
        }
    };

    const GetUsers = async (tenantCode) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/auth/users/${tenantCode}`);
            if (response.data.status === 'success') {
                setUsers(response.data.data);
            }
        } catch (err) {
            console.error('Error fetching departments:', err);
        }
    };

    useEffect(() => {
        GetTenants();
        GetRoles();
    }, [])

    useEffect(() => {
        setShowDepartment(false);
        setShowUsers(false);
    }, [activeTab])

    return (
        <div className="min-h-screen  bg-zinc-50 text-zinc-800 font-sans antialiased flex">

            {/* Modular Layout Sidebar Left Block */}
            <Sidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                collapsed={sidebarCollapsed}
                setCollapsed={setSidebarCollapsed}
                menuItems={menuItems}
            />

            <ConfigurableDialog
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                type="success" // Options: "info", "success", "warning", "danger"
                title="Tenant Created Successfully"
                description="Your Tenant is now active in the ledger database."
                clipboardValue={responseDetails.accessKey} // Shows the clipboard tool
                clipboardLabel="Secure Tracking Token"

            /* Notice: onConfirm is left out completely here */
            />

            {/* Layout Main Right Context Viewport Container */}
            <main className={`flex-1 p-6 md:p-8  mx-auto w-full transition-all duration-300 flex  ${sidebarCollapsed ? "ml-20" : "ml-64"} `}>
                {activeTab === 'dashboard' && (
                    <DashboardView tenants={tenants} departments={departments} roles={roles} users={users} />
                )}
                {activeTab === 'tenants' && (
                    <TenantsView reset={reset} tenants={tenants} newTenant={newTenant} setNewTenant={setNewTenant} onCreateTenant={handleCreateTenant} onEditTenant={(id) => handleEditTenant(id)} />
                )}
                {activeTab === 'departments' && (
                    <DepartmentsView tenants={tenants} isOpen={showDepartment} onOpen={(tenant) => { setShowDepartment(true); setActiveTenant(tenant); GetDepartments(tenant); }} onClose={() => setShowDepartment(false)} departments={departments} newDept={newDept} setNewDept={setNewDept} onAddDept={handleAddDepartment} />
                )}
                {activeTab === 'roles' && (
                    <RolesView roles={roles} newRole={newRole} setNewRole={setNewRole} onAddRole={handleAddRole} />
                )}
                {/* {activeTab === 'permissions' && (
                    <PermissionsView roles={roles} permissions={permissions} rolePermissions={rolePermissions} setRolePermissions={setRolePermissions} onTogglePermission={handleTogglePermission} />
                )} */}
                {activeTab === 'users' && (
                    <UsersView users={users} tenants={tenants} roles={roles} departments={departments} newUser={newUser} setNewUser={setNewUser} onAddUser={handleAddUser} onOpen={(tenant) => { setShowUsers(true); setActiveTenant(tenant); GetUsers(tenant); }} isOpen={showUsers} onClose={() => setShowUsers(false)} activeTenant={activeTenant} />
                )}
            </main>
        </div>
    );
}