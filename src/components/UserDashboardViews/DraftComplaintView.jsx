import React, { useState } from 'react';
import {
    Lock,
    Key,
    FileEdit,
    Calendar,
    AlertTriangle,
    ArrowRight,
    FolderOpen,
    UserCheck,
    MapPin,
    FileText
} from 'lucide-react';

export default function DraftComplaintView() {
    // Access and Auth States
    const [draftId, setDraftId] = useState('');
    const [accessKey, setAccessKey] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Mock Decrypted Draft Data Store
    const [mockDecryptedDraft, setMockDecryptedDraft] = useState(null);

    // Handle Authentication Gate Simulation
    const handleAccessSubmit = (e) => {
        e.preventDefault();
        setErrorMessage('');

        if (!draftId.trim() || !accessKey.trim()) {
            setErrorMessage('Both Draft ID and Secure Access Key are strictly required.');
            return;
        }

        // Simulation mapping: replace this block with your actual Axios/Fetch API payload call
        if (draftId === 'DFT-7892' && accessKey === '123456') {
            setMockDecryptedDraft({
                id: 'DFT-7892',
                lastSaved: 'June 12, 2026 at 14:32 UTC',
                complainant: {
                    scope: 'revel',
                    name: 'Vishu Saxena',
                    email: 'vishu@institution.edu',
                    phone: '+1 (555) 382-9011'
                },
                category: 'IT Support',
                department: 'Technical Support Team',
                subject: 'Intermittent Edu-WiFi Drops in Block C Laboratory',
                priority: 'medium',
                location: 'Block C, Room 402',
                description: 'The wireless access point drops connections systematically whenever more than 15 client terminals attempt authorization handshakes concurrently. This disrupts ongoing technical examinations.',
                attachmentsCount: 2
            });
            setIsAuthenticated(true);
        } else {
            setErrorMessage('Access Denied: Invalid combination credentials. Please verify your token logs.');
        }
    };

    const handleResetGate = () => {
        setIsAuthenticated(false);
        setAccessKey('');
        setMockDecryptedDraft(null);
    };

    return (
        <div className="flex-1 bg-zinc-50 text-zinc-800 min-h-screen px-8 py-10 overflow-y-auto selection:bg-emerald-500/20">

            {/* Dynamic Header */}
            <header className="mb-8">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-2.5 py-1 rounded-full">
                    Draft Recovery Environment
                </span>
                <h1 className="text-2xl font-bold tracking-tight text-zinc-900 mt-3">Retrieve Saved Draft</h1>
                <p className="text-zinc-500 text-xs mt-1 font-medium">
                    Access works-in-progress by verifying your secure temporary tracking key infrastructure tokens.
                </p>
            </header>

            {/* STATE A: Access Verification Gate Form */}
            {!isAuthenticated ? (
                <div className="max-w-md mx-auto mt-12 animate-fadeIn">
                    <div className="bg-white border border-zinc-200 rounded-xl shadow-sm p-6 space-y-5">
                        <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                            <Lock size={20} />
                        </div>

                        <div>
                            <h2 className="text-sm font-bold text-zinc-900">Cryptographic Identity Check</h2>
                            <p className="text-xs text-zinc-400 mt-0.5 font-medium">Provide parameters to unlock draft state metrics.</p>
                        </div>

                        {errorMessage && (
                            <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-red-700 text-xs font-semibold flex items-center gap-2">
                                <AlertTriangle size={14} className="shrink-0" />
                                <p>{errorMessage}</p>
                            </div>
                        )}

                        <form onSubmit={handleAccessSubmit} className="space-y-4">
                            <div>
                                <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wide mb-1">Draft Token ID</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={draftId}
                                        onChange={(e) => setDraftId(e.target.value)}
                                        placeholder="e.g., DFT-7892"
                                        className="w-full text-xs font-semibold border border-zinc-200 rounded-lg pl-9 pr-3 py-2.5 bg-zinc-50/50 focus:bg-white focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all uppercase placeholder:normal-case"
                                    />
                                    <FolderOpen size={14} className="absolute left-3 top-3.5 text-zinc-400" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wide mb-1">Secure Access Key</label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        value={accessKey}
                                        onChange={(e) => setAccessKey(e.target.value)}
                                        placeholder="Enter your 6-digit access key"
                                        className="w-full text-xs font-medium border border-zinc-200 rounded-lg pl-9 pr-3 py-2.5 bg-zinc-50/50 focus:bg-white focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                                    />
                                    <Key size={14} className="absolute left-3 top-3.5 text-zinc-400" />
                                </div>
                                <span className="text-[10px] text-zinc-400 font-medium block mt-1.5 px-0.5">
                                    Hint: Try ID <code className="bg-zinc-100 px-1 py-0.5 rounded text-zinc-600 font-mono">DFT-7892</code> and Key <code className="bg-zinc-100 px-1 py-0.5 rounded text-zinc-600 font-mono">123456</code> to test layout states.
                                </span>
                            </div>

                            <button
                                type="submit"
                                className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-all shadow-sm shadow-emerald-700/10 active:scale-[0.995]"
                            >
                                Unlock Draft Records <ArrowRight size={14} />
                            </button>
                        </form>
                    </div>
                </div>
            ) : (

                // STATE B: Decrypted Data Workspace Matrix View
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start animate-fadeIn">

                    {/* Main Context Card */}
                    <div className="lg:col-span-2 bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden">

                        {/* Context Notice Banner */}
                        <div className="bg-zinc-50 border-b border-zinc-100 px-6 py-4 flex flex-wrap items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded bg-amber-50 text-amber-600 border border-amber-100">
                                    <FileEdit size={16} />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-bold text-zinc-900">{mockDecryptedDraft.id}</span>
                                        <span className="text-[10px] bg-zinc-200 text-zinc-600 font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">Draft Mode</span>
                                    </div>
                                    <p className="text-[11px] text-zinc-400 mt-0.5 font-medium flex items-center gap-1">
                                        <Calendar size={12} /> Auto-Saved on {mockDecryptedDraft.lastSaved}
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={handleResetGate}
                                    className="px-3 py-1.5 text-[11px] font-bold border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-600 rounded-lg shadow-sm transition-all"
                                >
                                    Lock Session
                                </button>
                                <button className="px-3 py-1.5 text-[11px] font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-sm transition-all flex items-center gap-1">
                                    Resume Modifying
                                </button>
                            </div>
                        </div>

                        {/* Document Internal Body Content */}
                        <div className="p-6 space-y-6 text-xs font-medium text-zinc-600">

                            {/* Complainant Identity Segment Block */}
                            <div>
                                <h4 className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                                    <UserCheck size={13} className="text-emerald-600" /> Identity Allocation Status
                                </h4>
                                {mockDecryptedDraft.complainant.scope === 'revel' ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-3.5 bg-zinc-50 border border-zinc-100 rounded-lg">
                                        <div>
                                            <span className="text-[10px] font-bold text-zinc-400 uppercase block">Name Ref</span>
                                            <span className="text-zinc-800 font-bold mt-0.5 block">{mockDecryptedDraft.complainant.name}</span>
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-bold text-zinc-400 uppercase block">Email Channel</span>
                                            <span className="text-zinc-700 font-semibold mt-0.5 block">{mockDecryptedDraft.complainant.email}</span>
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-bold text-zinc-400 uppercase block">Phone Endpoint</span>
                                            <span className="text-zinc-700 font-semibold mt-0.5 block">{mockDecryptedDraft.complainant.phone}</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="p-3 bg-amber-50 text-amber-800 rounded-lg border border-amber-100">
                                        This file is completely configured for anonymous proxy routing.
                                    </div>
                                )}
                            </div>

                            {/* Categorization & Metadata Details */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                                <div>
                                    <span className="text-[10px] font-bold text-zinc-400 uppercase block">Category Matrix</span>
                                    <span className="text-zinc-800 font-bold mt-1 block">{mockDecryptedDraft.category}</span>
                                </div>
                                <div>
                                    <span className="text-[10px] font-bold text-zinc-400 uppercase block">Target Department</span>
                                    <span className="text-zinc-800 font-bold mt-1 block truncate">{mockDecryptedDraft.department}</span>
                                </div>
                                <div>
                                    <span className="text-[10px] font-bold text-zinc-400 uppercase block">Urgency Priority</span>
                                    <span className="mt-1 inline-block text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200">
                                        {mockDecryptedDraft.priority}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-[10px] font-bold text-zinc-400 uppercase block">Location Reference</span>
                                    <span className="text-zinc-700 font-semibold mt-1 flex items-center gap-1">
                                        <MapPin size={11} className="text-zinc-400" /> {mockDecryptedDraft.location || 'N/A'}
                                    </span>
                                </div>
                            </div>

                            <hr className="border-zinc-100" />

                            {/* Subject Line and Text Content */}
                            <div className="space-y-2">
                                <span className="text-[10px] font-bold text-zinc-400 uppercase block">Subject Heading</span>
                                <h3 className="text-base font-bold text-zinc-900 tracking-tight">{mockDecryptedDraft.subject}</h3>

                                <span className="text-[10px] font-bold text-zinc-400 uppercase block pt-4">Statement Log Context</span>
                                <p className="text-zinc-600 leading-relaxed bg-zinc-50/50 border border-zinc-200/60 rounded-xl p-4 font-normal text-xs whitespace-pre-line">
                                    {mockDecryptedDraft.description}
                                </p>
                            </div>

                        </div>
                    </div>

                    {/* Right Action/Info Column */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 px-1">Draft Insights</h3>
                        <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-sm space-y-4 text-xs font-medium text-zinc-600">
                            <div className="space-y-1">
                                <h4 className="font-bold text-zinc-900 flex items-center gap-1.5">
                                    <FileText size={14} className="text-emerald-600" /> Encrypted State Logs
                                </h4>
                                <p className="text-zinc-400 text-[11px] leading-relaxed">
                                    Drafts are ephemeral files that are automatically deleted after <strong>30 days of inactivity</strong>. Submitting this draft converts it into an active, un-editable case tracking index.
                                </p>
                            </div>

                            <div className="p-3 bg-zinc-50 border border-zinc-100 rounded-lg">
                                <span className="text-[10px] font-bold text-zinc-400 uppercase block">File Attachments Cached</span>
                                <span className="text-sm font-bold text-zinc-800 block mt-1">
                                    {mockDecryptedDraft.attachmentsCount} Verification File Objects
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
            )}

        </div>
    );
}