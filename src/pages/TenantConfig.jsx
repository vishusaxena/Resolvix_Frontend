import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import {
    DashboardView,
    TenantsView,
    DepartmentsView,
    RolesView,
    PermissionsView,
    UsersView
} from '../components/MasterViews';
import axios from 'axios';

export default function TenantConfig() {
    const [activeTenant, setActiveTenant] = useState(null);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [reset, setReset] = useState(false);
    const [showDepartment, setShowDepartment] = useState(false);
    // --- RESTRUCTURED DATA ENGINE STATE ---
    const [tenants, setTenants] = useState([]);

    const [departments, setDepartments] = useState([]);
    const [roles, setRoles] = useState(['Superadmin Infrastructure', 'System Account Executive', 'Operational Unit Manager', 'Standard Access Node']);
    const [permissions] = useState([
        { id: 'p1', name: 'Read System Analytics Data', description: 'Permits entry access to read system execution dashboards and structural telemetry logs.' },
        { id: 'p2', name: 'Write Pipeline Configurations', description: 'Enables creation parameters and permits mutations on pipeline structures.' },
        { id: 'p3', name: 'Destructive Purge Authority', description: 'Grants high tier validation clearance to remove records permanently from master frames.' },
        { id: 'p4', name: 'Directory Lifecycle Access', description: 'Permits creating, suspension, or updating target employee identities.' },
    ]);

    const [users, setUsers] = useState([
        { id: 1, name: 'John Doe', email: 'john@acme.com', tenant: 'Acme Corp', role: 'Superadmin Infrastructure', dept: 'Engineering Architecture' },
    ]);

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
    const [newRole, setNewRole] = useState('');
    const [newUser, setNewUser] = useState({ name: '', email: '', tenant: '', role: '', dept: '' });
    const [rolePermissions, setRolePermissions] = useState({ role: '', assigned: [] });

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

    const handleAddDepartment = async (tenant) => {
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

    const handleAddUser = (e) => {
        e.preventDefault();
        if (!newUser.name || !newUser.email || !newUser.tenant) return;
        setUsers([...users, { ...newUser, id: users.length + 1 }]);
        setNewUser({ name: '', email: '', tenant: '', role: '', dept: '' });
    };

    const handleTogglePermission = (permName) => {
        const isCurrentlySet = rolePermissions.assigned.includes(permName);
        setRolePermissions({
            ...rolePermissions,
            assigned: isCurrentlySet
                ? rolePermissions.assigned.filter(p => p !== permName)
                : [...rolePermissions.assigned, permName]
        });
    };

    useEffect(() => {
        GetTenants();
    }, [])

    return (
        <div className="min-h-screen  bg-zinc-50 text-zinc-800 font-sans antialiased flex">

            {/* Modular Layout Sidebar Left Block */}
            <Sidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                collapsed={sidebarCollapsed}
                setCollapsed={setSidebarCollapsed}
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
                    <DepartmentsView tenants={tenants} isOpen={showDepartment} onOpen={(tenant) => { setShowDepartment(true); setActiveTenant(tenant); }} onClose={() => setShowDepartment(false)} departments={departments} newDept={newDept} setNewDept={setNewDept} onAddDept={handleAddDepartment} />
                )}
                {activeTab === 'roles' && (
                    <RolesView roles={roles} newRole={newRole} setNewRole={setNewRole} onAddRole={() => { if (newRole) { setRoles([...roles, newRole]); setNewRole(''); } }} />
                )}
                {activeTab === 'permissions' && (
                    <PermissionsView roles={roles} permissions={permissions} rolePermissions={rolePermissions} setRolePermissions={setRolePermissions} onTogglePermission={handleTogglePermission} />
                )}
                {activeTab === 'users' && (
                    <UsersView users={users} tenants={tenants} roles={roles} departments={departments} newUser={newUser} setNewUser={setNewUser} onAddUser={handleAddUser} />
                )}
            </main>
        </div>
    );
}