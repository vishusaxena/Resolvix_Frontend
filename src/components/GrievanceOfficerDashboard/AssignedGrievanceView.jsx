import React, { useState } from "react";

// --- MOCK INCIDENT DATA ---
const INITIAL_ASSIGNED_QUEUE = [
    {
        id: "GRV-2026-904",
        title: "Enterprise SSO login timeout loop on mobile endpoints",
        priority: "CRITICAL",
        status: "In Progress",
        updatedAt: "2 hours ago",
        category: "Technical Access",
        filedBy: "Rahul Verma (Student)",
        description: "Users are getting stuck in an infinite authentication loop specifically when attempting to log in via iOS and Android devices. Desktop endpoints seem unaffected."
    },
    {
        id: "GRV-2026-881",
        title: "Biometric security gateway sync failure during shift change",
        priority: "MEDIUM",
        status: "Assigned",
        updatedAt: "4 hours ago",
        category: "Facilities Management",
        filedBy: "Dr. S. Prasad (Faculty)",
        description: "The main entrance biometric scanners are experiencing a 30-second delay in synchronizing user credentials, causing bottlenecks during peak morning shift changes."
    },
    {
        id: "GRV-2026-760",
        title: "Missing quarterly HRA allocation components inside payroll portal",
        priority: "LOW",
        status: "In Progress",
        updatedAt: "1 day ago",
        category: "Finance & Payroll",
        filedBy: "Meera Nair (Staff)",
        description: "The updated House Rent Allowance calculations for Q1 have not populated correctly in the employee self-service hub panel."
    }
];

export default function AssignedGrievanceView() {
    const [tickets, setTickets] = useState(INITIAL_ASSIGNED_QUEUE);
    const [selectedTicket, setSelectedTicket] = useState(INITIAL_ASSIGNED_QUEUE[0]);
    const [resolutionText, setResolutionText] = useState("");

    const handleUpdateStatus = (id, newStatus) => {
        setTickets(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
        if (selectedTicket && selectedTicket.id === id) {
            setSelectedTicket(prev => ({ ...prev, status: newStatus }));
        }
    };

    const handleResolveTicket = (id) => {
        if (!resolutionText.trim()) return alert("Please log resolution actions before final closure.");
        setTickets(prev => prev.filter(t => t.id !== id));
        setSelectedTicket(null);
        setResolutionText("");
    };

    const priorityBadges = {
        CRITICAL: "bg-rose-600 text-white font-extrabold",
        MEDIUM: "bg-amber-500 text-white font-extrabold",
        LOW: "bg-amber-400 text-zinc-900 font-extrabold",
    };

    return (
        <div className="min-h-screen bg-zinc-50 font-sans text-zinc-800 flex flex-col antialiased">

            {/* SUB-HEADER NAVIGATION FRAME */}
            <div className="bg-white border-b border-zinc-200 px-6 py-4">
                <div className="max-w-[1600px] w-full mx-auto flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold text-zinc-900 tracking-tight">Assigned Cases Pipeline</h1>
                        <p className="text-xs text-zinc-400 mt-0.5">Active grievance queues registered directly to your officer profile.</p>
                    </div>
                    <div className="text-xs bg-zinc-100 text-zinc-600 font-bold px-3 py-1.5 rounded-lg border border-zinc-200">
                        Active Pool Count: {tickets.length}
                    </div>
                </div>
            </div>

            {/* TWO-COLUMN GRID WORKSPACE */}
            <main className="flex-1 p-6 max-w-[1600px] w-full mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

                {/* LEFT SIDE: LIST TIMELINE ITEMS */}
                <div className="lg:col-span-2 space-y-3">
                    {tickets.map((ticket) => {
                        const isSelected = selectedTicket?.id === ticket.id;
                        return (
                            <div
                                key={ticket.id}
                                onClick={() => { setSelectedTicket(ticket); setResolutionText(""); }}
                                className={`p-4 rounded-xl border transition-all cursor-pointer bg-white text-left ${isSelected
                                    ? "border-zinc-900 ring-1 ring-zinc-900 shadow-xs"
                                    : "border-zinc-200 hover:border-zinc-300 shadow-2xs"
                                    }`}
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-mono text-xs font-bold text-emerald-700">{ticket.id}</span>
                                            <span className="text-zinc-400 text-[11px] font-medium">• {ticket.category}</span>
                                        </div>
                                        <h3 className="font-bold text-zinc-950 text-[14px] leading-snug">{ticket.title}</h3>
                                        <p className="text-xs text-zinc-500 line-clamp-1">{ticket.description}</p>
                                    </div>

                                    {/* STATUS & PRIORITY BADGES */}
                                    <div className="text-right shrink-0 space-y-2">
                                        <span className={`inline-block px-1.5 py-0.5 rounded text-[9px] tracking-wide ${priorityBadges[ticket.priority]}`}>
                                            {ticket.priority}
                                        </span>
                                        <div className="text-[11px] font-bold text-zinc-500 flex items-center justify-end gap-1">
                                            <span className={`h-1.5 w-1.5 rounded-full ${ticket.status === "In Progress" ? "bg-sky-500" : "bg-zinc-400"}`} />
                                            {ticket.status}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-3 pt-3 border-t border-zinc-100 flex justify-between items-center text-[11px] text-zinc-400">
                                    <span>Filed By: <strong className="text-zinc-600 font-semibold">{ticket.filedBy}</strong></span>
                                    <span>Logged {ticket.updatedAt}</span>
                                </div>
                            </div>
                        );
                    })}

                    {tickets.length === 0 && (
                        <div className="bg-white rounded-xl border border-zinc-200 border-dashed p-12 text-center text-zinc-400 italic text-sm">
                            🎉 Excellent. No unresolved grievance tickets remaining in your workflow box.
                        </div>
                    )}
                </div>

                {/* RIGHT SIDE: INTERACTIVE ACTION DETAIL MODAL PANEL */}
                <div className="bg-white rounded-xl border border-zinc-200 p-5 shadow-xs sticky top-6">
                    {selectedTicket ? (
                        <div className="space-y-4">
                            <div className="border-b border-zinc-100 pb-3">
                                <span className="font-mono text-xs font-bold text-emerald-700 block mb-1">{selectedTicket.id}</span>
                                <h2 className="font-bold text-zinc-900 text-base leading-snug">{selectedTicket.title}</h2>
                                <p className="text-xs text-zinc-400 mt-2">
                                    Filed by <strong className="text-zinc-600 font-semibold">{selectedTicket.filedBy}</strong>
                                </p>
                            </div>

                            {/* Ticket Long Description */}
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Incident Scope Details</label>
                                <p className="text-xs text-zinc-600 bg-zinc-50 p-3 rounded-lg border border-zinc-100 leading-relaxed">
                                    {selectedTicket.description}
                                </p>
                            </div>

                            {/* Phase Management Controller */}
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Set Processing Phase</label>
                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        onClick={() => handleUpdateStatus(selectedTicket.id, "In Progress")}
                                        className={`px-3 py-2 text-xs font-bold rounded-lg border text-center transition-all cursor-pointer ${selectedTicket.status === "In Progress"
                                            ? "bg-sky-50 border-sky-400 text-sky-800 ring-1 ring-sky-400"
                                            : "bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50"
                                            }`}
                                    >
                                        In Progress
                                    </button>
                                    <button
                                        onClick={() => handleUpdateStatus(selectedTicket.id, "Assigned")}
                                        className={`px-3 py-2 text-xs font-bold rounded-lg border text-center transition-all cursor-pointer ${selectedTicket.status === "Assigned"
                                            ? "bg-zinc-100 border-zinc-300 text-zinc-800"
                                            : "bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50"
                                            }`}
                                    >
                                        Mark Pending
                                    </button>
                                </div>
                            </div>

                            {/* Action Submission Field */}
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Official Closure Summary</label>
                                <textarea
                                    value={resolutionText}
                                    onChange={(e) => setResolutionText(e.target.value)}
                                    placeholder="Input specific administrative action notes taken to settle this issue record permanently..."
                                    rows={4}
                                    className="w-full text-xs p-3 border border-zinc-200 rounded-lg focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 bg-zinc-50/30 resize-none font-medium placeholder:text-zinc-400"
                                />
                            </div>

                            <button
                                onClick={() => handleResolveTicket(selectedTicket.id)}
                                className="w-full bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold py-2.5 rounded-lg shadow-2xs transition-colors cursor-pointer"
                            >
                                Finalize & Close Grievance Case
                            </button>
                        </div>
                    ) : (
                        <div className="py-16 text-center flex flex-col items-center justify-center">
                            <span className="text-2xl mb-1">🔍</span>
                            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">No Ticket Target</h4>
                            <p className="text-xs text-zinc-400 mt-1 max-w-[200px] mx-auto leading-relaxed">
                                Select any pending case row entry from the pipeline sidebar tracking layout to launch processing.
                            </p>
                        </div>
                    )}
                </div>

            </main>
        </div>
    );
}