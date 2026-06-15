import React, { useState } from "react";

// --- DUMMY DATA SECTIONS FOR DEPARTMENT HEAD VIEW ---
const MOCK_OFFICERS_METRICS = [
    {
        id: "OFF-101",
        name: "Ananya Sharma",
        role: "Senior Grievance Officer",
        department: "Operations",
        avatar: "AS",
        filedCount: 1,
        inProgressCount: 4,
        resolvedCount: 28,
        efficiencyRate: "94%",
        workloadStatus: "Optimal"
    },
    {
        id: "OFF-102",
        name: "David Miller",
        role: "Grievance Executive",
        department: "Operations",
        avatar: "DM",
        filedCount: 5,
        inProgressCount: 8,
        resolvedCount: 14,
        efficiencyRate: "78%",
        workloadStatus: "Overloaded"
    },
    {
        id: "OFF-103",
        name: "Marcus Chen",
        role: "Technical Specialist",
        department: "Operations",
        avatar: "MC",
        filedCount: 0,
        inProgressCount: 2,
        resolvedCount: 42,
        efficiencyRate: "98%",
        workloadStatus: "Available"
    },
    {
        id: "OFF-104",
        name: "Sarah Jenkins",
        role: "Grievance Executive",
        department: "Operations",
        avatar: "SJ",
        filedCount: 2,
        inProgressCount: 3,
        resolvedCount: 19,
        efficiencyRate: "88%",
        workloadStatus: "Optimal"
    }
];

const MOCK_TICKETS_POOL = [
    { id: "GRV-2026-001", title: "Database latency spike during peak migration windows", status: "In Progress", priority: "Critical" },
    { id: "GRV-2026-003", title: "Biometric access token failing at Main Gate 3", status: "In Progress", priority: "Medium" },
    { id: "GRV-2026-005", title: "Spam incoming requests on contact webhook integration", status: "In Progress", priority: "High" },
    { id: "GRV-2026-002", title: "Salary component breakdown discrepancy in portal", status: "Filed", priority: "High" }
];

export default function DepartmentTeamManagementView() {
    const [officers] = useState(MOCK_OFFICERS_METRICS);
    const [expandedOfficerId, setExpandedOfficerId] = useState(null);

    const toggleExpandOfficer = (id) => {
        setExpandedOfficerId(expandedOfficerId === id ? null : id);
    };

    const workloadBadges = {
        Optimal: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
        Available: "bg-sky-50 text-sky-700 ring-sky-600/20",
        Overloaded: "bg-rose-50 text-rose-700 ring-rose-600/20",
    };

    // Calculate department totals
    const totalActiveTeam = officers.length;
    const totalDepartmentResolved = officers.reduce((acc, obj) => acc + obj.resolvedCount, 0);
    const totalDepartmentPending = officers.reduce((acc, obj) => acc + obj.inProgressCount + obj.filedCount, 0);

    return (
        <div className="flex-1 bg-zinc-50 min-h-screen">
            <main className="p-6 space-y-6">

                {/* HEAD DASHBOARD HEADER */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-200 pb-5">
                    <div>
                        <h1 className="text-2xl font-bold text-zinc-900">Operations Team Management</h1>
                        <p className="text-sm text-zinc-500 mt-1">
                            Monitor resolution efficiency, evaluate pipeline loads, and check officer availability metrics.
                        </p>
                    </div>
                </div>

                {/* OVERALL DEPT ANALYTICS STRIP */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white p-5 rounded-xl border border-zinc-200 shadow-xs">
                        <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Active Staff</p>
                        <p className="text-2xl font-bold text-zinc-900 mt-2">{totalActiveTeam} Officers</p>
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-zinc-200 shadow-xs">
                        <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Department Resolved</p>
                        <p className="text-2xl font-bold text-emerald-700 mt-2">{totalDepartmentResolved} Cases</p>
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-zinc-200 shadow-xs">
                        <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Unresolved Backlog</p>
                        <p className="text-2xl font-bold text-amber-700 mt-2">{totalDepartmentPending} Open</p>
                    </div>
                </div>

                {/* TEAM MANAGEMENT ROSTER GRID */}
                <div className="space-y-4">
                    <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Officer Performance Matrix</h2>

                    <div className="space-y-3">
                        {officers.map((officer) => {
                            const isExpanded = expandedOfficerId === officer.id;
                            const totalActive = officer.filedCount + officer.inProgressCount;

                            return (
                                <div
                                    key={officer.id}
                                    className="bg-white rounded-xl border border-zinc-200 shadow-xs overflow-hidden transition-all"
                                >
                                    {/* MAIN SUMMARY TRACK ROW */}
                                    <div className="p-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 bg-white">

                                        {/* Left Side: Avatar & Basic Meta */}
                                        <div className="flex items-center gap-3 w-full lg:w-72 shrink-0">
                                            <div className="h-10 w-10 rounded-full bg-zinc-100 flex items-center justify-center font-bold text-sm text-zinc-700 border border-zinc-200 shrink-0">
                                                {officer.avatar}
                                            </div>
                                            <div className="truncate">
                                                <h3 className="font-semibold text-zinc-900 text-sm truncate">{officer.name}</h3>
                                                <p className="text-xs text-zinc-400 truncate">{officer.role}</p>
                                            </div>
                                        </div>

                                        {/* Center Metrics Array */}
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 flex-1 w-full text-left">
                                            <div>
                                                <span className="block text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Unassigned/New</span>
                                                <span className="text-sm font-semibold text-zinc-800">{officer.filedCount}</span>
                                            </div>
                                            <div>
                                                <span className="block text-[10px] uppercase font-bold text-zinc-400 tracking-wider">In Progress</span>
                                                <span className="text-sm font-semibold text-sky-600">{officer.inProgressCount}</span>
                                            </div>
                                            <div>
                                                <span className="block text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Resolved Total</span>
                                                <span className="text-sm font-semibold text-emerald-600">{officer.resolvedCount}</span>
                                            </div>
                                            <div>
                                                <span className="block text-[10px] uppercase font-bold text-zinc-400 tracking-wider">SLA Resolution Rate</span>
                                                <span className="text-sm font-bold text-zinc-900">{officer.efficiencyRate}</span>
                                            </div>
                                        </div>

                                        {/* Right Controls Area */}
                                        <div className="flex items-center justify-between lg:justify-end gap-4 w-full lg:w-auto border-t lg:border-t-0 border-zinc-100 pt-3 lg:pt-0">
                                            <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${workloadBadges[officer.workloadStatus]}`}>
                                                {officer.workloadStatus}
                                            </span>

                                            <button
                                                onClick={() => toggleExpandOfficer(officer.id)}
                                                className="text-xs font-semibold text-emerald-600 hover:text-emerald-800 cursor-pointer"
                                            >
                                                {isExpanded ? "Hide Tickets ▲" : `View Active (${totalActive}) ▼`}
                                            </button>
                                        </div>
                                    </div>

                                    {/* EXPANDED INNER PANEL: ACTIVE TICKETS DRILLDOWN */}
                                    {isExpanded && (
                                        <div className="bg-zinc-50/50 border-t border-zinc-100 p-5 space-y-3">
                                            <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Current Pipeline Items</p>

                                            {totalActive > 0 ? (
                                                <div className="bg-white rounded-lg border border-zinc-200 divide-y divide-zinc-100 shadow-2xs">
                                                    {MOCK_TICKETS_POOL.slice(0, totalActive).map((ticket) => (
                                                        <div key={ticket.id} className="p-3 flex items-center justify-between text-xs gap-4">
                                                            <div className="truncate">
                                                                <span className="font-mono font-bold text-emerald-700 mr-2">{ticket.id}</span>
                                                                <span className="text-zinc-700 font-medium">{ticket.title}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2 shrink-0">
                                                                <span className="px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-600 text-[10px] font-medium border border-zinc-200">
                                                                    {ticket.status}
                                                                </span>
                                                                <span className="px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 text-[10px] font-semibold border border-rose-100">
                                                                    {ticket.priority}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-xs text-zinc-400 italic bg-white p-4 rounded-lg border border-zinc-100">
                                                    No pending items on this queue desk.
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

            </main>
        </div>
    );
}