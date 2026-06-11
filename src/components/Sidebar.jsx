import React from 'react';
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

export default function Sidebar({ activeTab, setActiveTab, collapsed, setCollapsed, onLogout }) {
    const menuItems = [
        { id: 'dashboard', label: 'Overview Dashboard', icon: LayoutDashboard },
        { id: 'tenants', label: 'Tenants System', icon: Building2 },
        { id: 'departments', label: 'Departments Master', icon: FolderTree },
        { id: 'roles', label: 'Roles Architecture', icon: KeyRound },
        { id: 'permissions', label: 'Access Matrices', icon: ShieldAlert },
        { id: 'users', label: 'User Master Directory', icon: Users },
    ];

    return (
        <aside
            className={`fixed top-0 left-0 h-full bg-white border-r border-zinc-200 flex flex-col justify-between transition-all duration-300 z-40 text-zinc-700 font-medium ${collapsed ? 'w-16' : 'w-64'
                }`}
        >
            <div className="relative">
                {/* Header Context / Branding */}
                <div className="h-16 border-b border-zinc-100 flex items-center px-4 overflow-hidden whitespace-nowrap justify-between">
                    {!collapsed ? (
                        <div className="flex items-center gap-2.5 animate-fadeIn">
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 shadow-sm shadow-emerald-600/30" />
                            <span className="text-lg font-bold tracking-tight text-zinc-900">
                                Resolvix
                            </span>
                        </div>
                    ) : (
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 mx-auto" />
                    )}

                    {/* Collapse Button: Positioned cleanly inline/edge boundary */}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="absolute -right-3 top-5 bg-white border border-zinc-200 text-zinc-500 w-6 h-6 rounded-full flex items-center justify-center shadow-sm z-50 hover:bg-zinc-50 hover:text-zinc-800 transition-all"
                        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                    >
                        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="p-3 space-y-1">
                    {menuItems.map((tab) => {
                        const isSelected = activeTab === tab.id;
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                title={collapsed ? tab.label : ''}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 group relative ${isSelected
                                    ? 'bg-zinc-900 text-white shadow-sm shadow-zinc-900/10'
                                    : 'hover:bg-zinc-100 text-zinc-600 hover:text-zinc-900'
                                    }`}
                            >
                                {/* Subtle indicator accent for active tabs */}
                                {isSelected && (
                                    <div className="absolute left-0 top-2.5 w-1 h-5 bg-emerald-500 rounded-r-md" />
                                )}

                                <Icon
                                    size={18}
                                    className={`shrink-0 transition-colors ${isSelected ? 'text-emerald-400' : 'text-zinc-400 group-hover:text-zinc-600'
                                        }`}
                                />
                                {!collapsed && <span className="truncate tracking-wide">{tab.label}</span>}
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* User Session Footer */}
            <div className="border-t border-zinc-100 p-3 bg-zinc-50/50 space-y-3">
                {/* Profile Details Area */}
                <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3 px-1'}`}>
                    <div className="w-9 h-9 rounded-full bg-zinc-200 border border-zinc-300 text-zinc-700 flex items-center justify-center font-bold text-xs shrink-0 shadow-inner">
                        SA
                    </div>
                    {!collapsed && (
                        <div className="flex flex-col min-w-0">
                            <span className="text-sm font-bold text-zinc-800 tracking-tight leading-none mb-1 truncate">
                                Super Admin
                            </span>
                            <span className="text-[11px] font-medium text-zinc-400 leading-none truncate">
                                Management Engine
                            </span>
                        </div>
                    )}
                </div>

                {/* Logout Action */}
                <button
                    onClick={onLogout}
                    title={collapsed ? "Logout" : ""}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-bold transition-all ${collapsed
                        ? 'justify-center text-zinc-400 hover:bg-zinc-100 hover:text-red-600'
                        : 'bg-zinc-200/50 hover:bg-red-50 text-zinc-700 hover:text-red-600 border border-transparent hover:border-red-100'
                        }`}
                >
                    <LogOut size={15} className="shrink-0" />
                    {!collapsed && <span>Exit Session</span>}
                </button>
            </div>
        </aside>
    );
}