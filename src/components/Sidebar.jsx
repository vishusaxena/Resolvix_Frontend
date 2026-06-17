import React from 'react';
import {
    ChevronLeft,
    ChevronRight,
    LogOut,
    HelpCircle
} from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getInitials } from '../utils/services';

export default function Sidebar({ menuItems = [], activeTab, setActiveTab, collapsed, setCollapsed, onLogout }) {
    const { user, logout } = useAuth();

    // Helper function to render an individual navigation button item
    const renderNavButton = (tab) => {
        // Highlight styling is determined purely by checking if it matches the activeTab ID
        const isSelected = activeTab === tab.id;

        // Resolve Icon component (handles both standard React components or string names)
        const IconComponent = typeof tab.icon === 'string'
            ? (LucideIcons[tab.icon] || HelpCircle)
            : (tab.icon || HelpCircle);

        return (
            <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                title={collapsed ? tab.label : ''}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 group relative ${isSelected
                    ? 'bg-emerald-600 text-white shadow-sm shadow-zinc-900/10'
                    : 'hover:bg-zinc-100 text-zinc-600 hover:text-zinc-900'
                    }`}
            >
                {/* Active tab accent line indicator */}
                {isSelected && (
                    <div className="absolute left-0 top-2.5 w-1 h-5 bg-emerald-500 rounded-r-md" />
                )}

                <IconComponent
                    size={18}
                    className={`shrink-0 transition-colors ${isSelected ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-600'
                        }`}
                />

                {!collapsed && (
                    <span className="truncate tracking-wide text-left flex-1">
                        {tab.label}
                    </span>
                )}
            </button>
        );
    };

    return (
        <aside
            className={`fixed top-0 left-0 h-full bg-white border-r border-zinc-200 flex flex-col justify-between transition-all duration-300 z-40 text-zinc-700 font-medium ${collapsed ? 'w-16' : 'w-64'
                }`}
        >
            <div className="relative flex flex-col flex-1 min-h-0">
                {/* Header Context / Branding */}
                <div className="h-16 border-b border-zinc-100 flex items-center px-4 overflow-hidden whitespace-nowrap justify-between shrink-0">
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

                    {/* Collapse Button */}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="absolute -right-3 top-5 bg-white border border-zinc-200 text-zinc-500 w-6 h-6 rounded-full flex items-center justify-center shadow-sm z-50 hover:bg-zinc-50 hover:text-zinc-800 transition-all"
                        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                    >
                        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
                    </button>
                </div>

                {/* Main Navigation Container */}
                <nav className="p-3 space-y-4 flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin">
                    {menuItems.map((menuItem, index) => {

                        // 1. If it's a standalone flat item and isActive is explicitly false, hide it.
                        if (menuItem.isActive === false) return null;

                        const isCategorizedGroup = menuItem.category && Array.isArray(menuItem.items);

                        if (isCategorizedGroup) {
                            // 2. Filter out items inside the category that have isActive set to false
                            const visibleSubItems = menuItem.items.filter(subItem => subItem.isActive !== false);

                            // If no sub-items are active, hide the whole category section completely
                            if (visibleSubItems.length === 0) return null;

                            return (
                                <div key={menuItem.category || index} className="space-y-1">
                                    {!collapsed && (
                                        <h3 className="text-[10px] font-bold tracking-wider text-zinc-400 uppercase px-3 pt-2 pb-1 block truncate">
                                            {menuItem.category}
                                        </h3>
                                    )}
                                    <div className="space-y-1">
                                        {visibleSubItems.map((subItem) => renderNavButton(subItem))}
                                    </div>
                                </div>
                            );
                        }

                        // Fallback logic path
                        return renderNavButton(menuItem);
                    })}
                </nav>
            </div>

            {/* User Session Footer Container */}
            <div className="border-t border-zinc-100 p-3 bg-zinc-50/50 space-y-3 shrink-0">
                <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3 px-1'}`}>
                    <div className="w-9 h-9 rounded-full bg-zinc-200 border border-zinc-300 text-zinc-700 flex items-center justify-center font-bold text-xs shrink-0 shadow-inner">
                        {user?.name ? getInitials(user.name) : 'SA'}
                    </div>
                    {!collapsed && (
                        <div className="flex flex-col min-w-0">
                            <span className="text-sm font-bold text-zinc-800 tracking-tight leading-none mb-1 truncate">
                                {user?.name || 'Session Admin'}
                            </span>
                            <span className="text-[11px] font-medium text-zinc-400 leading-none truncate">
                                Management Engine
                            </span>
                        </div>
                    )}
                </div>

                <button
                    onClick={logout || onLogout}
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