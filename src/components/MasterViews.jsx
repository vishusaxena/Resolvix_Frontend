import React, { useEffect, useState } from 'react';
import BoxCard, { CustomTable, InputGroup, SelectBox, Switch } from './UI';
import { ArrowLeft, Plus, RotateCcw, Building2, Check, Pencil } from 'lucide-react';

// --- 1. OVERVIEW DASHBOARD VIEW ---
export function DashboardView({ tenants, departments, roles, users }) {
    const metrics = [
        { title: 'Registered Tenants', value: tenants.length, desc: 'Active organizational structures' },
        { title: 'Departments Master', value: departments.length, desc: 'Global systemic sectors' },
        { title: 'Roles Created', value: roles.length, desc: 'Defined validation limits' },
        { title: 'Active Directories', value: users.length, desc: 'Profiles provisioned' },
    ];

    return (
        <div className="space-y-6 w-full">
            <div>
                <h1 className="text-lg font-bold text-zinc-800 tracking-tight">System Ecosystem</h1>
                <p className="text-xs text-zinc-400">Micro-analytics cross-referenced cleanly in real-time.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {metrics.map((card, idx) => (
                    <div key={idx} className="bg-white border border-zinc-200 rounded-xl p-4 shadow-sm">
                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">{card.title}</p>
                        <p className="text-2xl font-bold text-zinc-800 mt-1">{card.value}</p>
                        <p className="text-[11px] text-zinc-400 mt-0.5">{card.desc}</p>
                    </div>
                ))}
            </div>

            <div className="bg-white border border-zinc-200 rounded-xl p-4">
                <h3 className="text-xs font-semibold text-zinc-700 mb-3">Live Multi-Tenant Endpoints</h3>
                <div className="divide-y divide-zinc-100 text-xs">
                    {tenants.map(t => (
                        <div key={t.id} className="py-2.5 flex flex-col sm:flex-row justify-between gap-1">
                            <span className="font-medium text-zinc-700">{t.name}</span>
                            <div className="flex gap-4 text-[11px] font-mono text-emerald-600">
                                <span>Facility: <a href={t.facilityUrl} className="hover:underline">{t.facilityUrl}</a></span>
                                <span>Personal: <a href={t.personalUrl} className="hover:underline">{t.personalUrl}</a></span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// --- 2. TENANTS VIEW ---
export function TenantsView({ tenants, newTenant, setNewTenant, onCreateTenant, reset, onEditTenant }) {
    const [showForm, setShowForm] = useState(false);

    // Controlled validator indicators based on presence of data
    const formValidator = {
        organization: !!(newTenant.name && newTenant.industry),
        access: !!(newTenant.code && newTenant.subdomain && newTenant.facilityUrl && newTenant.personalUrl),
        admin: !!(newTenant.adminName && newTenant.adminEmail),
        contact: !!(newTenant.orgEmail || newTenant.website),
        address: !!(newTenant.addressLine1 && newTenant.city)
    };

    const handleReset = () => {
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
    };

    useEffect(() => {
        setShowForm(false);
    }, [reset]);

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-6 bg-zinc-50/50 min-h-screen text-zinc-800 antialiased">
            {/* Header Area */}
            <div className="mb-8 flex items-center justify-between border-b border-zinc-200 pb-5">
                {showForm ? (
                    <div className="flex gap-4 items-center">
                        <button
                            onClick={() => setShowForm(false)}
                            className="p-2 hover:bg-zinc-200/70 rounded-full transition-colors text-zinc-600"
                            aria-label="Go back"
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <div>
                            <h1 className="text-xl font-bold tracking-tight text-zinc-900">Add New Tenant</h1>
                            <p className="text-sm text-zinc-500 mt-0.5">Create isolated organizational environments and subdomains.</p>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-between w-full">
                        <div>
                            <h1 className="text-xl font-bold tracking-tight text-zinc-900">Tenants Framework</h1>
                            <p className="text-sm text-zinc-500 mt-0.5">Manage corporate structures and dedicated routing engines.</p>
                        </div>
                        <button
                            onClick={() => setShowForm(true)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm px-4 py-2 rounded-lg inline-flex items-center gap-1.5 shadow-sm shadow-emerald-600/10 transition-all active:scale-[0.98]"
                        >
                            <Plus size={16} />
                            Create New Tenant
                        </button>
                    </div>
                )}
            </div>

            {/* Main Content Area */}
            <div>
                {showForm ? (
                    <div className="space-y-10 w-full">

                        {/* Section 1: Organization Information */}
                        <div className="relative flex gap-6">
                            <div className="flex flex-col items-center">
                                <div className={`w-9 h-9 rounded-full flex justify-center items-center font-semibold text-sm transition-colors border ${formValidator.organization ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-white border-zinc-300 text-zinc-500'}`}>
                                    {formValidator.organization ? <Check size={16} /> : "1"}
                                </div>
                                <div className="w-0.5 bg-zinc-200 flex-grow my-2 min-h-[40px]"></div>
                            </div>
                            <BoxCard title="Organization Information" borderColor="border-t-emerald-500" className="bg-white flex-1 shadow-sm rounded-xl p-5 border border-zinc-200/80">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <InputGroup label="Tenant Code" placeholder="e.g. ACME001" value={newTenant.tenantCode || ''} disabled />
                                    <InputGroup label="Tenant Name" placeholder="e.g. Acme Corporation" value={newTenant.tenantName || ''} onChange={e => setNewTenant({ ...newTenant, tenantName: e.target.value })} />
                                    <InputGroup label="Industry Sector" placeholder="e.g. Healthcare" value={newTenant.tenantType || ''} onChange={e => setNewTenant({ ...newTenant, tenantType: e.target.value })} />
                                </div>
                            </BoxCard>
                        </div>


                        {/* Section 4: Contact Information */}
                        <div className="relative flex gap-6">
                            <div className="flex flex-col items-center">
                                <div className={`w-9 h-9 rounded-full flex justify-center items-center font-semibold text-sm transition-colors border ${formValidator.contact ? 'bg-amber-500 border-amber-500 text-white' : 'bg-white border-zinc-300 text-zinc-500'}`}>
                                    {formValidator.contact ? <Check size={16} /> : "2"}
                                </div>
                                <div className="w-0.5 bg-zinc-200 flex-grow my-2 min-h-[40px]"></div>
                            </div>
                            <BoxCard title="Contact Information" borderColor="border-t-amber-500" className="bg-white flex-1 shadow-sm rounded-xl p-5 border border-zinc-200/80">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                    <InputGroup label="Organization Email" placeholder="contact@acme.com" value={newTenant.tenantEmail || ''} onChange={e => setNewTenant({ ...newTenant, tenantEmail: e.target.value })} />
                                    <InputGroup label="Website" placeholder="https://acme.com" value={newTenant.tenantWebsite || ''} onChange={e => setNewTenant({ ...newTenant, tenantWebsite: e.target.value })} />
                                    <InputGroup label="Support Phone" placeholder="+91 9876543210" value={newTenant.tenantPhone || ''} onChange={e => setNewTenant({ ...newTenant, tenantPhone: e.target.value })} />
                                </div>
                            </BoxCard>
                        </div>

                        {/* Section 5: Address Information */}
                        <div className="relative flex gap-6">
                            <div className="flex flex-col items-center">
                                <div className={`w-9 h-9 rounded-full flex justify-center items-center font-semibold text-sm transition-colors border ${formValidator.address ? 'bg-pink-500 border-pink-500 text-white' : 'bg-white border-zinc-300 text-zinc-500'}`}>
                                    {formValidator.address ? <Check size={16} /> : "3"}
                                </div>
                            </div>
                            <BoxCard title="Address Information" borderColor="border-t-pink-500" className="bg-white flex-1 shadow-sm rounded-xl p-5 border border-zinc-200/80">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                    <div className="md:col-span-3">
                                        <InputGroup label="Address Line 1" placeholder="Street Address" value={newTenant.tenantAddress?.addressLine1 || ''} onChange={e => setNewTenant({ ...newTenant, tenantAddress: { ...newTenant.tenantAddress, addressLine1: e.target.value } })} />
                                    </div>
                                    <InputGroup label="City" placeholder="Delhi" value={newTenant.tenantAddress?.city || ''} onChange={e => setNewTenant({ ...newTenant, tenantAddress: { ...newTenant.tenantAddress, city: e.target.value } })} />
                                    <InputGroup label="State" placeholder="Delhi" value={newTenant.tenantAddress?.state || ''} onChange={e => setNewTenant({ ...newTenant, tenantAddress: { ...newTenant.tenantAddress, state: e.target.value } })} />
                                    <InputGroup label="Country" placeholder="India" value={newTenant.tenantAddress?.country || ''} onChange={e => setNewTenant({ ...newTenant, tenantAddress: { ...newTenant.tenantAddress, country: e.target.value } })} />
                                    <InputGroup label="Pincode" placeholder="110001" value={newTenant.tenantAddress?.pincode || ''} onChange={e => setNewTenant({ ...newTenant, tenantAddress: { ...newTenant.tenantAddress, pincode: e.target.value } })} />
                                </div>
                            </BoxCard>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-3 pt-6 border-t border-zinc-200 pl-15">
                            <button
                                type="button"
                                onClick={handleReset}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-300 text-zinc-700 bg-white hover:bg-zinc-50 font-medium text-sm transition"
                            >
                                <RotateCcw size={15} />
                                Reset
                            </button>
                            <button
                                type="button"
                                onClick={onCreateTenant}
                                className="flex items-center gap-2 px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm shadow-sm transition active:scale-95"
                            >
                                <Building2 size={15} />
                                Create Tenant
                            </button>
                        </div>
                    </div>
                ) : (
                    /* Clean Light Styled Table container wrapper */
                    <div className="bg-white rounded-xl shadow-sm border border-zinc-200/80 overflow-hidden">
                        <CustomTable
                            headers={['Tenant Status', 'Tenant Code', 'Tenant Name', 'Tenant Type', 'Action']}
                            data={tenants}
                            renderRow={(t) => (
                                <tr key={t.id} className="border-b border-zinc-100 last:border-none hover:bg-zinc-50/70 transition-colors">
                                    <td className="p-4 text-sm font-semibold text-zinc-900">
                                        <Switch checked={t.tenantStatus} />
                                    </td>
                                    <td className="p-4 text-sm text-zinc-600">{t.tenantCode}</td>
                                    <td className="p-4 font-mono text-xs text-emerald-600 font-medium">{t.tenantName}</td>
                                    <td className="p-4 font-mono text-xs text-emerald-600 font-medium">{t.tenantType}</td>
                                    <td className="p-4">
                                        <button className="text-emerald-600 hover:text-emerald-800 font-medium text-sm" onClick={() => { setShowForm(true); onEditTenant(t.tenantCode) }}>
                                            <Pencil size={16} />
                                        </button>
                                    </td>
                                </tr>
                            )}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

// --- 3. DEPARTMENTS VIEW ---
export function DepartmentsView({ tenants, departments, isOpen, onOpen, onClose, onAddDept, newDept, setNewDept }) {
    return (
        <div className="space-y-6 w-full">

            {!isOpen ? (
                <>
                    <div>
                        <h1 className="text-lg font-bold text-zinc-800">Departments Registry</h1>
                        <p className="text-xs text-zinc-400">Configure corporate sections usable cross-tenant.</p>
                    </div>
                    <CustomTable
                        headers={['Tenant Code', 'Tenant Name', 'Tenant Type', 'Action']}
                        data={tenants}
                        renderRow={(t) => (
                            <tr key={t.id} className="border-b border-zinc-100 last:border-none hover:bg-zinc-50/70 transition-colors">
                                <td className="p-4 text-sm text-zinc-600">{t.tenantCode}</td>
                                <td className="p-4 font-mono text-xs text-emerald-600 font-medium">{t.tenantName}</td>
                                <td className="p-4 font-mono text-xs text-emerald-600 font-medium">{t.tenantType}</td>
                                <td className="p-4">
                                    <button className="text-emerald-600 hover:text-emerald-800 font-medium text-sm" onClick={() => onOpen(t.tenantCode)}>
                                        <Pencil size={16} />
                                    </button>
                                </td>
                            </tr>
                        )}
                    /></>) : (
                <>

                    <div className="mb-6 flex items-center gap-4">
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-zinc-200/70 rounded-full transition-colors text-zinc-600"
                            aria-label="Go back"
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <h1 className="text-xl font-bold tracking-tight text-zinc-900">Add Department</h1>
                    </div>
                    <BoxCard title="Department Details" borderColor="border-emerald-500" className="bg-white shadow-sm rounded-xl p-5 border border-zinc-200/80">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            <InputGroup
                                label="Department Code"
                                placeholder="DEP-001"
                                value={newDept.departmentCode}
                                onChange={e => setNewDept({ ...newDept, departmentCode: e.target.value })}
                                disabled
                            />

                            <InputGroup
                                label="Department Name"
                                placeholder="e.g. Human Resources"
                                value={newDept.departmentName}
                                onChange={e => setNewDept({ ...newDept, departmentName: e.target.value })}
                            />

                            <div className="flex items-end h-full pb-1">
                                <Switch
                                    checked={newDept.departmentStatus}
                                    onChange={() => setNewDept({ ...newDept, departmentStatus: !newDept.departmentStatus })}
                                    label="Active"
                                />
                            </div>
                        </div>
                        <button onClick={onAddDept} className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm px-4 py-2 rounded-lg inline-flex items-center gap-1.5 shadow-sm shadow-emerald-600/10 transition-all active:scale-[0.98]">
                            <Plus size={16} />
                            Add Department
                        </button>
                    </BoxCard>
                    <CustomTable
                        headers={['Department Code', 'Department Name', 'Status']}
                        data={departments}
                        renderRow={(dept) => (
                            <tr key={dept.id} className="border-b border-zinc-100 last:border-none hover:bg-zinc-50/70 transition-colors">
                                <td className="p-4 text-sm text-zinc-600">{dept.departmentCode}</td>
                                <td className="p-4 font-mono text-xs text-emerald-600 font-medium">{dept.departmentName}</td>
                                <td className="p-4">
                                    {dept.departmentStatus ? (
                                        <span className="text-emerald-600 font-medium text-sm">Active</span>
                                    ) : (
                                        <span className="text-red-600 font-medium text-sm">Inactive</span>
                                    )}
                                </td>
                            </tr>
                        )}
                    />
                </>
            )}

        </div>
    );
}

// --- 4. ROLES VIEW ---
export function RolesView({ roles, newRole, setNewRole, onAddRole }) {
    return (
        <div className="space-y-6 w-full">
            <div>
                <h1 className="text-lg font-bold text-zinc-800">Roles Dictionary</h1>
                <p className="text-xs text-zinc-400">Manage systemic functional names across operational domains.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                <div className="bg-white border border-zinc-200 rounded-xl p-4 space-y-3 shadow-sm">
                    <InputGroup label="Access Signature Authority Title" placeholder="e.g. Compliance Agent" value={newRole.roleName} onChange={e => setNewRole({ ...newRole, roleName: e.target.value })} />
                    <Switch checked={newRole.roleStatus} label={"Active"} customClass={"justify-end"} onChange={(e) => setNewRole({ ...newRole, roleStatus: !newRole.roleStatus })} />
                    <button onClick={onAddRole} className="flex justify-around items-center px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs rounded-md transition-colors">
                        <Plus size={16} /> Add Role
                    </button>
                </div>
                <div className="md:col-span-2">
                    <CustomTable
                        headers={['Role Code', 'Role', 'Status']}
                        data={roles}
                        renderRow={(role, index) => (
                            <tr key={index} className="hover:bg-zinc-50/50">
                                <td className="p-3 text-zinc-400 font-mono text-[11px]">{role.roleCode}</td>
                                <td className="p-3 font-medium text-zinc-800">{role.roleName}</td>
                                <td className="p-4">
                                    {role.roleStatus ? (
                                        <span className="text-emerald-600 font-medium text-sm">Active</span>
                                    ) : (
                                        <span className="text-red-600 font-medium text-sm">Inactive</span>
                                    )}
                                </td>
                            </tr>
                        )}
                    />
                </div>
            </div>
        </div>
    );
}

// --- 5. ASSIGN PERMISSIONS VIEW (SWITCH COMPONENT INTEGRATION) ---
// export function PermissionsView({ roles, permissions, rolePermissions, setRolePermissions, onTogglePermission }) {
//     return (
//         <div className="space-y-6 w-full">
//             <div>
//                 <h1 className="text-lg font-bold text-zinc-800">Clearance Access Matrices</h1>
//                 <p className="text-xs text-zinc-400">Map specific action scopes directly onto system security layers via toggle primitives.</p>
//             </div>
//             <div className="bg-white border border-zinc-200 rounded-xl p-5 space-y-4 shadow-sm">
//                 <div className="max-w-xs">
//                     <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">Target Access Architecture</label>
//                     <select
//                         value={rolePermissions.role}
//                         onChange={e => setRolePermissions({ ...rolePermissions, role: e.target.value })}
//                         className="w-full bg-white border border-zinc-200 rounded-md px-2.5 py-1.5 text-xs text-zinc-700 focus:outline-none focus:border-emerald-600"
//                     >
//                         <option value="">Select Target Assignment Template...</option>
//                         {roles.map((r, i) => <option key={i} value={r}>{r}</option>)}
//                     </select>
//                 </div>

//                 {rolePermissions.role ? (
//                     <div className="space-y-2 pt-2 border-t border-zinc-100">
//                         <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wide mb-2">
//                             Toggle Matrix Operations For: "{rolePermissions.role}"
//                         </label>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                             {permissions.map((perm) => (
//                                 <Switch
//                                     key={perm.id}
//                                     label={perm.name}
//                                     description={perm.description}
//                                     checked={rolePermissions.assigned.includes(perm.name)}
//                                     onChange={() => onTogglePermission(perm.name)}
//                                 />
//                             ))}
//                         </div>
//                     </div>
//                 ) : (
//                     <div className="text-center py-8 border border-dashed border-zinc-200 rounded-xl text-zinc-400 text-xs italic">
//                         Select a target role configuration schema parameter above to map routing permission sets.
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// --- 6. USER MASTER CONFIGURATION VIEW ---
export function UsersView({ newUser, setNewUser, users, onAddUser, tenants, onOpen, isOpen, onClose, activeTenant }) {
    return (
        <div className="space-y-6 w-full">
            {!isOpen ? (
                <> <div>
                    <h1 className="text-lg font-bold text-zinc-800">Directory Account Architectures</h1>
                    <p className="text-xs text-zinc-400">Register employee profiles and map explicit system constraints cleanly.</p>
                </div>
                    <CustomTable
                        headers={['Tenant Code', 'Tenant Name', 'Tenant Type', 'Action']}
                        data={tenants}
                        renderRow={(t) => (
                            <tr key={t.id} className="border-b border-zinc-100 last:border-none hover:bg-zinc-50/70 transition-colors">
                                <td className="p-4 text-sm text-zinc-600">{t.tenantCode}</td>
                                <td className="p-4 font-mono text-xs text-emerald-600 font-medium">{t.tenantName}</td>
                                <td className="p-4 font-mono text-xs text-emerald-600 font-medium">{t.tenantType}</td>
                                <td className="p-4">
                                    <button className="text-emerald-600 hover:text-emerald-800 font-medium text-sm" onClick={() => onOpen(t.tenantCode)}>
                                        <Pencil size={16} />
                                    </button>
                                </td>
                            </tr>
                        )}
                    /></>

            ) : (
                <> <div className="mb-6 flex items-center gap-4">
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-zinc-200/70 rounded-full transition-colors text-zinc-600"
                        aria-label="Go back"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="text-xl font-bold tracking-tight text-zinc-900">Add Users</h1>
                </div>
                    <BoxCard title="User Details" borderColor="border-emerald-500" className="bg-white shadow-sm rounded-xl p-5 border border-zinc-200/80 ">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            <InputGroup
                                label="Name"
                                placeholder="Name"
                                onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                                value={newUser.name}
                            />
                            <InputGroup
                                label="Email"
                                placeholder="Email"
                                onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                                value={newUser.email}
                            />
                            <InputGroup
                                label="Password"
                                placeholder="Password"
                                onChange={e => setNewUser({ ...newUser, password: e.target.value })}
                                value={newUser.password}
                            />
                            <SelectBox
                                label="Assign Role"
                                type="roles"
                                placeholder="Select a Role"
                                onChange={role => setNewUser({ ...newUser, role: role })}
                                value={newUser.role}
                            />

                            <SelectBox
                                label="Assign Department"
                                type="departments"
                                tenantId={activeTenant}
                                placeholder="Select a department"
                                onChange={dept => setNewUser({ ...newUser, department: dept })}
                                value={newUser.department}
                            />
                            <Switch checked={newUser.isActive} label={"Active"} onChange={e => setNewUser({ ...newUser, isActive: !newUser.isActive })} customClass={"mt-5"} />


                        </div>
                        <button onClick={onAddUser} className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm px-4 py-2 rounded-lg inline-flex items-center gap-1.5 shadow-sm shadow-emerald-600/10 transition-all active:scale-[0.98]">
                            <Plus size={16} />
                            Add User
                        </button>
                    </BoxCard>
                    <CustomTable
                        headers={['User Code', 'Name', 'Email', 'Role', 'Department', 'Status']}
                        data={users}
                        renderRow={(u) => (
                            <tr key={u.id} className="hover:bg-zinc-50/50 transition-colors">
                                <td className="p-3">
                                    <p className="font-medium text-zinc-800">{u.userCode}</p>
                                </td>
                                <td className="p-3 text-zinc-600 font-medium">{u.name}</td>
                                <td className="p-3 text-zinc-600 font-medium">{u.email}</td>
                                <td className="p-3">
                                    <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-[11px] font-semibold border border-emerald-100">
                                        {u.role || 'System Default Scope'}
                                    </span>
                                </td>
                                <td className="p-3 text-zinc-500 font-medium">{u.department || 'Unassigned Core'}</td>
                                <td className="p-4">
                                    {u.isActive ? (
                                        <span className="text-emerald-600 font-medium text-sm">Active</span>
                                    ) : (
                                        <span className="text-red-600 font-medium text-sm">Inactive</span>
                                    )}
                                </td>
                            </tr>
                        )}
                    /></>
            )}



        </div>
    );
}