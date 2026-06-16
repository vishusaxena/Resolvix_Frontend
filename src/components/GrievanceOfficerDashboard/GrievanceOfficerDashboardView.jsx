import React from "react";
import { useAuth } from "../../context/AuthContext";
import { getInitials } from "../../utils/services";

// --- STRUCTURAL PROFILE & STATS CONFIGS ---
const USER_PROFILE = {
    name: "Ananya Sharma",
    role: "Grievance Management Officer",
    department: "Computer Science Unit",
    tenant: "SRMS College of Engineering and Technology",
    systemEngine: "Management Engine"
};

const METRIC_CARDS = [
    {
        label: "TOTAL PENDING",
        value: "42",
        subtext: "Live Tracking",
        isAlert: false
    },
    {
        label: "AVERAGE RESOLUTION TIME",
        value: "4.2 days",
        subtext: "Live Tracking",
        isAlert: false
    },
    {
        label: "GRIEVANCES IN SLA MISSED",
        value: "8",
        subtext: "Requires Action",
        isAlert: true
    },
    {
        label: "RESOLUTION RATE",
        value: "88%",
        subtext: "Live Tracking",
        isAlert: false
    }
];

// --- GRAPH MATRIX DATAFEED ---
const TIMELINE_DATA = [
    { label: "Jan", resolved: 65, inProgress: 24, escalated: 6 },
    { label: "Feb", resolved: 78, inProgress: 18, escalated: 4 },
    { label: "Mar", resolved: 82, inProgress: 30, escalated: 12 },
    { label: "Apr", resolved: 95, inProgress: 15, escalated: 5 },
    { label: "May", resolved: 110, inProgress: 22, escalated: 8 },
    { label: "Jun", resolved: 88, inProgress: 35, escalated: 9 }
];

export default function GrievanceOfficerDashboardOnly() {
    const { user } = useAuth();

    // Compute maximum cumulative peak to scale the SVG grid accurately
    const maxVal = Math.max(...TIMELINE_DATA.map(d => d.resolved + d.inProgress + d.escalated));

    return (
        <div className="min-h-screen bg-zinc-50 font-sans text-zinc-800 flex flex-col antialiased">

            {/* TOP BAR BRAND TRACK: Replicated verbatim from image_f77b29.png */}
            <header className="bg-white border-b border-zinc-200 px-6 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shrink-0">
                {/* Institutional Tenant Badge */}
                <div className="bg-emerald-50/60 border border-emerald-600/20 px-3 py-1.5 rounded-lg">
                    <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide">
                        {USER_PROFILE.tenant}
                    </span>
                </div>

                {/* Officer Profile Credentials Context */}
                <div className="flex items-center gap-4 self-end sm:self-auto text-right">
                    <div className="text-xs">
                        <p className="font-bold text-zinc-900">
                            {USER_PROFILE.role} - <span className="text-zinc-700">{user?.name || USER_PROFILE.name}</span>
                        </p>
                        <p className="text-zinc-400 text-[10px]">
                            {USER_PROFILE.tenant} - {USER_PROFILE.systemEngine}
                        </p>
                    </div>

                    {/* User Avatar Group */}
                    <div className="h-9 w-9 rounded-full bg-zinc-200 text-zinc-700 flex items-center justify-center font-bold text-xs border border-zinc-300 shadow-2xs">
                        {getInitials(user?.name || USER_PROFILE.name)}
                    </div>

                    {/* Notification Utility Block */}
                    <div className="flex items-center gap-2 text-zinc-400 border-l border-zinc-200 pl-3">
                        <span className="text-base relative cursor-pointer hover:text-zinc-600">
                            🔔
                            <span className="absolute -top-1 -right-1 h-2 w-2 bg-rose-500 rounded-full" />
                        </span>
                    </div>
                </div>
            </header>

            {/* MAIN DASHBOARD SPACE */}
            <main className="flex-1 p-6 space-y-6 max-w-[1600px] w-full mx-auto flex flex-col">

                {/* TITLE HEADING BANNER */}
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">
                        Officer Grievance Dashboard - <span className="text-zinc-600 font-medium">{USER_PROFILE.department}</span>
                    </h1>
                </div>

                {/* ANALYTICAL KPI METRIC CARDS MATRIX */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {METRIC_CARDS.map((metric, i) => (
                        <div key={i} className="bg-white rounded-xl border border-zinc-200 p-5 shadow-xs flex flex-col justify-between min-h-[130px]">
                            <div>
                                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                                    {metric.label}
                                </span>
                                <span className="text-3xl font-bold text-zinc-900 tracking-tight block mt-2">
                                    {metric.value}
                                </span>
                            </div>

                            {/* Interactive Tracking Pulse Strip Footer */}
                            <div className="flex items-center justify-between pt-4 border-t border-zinc-50">
                                <div className="flex items-center gap-1.5 text-[11px] font-medium">
                                    <span className={`h-2 w-2 rounded-full ${metric.isAlert ? 'bg-rose-600 animate-pulse' : 'bg-emerald-600'}`} />
                                    <span className={metric.isAlert ? 'text-rose-600 font-bold' : 'text-emerald-700'}>
                                        {metric.subtext}
                                    </span>
                                </div>
                                <div className="h-2 w-16 bg-gradient-to-r from-emerald-100 to-transparent rounded-sm opacity-60" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* GRAPH VISUALIZATION WRAPPERS */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Department Trend Window Frame */}
                    <div className="lg:col-span-2 bg-white rounded-xl border border-zinc-200 p-5 shadow-xs flex flex-col">
                        <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
                            <h3 className="font-bold text-zinc-900 text-sm">Performance Timeline Overview</h3>
                            <div className="flex items-center gap-3 text-[10px] font-bold text-zinc-500">
                                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Resolved</span>
                                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-amber-500" /> In Progress</span>
                                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-rose-500" /> Escalated</span>
                            </div>
                        </div>

                        {/* PURE BROWSER COMPATIBLE STACKED CSS COLUMN GRAPH */}
                        <div className="flex-1 min-h-[280px] w-full pt-8 pb-2 px-2 flex items-end justify-between gap-4 sm:gap-8">
                            {TIMELINE_DATA.map((item, index) => {
                                // Calculate percentages for robust structural stacking heights
                                const total = item.resolved + item.inProgress + item.escalated;
                                const rHeight = (item.resolved / maxVal) * 100;
                                const pHeight = (item.inProgress / maxVal) * 100;
                                const eHeight = (item.escalated / maxVal) * 100;

                                return (
                                    <div key={index} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                                        {/* Value Floating Tooltip Window */}
                                        <div className="opacity-0 group-hover:opacity-100 absolute mb-64 bg-zinc-900 text-white text-[10px] py-1 px-2 rounded font-mono pointer-events-none transition-opacity shadow-sm z-10 text-center">
                                            <p className="border-b border-zinc-700 pb-0.5 mb-0.5 font-bold">Total: {total}</p>
                                            <p className="text-emerald-400">Res: {item.resolved}</p>
                                            <p className="text-amber-400">Prog: {item.inProgress}</p>
                                            <p className="text-rose-400">Esc: {item.escalated}</p>
                                        </div>

                                        {/* Segmented Stack Column */}
                                        <div className="w-full max-w-[40px] flex flex-col justify-end h-full rounded-t overflow-hidden">
                                            <div
                                                style={{ height: `${eHeight}%` }}
                                                className="bg-rose-500 w-full transition-all duration-500 hover:brightness-95"
                                            />
                                            <div
                                                style={{ height: `${pHeight}%` }}
                                                className="bg-amber-500 w-full transition-all duration-500 hover:brightness-95"
                                            />
                                            <div
                                                style={{ height: `${rHeight}%` }}
                                                className="bg-emerald-500 w-full transition-all duration-500 hover:brightness-95"
                                            />
                                        </div>

                                        {/* X-Axis Horizontal Label */}
                                        <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                                            {item.label}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Operational Action Items Feed */}
                    <div className="bg-white rounded-xl border border-zinc-200 p-5 shadow-xs flex flex-col justify-between">
                        <div>
                            <h3 className="font-bold text-zinc-900 text-sm pb-4 border-b border-zinc-100">
                                System Action Items
                            </h3>
                            <div className="space-y-3 mt-4">
                                <div className="flex items-start gap-2.5 p-3 bg-rose-50/50 border border-rose-100 rounded-lg text-xs font-medium text-rose-900">
                                    <span className="text-rose-600 shrink-0">⚠️</span>
                                    <p>8 active cases are currently passing outside configured SLA buffer limits.</p>
                                </div>
                                <div className="flex items-start gap-2.5 p-3 bg-zinc-50 border border-zinc-100 rounded-lg text-xs font-medium text-zinc-700">
                                    <span className="text-zinc-500 shrink-0">ℹ️</span>
                                    <p>Monthly trends update loop completes automatically in 4 hours.</p>
                                </div>
                            </div>
                        </div>

                        <button className="w-full mt-6 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold py-2.5 rounded-lg transition-colors shadow-2xs cursor-pointer">
                            View All Workspace Metrics
                        </button>
                    </div>

                </div>

            </main>
        </div>
    );
}