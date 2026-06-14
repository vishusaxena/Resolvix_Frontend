import React, { useState } from 'react';
import {
    Search,
    Key,
    Clock,
    CheckCircle2,
    AlertTriangle,
    ShieldCheck,
    User,
    Building2,
    MapPin,
    ChevronRight,
    MessageSquareCode,
    FileSpreadsheet
} from 'lucide-react';

export default function TrackComplaintView() {
    // Authentication & Lookup Gates
    const [trackingId, setTrackingId] = useState('');
    const [accessKey, setAccessKey] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Mock Active Complaint Payload Data Store
    const [activeCase, setActiveCase] = useState(null);

    const handleTrackSubmit = (e) => {
        e.preventDefault();
        setErrorMessage('');

        if (!trackingId.trim() || !accessKey.trim()) {
            setErrorMessage('Both Tracking ID and Secure Access Key are strictly required.');
            return;
        }

        // Simulation mapping: Try ID: GRV-9021 / Key: 654321
        if (trackingId.toUpperCase() === 'GRV-9021' && accessKey === '654321') {
            setActiveCase({
                id: 'GRV-9021',
                submittedOn: 'June 08, 2026',
                currentStatus: 'under-review', // pending -> under-review -> resolved
                priority: 'high',
                category: 'Infrastructure',
                department: 'Facility Operations',
                subject: 'Severe Water Leakage & Structural Seepage in West Wing Library Basement',
                location: 'West Wing, Lower Level Basement Storage',
                complainantScope: 'anonymous',
                assignedInvestigator: 'Officer Marcus Vance (Operations Lead)',
                estimatedResolution: 'June 16, 2026',
                timeline: [
                    { title: 'Grievance Filed Securely', date: 'June 08, 2026 | 09:15 AM', desc: 'Case generated with secure routing protocols.', complete: true },
                    { title: 'Triage & Department Assignment', date: 'June 09, 2026 | 14:30 AM', desc: 'Routed successfully to the Facility Operations triage cell.', complete: true },
                    { title: 'Active On-Site Investigation', date: 'June 11, 2026 | 11:00 AM', desc: 'Investigator assigned. Physical inspection logs generated.', complete: true },
                    { title: 'Resolution Execution Plan', date: 'Pending Action Stage', desc: 'Sourcing infrastructure parts for system overhaul.', complete: false }
                ],
                officialNotes: 'The initial structural inspection confirms pipe scaling issues. Technical plumbing contractors have been dispatched to install replacements. No ongoing library structural safety risks are reported.'
            });
            setIsAuthenticated(true);
        } else {
            setErrorMessage('Access Denied: Invalid tracking credentials. Double-check your parameters.');
        }
    };

    const handleLockSession = () => {
        setIsAuthenticated(false);
        setAccessKey('');
        setActiveCase(null);
    };

    return (
        <div className="flex-1 bg-zinc-50 text-zinc-800 min-h-screen px-8 py-10 overflow-y-auto selection:bg-emerald-500/20">

            {/* Header Area */}
            <header className="mb-8">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-2.5 py-1 rounded-full">
                    Real-Time Tracking Engine
                </span>
                <h1 className="text-2xl font-bold tracking-tight text-zinc-900 mt-3">Track Complaint Status</h1>
                <p className="text-zinc-500 text-xs mt-1 font-medium">
                    Monitor life-cycle logs, investigator actions, and active service-level metrics for filed grievances.
                </p>
            </header>

            {/* STATE A: Access Verification Form Gate */}
            {!isAuthenticated ? (
                <div className="max-w-md mx-auto mt-12 animate-fadeIn">
                    <div className="bg-white border border-zinc-200 rounded-xl shadow-sm p-6 space-y-5">
                        <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                            <Search size={20} />
                        </div>

                        <div>
                            <h2 className="text-sm font-bold text-zinc-900">Secure Live Tracker Gateway</h2>
                            <p className="text-xs text-zinc-400 mt-0.5 font-medium">Verify credentials to track processing stages securely.</p>
                        </div>

                        {errorMessage && (
                            <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-red-700 text-xs font-semibold flex items-center gap-2">
                                <AlertTriangle size={14} className="shrink-0" />
                                <p>{errorMessage}</p>
                            </div>
                        )}

                        <form onSubmit={handleTrackSubmit} className="space-y-4">
                            <div>
                                <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wide mb-1">Official Tracking ID</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={trackingId}
                                        onChange={(e) => setTrackingId(e.target.value)}
                                        placeholder="e.g., GRV-9021"
                                        className="w-full text-xs font-semibold border border-zinc-200 rounded-lg pl-9 pr-3 py-2.5 bg-zinc-50/50 focus:bg-white focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all uppercase placeholder:normal-case"
                                    />
                                    <FileSpreadsheet size={14} className="absolute left-3 top-3.5 text-zinc-400" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wide mb-1">Associated Access Key</label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        value={accessKey}
                                        onChange={(e) => setAccessKey(e.target.value)}
                                        placeholder="Enter unique 6-digit access token"
                                        className="w-full text-xs font-medium border border-zinc-200 rounded-lg pl-9 pr-3 py-2.5 bg-zinc-50/50 focus:bg-white focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                                    />
                                    <Key size={14} className="absolute left-3 top-3.5 text-zinc-400" />
                                </div>
                                <span className="text-[10px] text-zinc-400 font-medium block mt-1.5 px-0.5">
                                    Hint: Try ID <code className="bg-zinc-100 px-1 py-0.5 rounded text-zinc-600 font-mono">GRV-9021</code> and Key <code className="bg-zinc-100 px-1 py-0.5 rounded text-zinc-600 font-mono">654321</code> to view metrics.
                                </span>
                            </div>

                            <button
                                type="submit"
                                className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-all shadow-sm shadow-emerald-700/10"
                            >
                                Fetch Status Trajectory
                            </button>
                        </form>
                    </div>
                </div>
            ) : (

                // STATE B: Decrypted Tracking Status Layout View
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start animate-fadeIn">

                    {/* LEFT 2 COLUMNS: Case Analysis & Active Lifecycle Timeline */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Master Summary Top Widget Card */}
                        <div className="bg-white border border-zinc-200 rounded-xl shadow-sm p-6">
                            <div className="flex flex-wrap justify-between items-start gap-4 border-b border-zinc-100 pb-4 mb-4">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h2 className="text-base font-bold text-zinc-900">{activeCase.id}</h2>
                                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider ${activeCase.priority === 'high' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-zinc-100 text-zinc-600'
                                            }`}>
                                            {activeCase.priority} Priority
                                        </span>
                                    </div>
                                    <p className="text-[11px] text-zinc-400 mt-1 font-medium">
                                        Filing logged on {activeCase.submittedOn} • Status:
                                        <span className="text-emerald-600 font-bold ml-1 capitalize">{activeCase.currentStatus.replace('-', ' ')}</span>
                                    </p>
                                </div>

                                <button
                                    onClick={handleLockSession}
                                    className="px-3 py-1.5 text-[11px] font-bold border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-600 rounded-lg shadow-sm transition-all"
                                >
                                    Terminate Tracking Session
                                </button>
                            </div>

                            {/* Subject Title Block */}
                            <div className="space-y-1">
                                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide block">Grievance Heading</span>
                                <h3 className="text-sm font-bold text-zinc-900 leading-tight">{activeCase.subject}</h3>
                                <div className="flex flex-wrap gap-x-4 gap-y-1 pt-3 text-[11px] text-zinc-500 font-semibold">
                                    <span className="flex items-center gap-1"><Building2 size={12} className="text-zinc-400" /> {activeCase.department}</span>
                                    <span className="flex items-center gap-1"><MapPin size={12} className="text-zinc-400" /> {activeCase.location}</span>
                                </div>
                            </div>
                        </div>

                        {/* CASE LIFECYCLE PROGRESS TIMELINE */}
                        <div className="bg-white border border-zinc-200 rounded-xl shadow-sm p-6 space-y-4">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Processing Stage Trajectory</h3>

                            <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-[2px] before:bg-zinc-200">
                                {activeCase.timeline.map((step, index) => (
                                    <div key={index} className="relative group animate-fadeIn">

                                        {/* Node Dot Icon */}
                                        <div className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${step.complete
                                            ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm'
                                            : 'bg-white border-zinc-300 text-zinc-400'
                                            }`}>
                                            {step.complete ? <CheckCircle2 size={11} /> : <Clock size={11} />}
                                        </div>

                                        {/* Step Text Elements */}
                                        <div className="text-xs">
                                            <div className="flex flex-wrap items-center justify-between gap-1.5">
                                                <h4 className={`font-bold ${step.complete ? 'text-zinc-800' : 'text-zinc-400 font-medium'}`}>
                                                    {step.title}
                                                </h4>
                                                <span className="text-[10px] font-bold text-zinc-400 tracking-wide">{step.date}</span>
                                            </div>
                                            <p className="text-zinc-400 text-[11px] mt-0.5 max-w-xl font-medium leading-relaxed">
                                                {step.desc}
                                            </p>
                                        </div>

                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* RIGHT SIDEBAR: Investigative Authority & Resolution Details */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 px-1">Case Metadata</h3>

                        <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-sm space-y-5 text-xs font-medium text-zinc-600">

                            {/* Handling Officer Profile */}
                            <div className="space-y-1.5">
                                <h4 className="font-bold text-zinc-900 flex items-center gap-1.5">
                                    <User size={14} className="text-emerald-600" /> Assigned Resolution Desk
                                </h4>
                                <p className="text-zinc-800 font-bold text-[11px]">{activeCase.assignedInvestigator}</p>
                                <p className="text-zinc-400 text-[10px] tracking-wide">Target Resolution Limit: {activeCase.estimatedResolution}</p>
                            </div>

                            <hr className="border-zinc-100" />

                            {/* Investigator Updates Block */}
                            <div className="space-y-2">
                                <h4 className="font-bold text-zinc-900 flex items-center gap-1.5">
                                    <MessageSquareCode size={14} className="text-emerald-600" /> Desk Officer Notes
                                </h4>
                                <div className="p-3.5 bg-zinc-50 border border-zinc-100 rounded-xl font-normal text-[11px] text-zinc-500 leading-relaxed italic">
                                    "{activeCase.officialNotes}"
                                </div>
                            </div>

                            <hr className="border-zinc-100" />

                            {/* Privacy/Anonymity Identity Flag status */}
                            <div className="p-3 bg-emerald-50/60 border border-emerald-100 rounded-xl text-emerald-800 flex items-start gap-2 text-[11px]">
                                <ShieldCheck size={16} className="text-emerald-600 mt-0.5 shrink-0" />
                                <p>
                                    <strong>Security Guard Activated:</strong> This record was processed as an <strong>anonymous submission</strong>. Institutional account IDs remain fully protected.
                                </p>
                            </div>

                        </div>
                    </div>

                </div>
            )}

        </div>
    );
}