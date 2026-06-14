import React from 'react';
import {
    LayoutDashboard, BarChart3, Files, FilePlus, FileClock,
    Clock, CheckCircle, Archive, UserCheck, RefreshCw,
    GitFork, LogOut, Bell, HelpCircle, AlertTriangle
} from 'lucide-react';

const DashboardView = () => {
    // Mock data matching watermarked_img_14537528090858806961.png specs
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

    return (
        <div className="flex-1 bg-zinc-50 text-zinc-800 min-h-screen  overflow-y-auto relative selection:bg-emerald-500/20">



            {/* MAIN VIEWPORT FRAME */}
            <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">

                {/* TOP NAVBAR (Referencing structural identity fields from watermarked_img_14537528090858806961.png) */}
                <header className="h-16  bg-white border-b border-neutral-200 flex items-center justify-between px-6 sticky top-0 z-10">
                    <div className="flex items-center space-x-4">
                        {/* TIBL Corporate Tenant Identity Logo Placement */}
                        <div className="flex items-center bg-neutral-100 px-3 py-1.5 rounded-md border border-neutral-200">
                            <span className="text-xs font-black tracking-widest text-emerald-800">TIBL</span>
                        </div>
                    </div>

                    {/* User Meta Data & Notifications */}
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-3 border-r border-neutral-200 pr-4">
                            <div className="text-right">
                                <p className="text-sm font-semibold text-neutral-800">HOD - Dr. Sarah Chen</p>
                                <p className="text-xs text-neutral-500">TIBL - Management Engine</p>
                            </div>
                            <div className="w-9 h-9 rounded-full bg-neutral-200 overflow-hidden border border-neutral-300">
                                <div className="w-full h-full bg-slate-400 flex items-center justify-center text-white text-xs font-bold">SC</div>
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
                            HOD Grievance Dashboard - Computer Science (TIBL)
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
                                {/* Dynamic mini trend indicator placeholder */}
                                <div className="mt-4 pt-2 border-t border-neutral-50 flex items-center justify-between text-xs">
                                    <span className={`${card.color} font-medium flex items-center`}>
                                        ● Live Tracking
                                    </span>
                                    <div className="w-24 h-6 opacity-40 bg-gradient-to-r from-transparent to-emerald-200 rounded"></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* GRID ROW 2: MAIN CHARTS & DETAILED CASE ANALYTICS */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* Department Performance Data Block Chart Mockup */}
                        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-neutral-200 shadow-sm flex flex-col justify-between">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-base font-bold text-neutral-800">Department Performance at a Glance</h3>
                                <div className="flex items-center space-x-3 text-xs text-neutral-500">
                                    <span className="flex items-center"><span className="w-2.5 h-2.5 bg-emerald-600 rounded-sm mr-1"></span>Facility</span>
                                    <span className="flex items-center"><span className="w-2.5 h-2.5 bg-amber-500 rounded-sm mr-1"></span>IT</span>
                                    <span className="flex items-center"><span className="w-2.5 h-2.5 bg-rose-600 rounded-sm mr-1"></span>Admin</span>
                                </div>
                            </div>

                            {/* Visual Presentation Core Grid Layout Component */}
                            <div className="h-64 bg-neutral-50 rounded-lg border border-dashed border-neutral-200 flex items-center justify-center text-neutral-400 text-sm font-medium">
                                [ Interactive Bar Chart Component Content Frame Window ]
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

                        {/* Monthly Trend Data Monitor Block Chart Window */}
                        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-neutral-200 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-base font-bold text-neutral-800">Monthly Trend Analysis</h3>
                                <div className="flex items-center space-x-3 text-xs text-neutral-500">
                                    <span className="flex items-center"><span className="w-2.5 h-2.5 bg-emerald-600 rounded-full mr-1"></span>Submission</span>
                                    <span className="flex items-center"><span className="w-2.5 h-2.5 bg-neutral-400 rounded-full mr-1"></span>Resolution</span>
                                </div>
                            </div>
                            <div className="h-48 bg-neutral-50 rounded-lg border border-dashed border-neutral-200 flex items-center justify-center text-neutral-400 text-sm font-medium">
                                [ Monthly Trend Line Area Visualization Engine ]
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