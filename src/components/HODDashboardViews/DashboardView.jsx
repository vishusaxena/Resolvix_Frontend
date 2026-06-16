import React from 'react';
import { Bell, HelpCircle, AlertTriangle } from 'lucide-react';
import { getInitials } from '../../utils/services';

const DashboardView = ({ userData }) => {
    const stats = [
        { label: 'Total Pending', value: '42', trend: 'up', color: 'text-emerald-600' },
        { label: 'Average Resolution Time', value: '4.2 days', trend: 'stable', color: 'text-emerald-600' },
        { label: 'Grievances in SLA Missed', value: '8', trend: 'down', color: 'text-rose-600' },
        { label: 'Resolution Rate', value: '88%', trend: 'up', color: 'text-emerald-600' },
    ];

    const highPriorityCases = [
        { id: '#1024', priority: 'Critical', priorityBg: 'bg-rose-700 text-white', assignee: 'Sarah Cohen', date: '10/12/2023', status: 'Critical' },
        { id: '#1025', priority: 'Medium', priorityBg: 'bg-amber-500 text-white', assignee: 'Dr. Sarah', date: '10/12/2023', status: 'Student' },
        { id: '#1032', priority: 'Low', priorityBg: 'bg-yellow-400 text-neutral-800', assignee: 'Sarah Chen', date: '10/12/2023', status: 'Closed' },
        { id: '#1055', priority: 'Low', priorityBg: 'bg-yellow-400 text-neutral-800', assignee: 'Dr. Sarah', date: '10/12/2023', status: 'Escalated' },
    ];

    const actionItems = [
        { id: 1, text: 'Review Escalated Case #1024' },
        { id: 2, text: 'Acknowledge SLA Missed for #1055' },
        { id: 3, text: 'Acknowledge SLA Missed for #1053' },
        { id: 4, text: 'Acknowledge SLA Missed for #1054' },
        { id: 5, text: 'Acknowledge SLA Missed for #1056' },
    ];

    // --- CHART MATRIX DATA FEEDS ---
    const DEPT_PERFORMANCE_DATA = [
        { label: 'Unit A', facility: 45, it: 30, admin: 15 },
        { label: 'Unit B', facility: 35, it: 55, admin: 20 },
        { label: 'Unit C', facility: 60, it: 25, admin: 10 },
        { label: 'Unit D', facility: 40, it: 40, admin: 35 },
    ];

    const MONTHLY_TREND_DATA = [
        { month: 'Jan', submissions: 30, resolutions: 20 },
        { month: 'Feb', submissions: 45, resolutions: 38 },
        { month: 'Mar', submissions: 35, resolutions: 42 },
        { month: 'Apr', submissions: 60, resolutions: 50 },
        { month: 'May', submissions: 55, resolutions: 58 },
        { month: 'Jun', submissions: 70, resolutions: 62 },
    ];

    return (
        <div className="flex-1 bg-zinc-50 text-zinc-800 min-h-screen overflow-y-auto relative selection:bg-emerald-500/20">

            {/* MAIN VIEWPORT FRAME */}
            <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">

                {/* TOP NAVBAR */}
                <header className="h-16 bg-white border-b border-neutral-200 flex items-center justify-between px-6 sticky top-0 z-10">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center bg-neutral-100 px-3 py-1.5 rounded-md border border-neutral-200">
                            <span className="text-xs font-black tracking-widest text-emerald-800">{userData.tenantName}</span>
                        </div>
                    </div>

                    {/* User Meta Data & Notifications */}
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-3 border-r border-neutral-200 pr-4">
                            <div className="text-right">
                                <p className="text-sm font-semibold text-neutral-800">{`${userData.role} - ${userData.name}`}</p>
                                <p className="text-xs text-neutral-500">{userData.tenantName} - Management Engine</p>
                            </div>
                            <div className="w-9 h-9 rounded-full bg-neutral-200 overflow-hidden border border-neutral-300">
                                <div className="w-full h-full bg-slate-400 flex items-center justify-center text-white text-xs font-bold">
                                    {getInitials(userData.name)}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2 text-neutral-500">
                            <button className="p-2 hover:bg-neutral-100 rounded-full transition-colors relative">
                                <Bell size={20} />
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"></span>
                            </button>
                            <button className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
                                <HelpCircle size={20} />
                            </button>
                        </div>
                    </div>
                </header>

                {/* DASHBOARD CONTAINER WORKSPACE */}
                <main className="p-6 space-y-6 flex-1 overflow-y-auto">

                    {/* Section View Heading Label */}
                    <div>
                        <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
                            HOD Grievance Dashboard - <span className="text-neutral-500 font-medium">{userData.department}</span>
                        </h1>
                    </div>

                    {/* GRID ROW 1: QUICK ANALYTICS METRICS */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {stats.map((card, index) => (
                            <div key={index} className="bg-white p-5 rounded-xl border border-neutral-200 shadow-sm flex flex-col justify-between">
                                <div>
                                    <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">{card.label}</p>
                                    <p className="text-2xl font-bold text-neutral-900 mt-2">{card.value}</p>
                                </div>
                                <div className="mt-4 pt-2 border-t border-neutral-50 flex items-center justify-between text-xs">
                                    <span className={`${card.color} font-medium flex items-center gap-1.5`}>
                                        <span className="h-2 w-2 rounded-full bg-current animate-pulse" /> Live Tracking
                                    </span>
                                    <div className="w-24 h-6 opacity-40 bg-gradient-to-r from-transparent to-emerald-200 rounded"></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* GRID ROW 2: MAIN CHARTS & DETAILED CASE ANALYTICS */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* Department Performance Stacked Column Visualization */}
                        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-neutral-200 shadow-sm flex flex-col justify-between">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-base font-bold text-neutral-800">Department Performance at a Glance</h3>
                                <div className="flex items-center space-x-3 text-xs text-neutral-500">
                                    <span className="flex items-center"><span className="w-2.5 h-2.5 bg-emerald-600 rounded-sm mr-1"></span>Facility</span>
                                    <span className="flex items-center"><span className="w-2.5 h-2.5 bg-amber-500 rounded-sm mr-1"></span>IT</span>
                                    <span className="flex items-center"><span className="w-2.5 h-2.5 bg-rose-600 rounded-sm mr-1"></span>Admin</span>
                                </div>
                            </div>

                            {/* Pure Flexbox-Stacked Modular Column Graph Matrix */}
                            <div className="h-64 bg-neutral-50/50 rounded-lg border border-neutral-200 p-4 flex items-end justify-around gap-2 pt-8">
                                {DEPT_PERFORMANCE_DATA.map((item, index) => {
                                    const total = item.facility + item.it + item.admin;
                                    // Scale configuration based on a max capacity metric index of 140
                                    const facHeight = (item.facility / 140) * 100;
                                    const itHeight = (item.it / 140) * 100;
                                    const admHeight = (item.admin / 140) * 100;

                                    return (
                                        <div key={index} className="flex flex-col items-center gap-2 group h-full justify-end flex-1 max-w-[50px]">
                                            {/* Data context popup panel */}
                                            <div className="opacity-0 group-hover:opacity-100 absolute mb-48 bg-neutral-900 text-white text-[10px] p-2 rounded pointer-events-none transition-opacity shadow-lg z-20 text-left font-mono">
                                                <p className="border-b border-neutral-700 font-bold mb-1 pb-0.5">Total: {total}</p>
                                                <p className="text-emerald-400">Facility: {item.facility}</p>
                                                <p className="text-amber-400">IT: {item.it}</p>
                                                <p className="text-rose-400">Admin: {item.admin}</p>
                                            </div>

                                            <div className="w-full flex flex-col justify-end h-full rounded-t overflow-hidden shadow-xs">
                                                <div style={{ height: `${admHeight}%` }} className="bg-rose-600 w-full hover:brightness-95 transition-all" />
                                                <div style={{ height: `${itHeight}%` }} className="bg-amber-500 w-full hover:brightness-95 transition-all" />
                                                <div style={{ height: `${facHeight}%` }} className="bg-emerald-600 w-full hover:brightness-95 transition-all" />
                                            </div>
                                            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wide truncate max-w-full">
                                                {item.label}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* High Priority Realtime Cases Processing List Data Grid */}
                        <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm flex flex-col justify-between">
                            <div>
                                <h3 className="text-base font-bold text-neutral-800 mb-4">High Priority Cases</h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-xs">
                                        <thead>
                                            <tr className="border-b border-neutral-200 text-neutral-400 font-semibold uppercase tracking-wider">
                                                <th className="pb-3">Grievance</th>
                                                <th className="pb-3">Priority</th>
                                                <th className="pb-3">Assignee</th>
                                                <th className="pb-3 text-right">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-neutral-100 text-neutral-700">
                                            {highPriorityCases.map((row, index) => (
                                                <tr key={index} className="hover:bg-neutral-50/50 transition-colors">
                                                    <td className="py-3 font-semibold text-emerald-700">{row.id}</td>
                                                    <td className="py-3">
                                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase ${row.priorityBg}`}>
                                                            {row.priority}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 text-neutral-500">{row.assignee}</td>
                                                    <td className="py-3 text-right font-medium text-neutral-600">{row.status}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* GRID ROW 3: TREND LINES & ACTION WIDGETS */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* Responsive SVG Area/Line Micro-Engine */}
                        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-neutral-200 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-base font-bold text-neutral-800">Monthly Trend Analysis</h3>
                                <div className="flex items-center space-x-3 text-xs text-neutral-500">
                                    <span className="flex items-center"><span className="w-2.5 h-2.5 bg-emerald-600 rounded-full mr-1"></span>Submission</span>
                                    <span className="flex items-center"><span className="w-2.5 h-2.5 bg-neutral-400 rounded-full mr-1"></span>Resolution</span>
                                </div>
                            </div>

                            {/* Native Vector SVG Coordinate Grid Rendering */}
                            <div className="h-48 bg-neutral-50/50 rounded-lg border border-neutral-200 p-2 relative">
                                <svg viewBox="0 0 600 160" className="w-full h-full overflow-visible">
                                    {/* Submissions Area Fill and Line Track */}
                                    <path
                                        d="M 10 140 L 110 110 L 210 125 L 310 80 L 410 90 L 510 60 L 510 150 L 10 150 Z"
                                        className="fill-emerald-500/10"
                                    />
                                    <path
                                        d="M 10 140 L 110 110 L 210 125 L 310 80 L 410 90 L 510 60"
                                        fill="none"
                                        stroke="#059669"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />

                                    {/* Resolutions Line Track */}
                                    <path
                                        d="M 10 150 L 110 125 L 210 115 L 310 95 L 410 85 L 510 75"
                                        fill="none"
                                        stroke="#9ca3af"
                                        strokeWidth="2.5"
                                        strokeDasharray="4 4"
                                        strokeLinecap="round"
                                    />

                                    {/* Node Point Overlay Vectors */}
                                    {[
                                        { x: 10, y: 140 }, { x: 110, y: 110 }, { x: 210, y: 125 },
                                        { x: 310, y: 80 }, { x: 410, y: 90 }, { x: 510, y: 60 }
                                    ].map((pt, idx) => (
                                        <circle key={idx} cx={pt.x} cy={pt.y} r="3.5" className="fill-white stroke-emerald-600 stroke-2" />
                                    ))}
                                </svg>

                                {/* Horizontal Bottom Row X-Axis Tick Labels */}
                                <div className="absolute bottom-1 left-0 right-0 px-3 flex justify-between text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                                    {MONTHLY_TREND_DATA.map((d, i) => (
                                        <span key={i}>{d.month}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Action Items List Context Widget Box */}
                        <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm flex flex-col justify-between">
                            <div>
                                <h3 className="text-base font-bold text-neutral-800 mb-3">Action Items for HOD</h3>
                                <div className="space-y-2">
                                    {actionItems.map((item) => (
                                        <div key={item.id} className="flex items-start space-x-3 p-2.5 bg-neutral-50 border border-neutral-100 rounded-lg hover:border-neutral-200 transition-all cursor-pointer">
                                            <AlertTriangle size={15} className="text-amber-500 mt-0.5 flex-shrink-0" />
                                            <p className="text-xs text-neutral-700 font-medium leading-relaxed">{item.text}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                </main>
            </div>
        </div>
    );
};

export default DashboardView;