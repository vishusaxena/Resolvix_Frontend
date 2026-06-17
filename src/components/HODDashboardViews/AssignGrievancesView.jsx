import axios from "axios";
import React, { useEffect, useState } from "react";

// --- START DUMMY DATA SECTIONS ---
const MOCK_OFFICERS = [
    { id: "OFF-101", name: "Ananya Sharma" },
    { id: "OFF-102", name: "David Miller" },
    { id: "OFF-103", name: "Marcus Chen" },
    { id: "OFF-104", name: "Sarah Jenkins" },
];

const MOCK_GRIEVANCES = [
    {
        grievanceId: "GRV-2026-001",
        title: "Database latency spike during peak migration windows",
        description: "Write-heavy analytical queries are overlapping with production backup snapshots, crashing microservice connections.",
        priority: "Critical",
        status: "In Progress",
        dateRaised: "2026-06-12",
        assignedToId: "OFF-103"
    },
    {
        grievanceId: "GRV-2026-002",
        title: "Salary component breakdown discrepancy in portal",
        description: "The revised component calculations for HRA distributions are failing to render accurately inside the user summary page.",
        priority: "High",
        status: "Filed",
        dateRaised: "2026-06-15",
        assignedToId: ""
    },
    {
        grievanceId: "GRV-2026-003",
        title: "Biometric access token failing at Main Gate 3",
        description: "Frequent multi-factor scanner timeouts resulting in major log queues during shift change intervals.",
        priority: "Medium",
        status: "Assigned",
        dateRaised: "2026-06-14",
        assignedToId: "OFF-101"
    },
    {
        grievanceId: "GRV-2026-004",
        title: "Client UI styling breakage on Ultra-Wide displays",
        description: "The dashboard metrics container layout splits irregularly on viewport resolutions wider than 2560px.",
        priority: "Low",
        status: "Resolved",
        dateRaised: "2026-06-10",
        assignedToId: "OFF-104"
    },
    {
        grievanceId: "GRV-2026-005",
        title: "Spam incoming requests on contact webhook integration",
        description: "Bot request bursts bypass captcha checks due to outdated versioning configurations on API side rails.",
        priority: "High",
        status: "Rejected",
        dateRaised: "2026-06-11",
        assignedToId: "OFF-102"
    },
    {
        grievanceId: "GRV-2026-006",
        title: "Cooling system failure in Server Deck Tier-2",
        description: "Ambient temperatures crossed critical safety thresholds requiring emergency manual server routing switch-overs.",
        priority: "Critical",
        status: "Closed",
        dateRaised: "2026-06-08",
        assignedToId: "OFF-103"
    },
    {
        grievanceId: "GRV-2026-007",
        title: "SSL validation breakdown on legacy staging domains",
        description: "Staging environments are completely unreachable due to missing automated renewal configurations.",
        priority: "Medium",
        status: "Filed",
        dateRaised: "2026-06-15",
        assignedToId: ""
    }
];

const localFormatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
};
// --- END DUMMY DATA SECTIONS ---

export default function AssigneeWorkloadView({ onAssign }) {
    const [tenantData, setTenantData] = useState(() => {
        const storedData = localStorage.getItem("tenantData")
        return storedData ? JSON.parse(storedData) : {}
    })
    const [grievances, setGrievances] = useState(MOCK_GRIEVANCES);
    const [officers, setOfficers] = useState([]);

    // Tab filtering states ("All", "In Progress", "Resolved", "Closed")
    const [activeTab, setActiveTab] = useState("All");
    const [activeOfficerId, setActiveOfficerId] = useState("unassigned");

    const handleAssignTicket = (grievanceId, officerId) => {
        setGrievances(prev =>
            prev.map(g => g.grievanceId === grievanceId ? { ...g, assignedToId: officerId } : g)
        );
        if (onAssign) onAssign(grievanceId, officerId);
    };

    // Calculate absolute status counts globally across all grievances for the tab UI markers
    const getGlobalCount = (status) => grievances.filter(g => g.status === status).length;

    // Helper filter to cleanly separate lists by status tabs dynamically
    const filterByTab = (list) => {
        if (activeTab === "All") return list;
        return list.filter(item => item.status === activeTab);
    };

    // Derived State Computations
    const baseUnassigned = grievances.filter(g => !g.assignedToId);
    const displayedUnassigned = filterByTab(baseUnassigned);

    const baseOfficerTickets = grievances.filter(g => g.assignedToId === activeOfficerId);
    const displayedOfficerTickets = filterByTab(baseOfficerTickets);

    const activeOfficerData = officers.find(o => o.id === activeOfficerId);

    const priorityColors = {
        Critical: "bg-rose-100 text-rose-800 border-rose-200",
        High: "bg-amber-100 text-amber-800 border-amber-200",
        Medium: "bg-blue-100 text-blue-800 border-blue-200",
        Low: "bg-zinc-100 text-zinc-700 border-zinc-200",
    };

    const statusColors = {
        Filed: "bg-orange-50 text-orange-700 ring-orange-600/20",
        Assigned: "bg-blue-50 text-blue-700 ring-blue-600/20",
        "In Progress": "bg-sky-50 text-sky-700 ring-sky-600/20",
        Resolved: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
        Closed: "bg-zinc-50 text-zinc-600 ring-zinc-500/10",
        Rejected: "bg-rose-50 text-rose-700 ring-rose-600/20",
    };


    const FetchOfficers = async () => {
        const response = await axios.get(`http://localhost:5000/api/data/officer-data?tenantId=${tenantData.tenantCode}&department=${tenantData.department}`);
        if (response.data.status === "success") {
            setOfficers(() => {
                const finalData = response.data.data.map((user) => {
                    return {
                        id: user.userCode,
                        name: user.name
                    }
                })
                return finalData;
            }); // Targets the normalized data array safely
        } else {
            setOfficers([]);
        }
    }

    useEffect(() => {
        FetchOfficers();
    }, [])

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-zinc-50 font-sans">

            {/* LEFT SIDE PANEL: Officers & Workloads */}
            <div className="w-full md:w-80 border-r border-zinc-200 bg-white p-4 flex flex-col space-y-4 shrink-0">
                <div>
                    <h2 className="text-lg font-bold text-zinc-900">Team Workloads</h2>
                    <p className="text-xs text-zinc-500">Select an officer to manage their active tickets.</p>
                </div>

                {/* Unassigned Pool Box */}
                <div
                    onClick={() => setActiveOfficerId("unassigned")}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${activeOfficerId === "unassigned"
                        ? "bg-amber-50/70 border-amber-400 ring-1 ring-amber-400"
                        : "bg-zinc-50 border-zinc-200 hover:bg-zinc-100"
                        }`}
                >
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-zinc-800">Unassigned Pool</span>
                        <span className="bg-amber-600 text-white font-mono text-xs px-2.5 py-0.5 rounded-full font-bold">
                            {baseUnassigned.length}
                        </span>
                    </div>
                </div>

                <hr className="border-zinc-200" />

                {/* Officer Selection List */}
                <div className="space-y-2 overflow-y-auto flex-1">
                    <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">Handling Officers</span>
                    {officers.map((officer) => {
                        const totalActiveCount = grievances.filter(g => g.assignedToId === officer.id).length;
                        const isActive = activeOfficerId === officer.id;

                        return (
                            <button
                                key={officer.id}
                                onClick={() => setActiveOfficerId(officer.id)}
                                className={`w-full text-left p-3 rounded-lg border transition-all flex items-center justify-between ${isActive
                                    ? "bg-emerald-50 border-emerald-500 ring-1 ring-emerald-500 text-emerald-900"
                                    : "bg-white border-zinc-200 hover:bg-zinc-50 text-zinc-700"
                                    }`}
                            >
                                <div className="truncate pr-2">
                                    <p className="text-sm font-semibold truncate">{officer.name}</p>
                                    <p className="text-xs text-zinc-400">{officer.id}</p>
                                </div>
                                <span className={`font-mono text-xs px-2.5 py-0.5 rounded-full font-bold shrink-0 ${isActive ? "bg-emerald-600 text-white" : "bg-zinc-100 text-zinc-600"
                                    }`}>
                                    {totalActiveCount}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* RIGHT SIDE PANEL: Detailed Queue & Tabs */}
            <div className="flex-1 p-6 overflow-y-auto flex flex-col space-y-6">

                {/* STATUS FILTER TABS WITH COUNTERS */}
                <div className="border-b border-zinc-200 bg-white p-2 rounded-xl border flex flex-wrap gap-1 items-center shadow-xs">
                    {[
                        { id: "All", label: "All Tickets", count: grievances.length },
                        { id: "In Progress", label: "In Progress", count: getGlobalCount("In Progress") },
                        { id: "Resolved", label: "Resolved", count: getGlobalCount("Resolved") },
                        { id: "Closed", label: "Closed", count: getGlobalCount("Closed") }
                    ].map((tab) => {
                        const isTabActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${isTabActive
                                    ? "bg-zinc-900 text-white shadow-xs"
                                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                                    }`}
                            >
                                <span>{tab.label}</span>
                                <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold ${isTabActive ? "bg-zinc-700 text-white" : "bg-zinc-100 text-zinc-600"
                                    }`}>
                                    {tab.count}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* LOWER WORK AREA CONTENT CONTAINER */}
                <div className="flex-1">
                    {activeOfficerId === "unassigned" ? (

                        // VIEW A: UNASSIGNED TICKET MANAGEMENT
                        <div className="space-y-4">
                            <div>
                                <h2 className="text-xl font-bold text-zinc-900">
                                    Unassigned Pool ({activeTab} Items)
                                </h2>
                                <p className="text-sm text-zinc-500">Route these incoming filings to working staff profiles.</p>
                            </div>

                            <div className="bg-white rounded-xl border border-zinc-200 divide-y divide-zinc-100 shadow-xs">
                                {displayedUnassigned.length > 0 ? (
                                    displayedUnassigned.map((ticket) => (
                                        <div key={ticket.grievanceId} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-zinc-50/50 transition-colors">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs font-mono font-bold text-emerald-700">#{ticket.grievanceId}</span>
                                                    <span className={`px-1.5 py-0.5 rounded border text-[10px] font-bold ${priorityColors[ticket.priority] || priorityColors.Low}`}>
                                                        {ticket.priority}
                                                    </span>
                                                    <span className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-medium ring-1 ring-inset ${statusColors[ticket.status]}`}>
                                                        {ticket.status}
                                                    </span>
                                                </div>
                                                <h4 className="font-semibold text-zinc-900">{ticket.title}</h4>
                                                <p className="text-xs text-zinc-500 max-w-2xl">{ticket.description}</p>
                                                <p className="text-[11px] text-zinc-400 pt-1">Filed On: {localFormatDate(ticket.dateRaised)}</p>
                                            </div>
                                            <div className="flex items-center gap-2 shrink-0">
                                                <select
                                                    onChange={(e) => handleAssignTicket(ticket.grievanceId, e.target.value)}
                                                    className="text-xs border-zinc-300 rounded-md focus:ring-emerald-600 focus:border-emerald-600 bg-white py-1.5 pl-2 pr-8 shadow-xs"
                                                    defaultValue=""
                                                >
                                                    <option value="" disabled>Assign to officer...</option>
                                                    {officers.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-12 text-center">
                                        <p className="text-sm text-zinc-400 italic">No unassigned grievances match the "{activeTab}" filter.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (

                        // VIEW B: TARGET ASSIGNEE TICKET SUB-COLLECTIONS
                        <div className="space-y-4">
                            <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
                                <div>
                                    <h2 className="text-xl font-bold text-zinc-900">{activeOfficerData?.name}</h2>
                                    <p className="text-sm text-zinc-500">Filtered list layout for {activeOfficerData?.name || "Officer"}'s profile workloads.</p>
                                </div>
                                <span className="text-xs bg-zinc-100 text-zinc-700 px-3 py-1.5 rounded-md font-semibold border border-zinc-200 shadow-xs">
                                    Visible: {displayedOfficerTickets.length} / Total: {baseOfficerTickets.length}
                                </span>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                {displayedOfficerTickets.length > 0 ? (
                                    displayedOfficerTickets.map((ticket) => (
                                        <div key={ticket.grievanceId} className="bg-white border border-zinc-200 rounded-xl p-4 shadow-sm flex flex-col justify-between space-y-4 hover:border-zinc-300 transition-all">
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs font-mono font-bold text-emerald-700">#{ticket.grievanceId}</span>
                                                        <span className={`px-1.5 py-0.5 rounded border text-[10px] font-bold ${priorityColors[ticket.priority] || priorityColors.Low}`}>
                                                            {ticket.priority}
                                                        </span>
                                                    </div>
                                                    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset ${statusColors[ticket.status]}`}>
                                                        {ticket.status}
                                                    </span>
                                                </div>
                                                <h4 className="font-semibold text-zinc-900 line-clamp-1">{ticket.title}</h4>
                                                <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">{ticket.description}</p>
                                            </div>

                                            <div className="pt-3 border-t border-zinc-100 flex items-center justify-between gap-2">
                                                <span className="text-[11px] text-zinc-400">Raised: {localFormatDate(ticket.dateRaised)}</span>

                                                <select
                                                    value={ticket.assignedToId}
                                                    onChange={(e) => handleAssignTicket(ticket.grievanceId, e.target.value)}
                                                    className="text-[11px] border-zinc-200 rounded-md focus:ring-emerald-600 bg-zinc-50 py-1 pl-2 pr-7 text-zinc-700"
                                                >
                                                    <option value="">Remove/Unassign</option>
                                                    {officers.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-span-full bg-white border border-dashed border-zinc-200 rounded-xl p-12 text-center">
                                        <p className="text-zinc-400 text-sm italic">No tickets found under status "{activeTab}" for this officer.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}