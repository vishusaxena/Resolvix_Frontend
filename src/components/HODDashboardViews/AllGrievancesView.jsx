import React, { useState, useMemo } from 'react';
import {
    LayoutDashboard, BarChart3, Files, FilePlus, FileClock,
    Clock, CheckCircle, Archive, UserCheck, RefreshCw,
    GitFork, LogOut, Bell, HelpCircle, Search, SlidersHorizontal,
    ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight
} from 'lucide-react';

// ==========================================
// 1. YOUR ORIGINAL CUSTOM TABLE (UNBROKEN)
// ==========================================
export function CustomTable({ headers, data, renderRow }) {
    return (
        <div className="w-full bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="border-b border-zinc-200 bg-zinc-50 text-zinc-500 font-medium tracking-wide">
                            {headers.map((head, i) => (
                                <th key={i} className="p-4 font-semibold text-slate-600">
                                    {head}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                        {data?.length > 0 ? (
                            data.map((item, idx) => renderRow(item, idx))
                        ) : (
                            <tr>
                                <td colSpan={headers.length} className="p-4">
                                    No records found in this view master.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// ==========================================
// 2. ALL GRIEVANCES VIEW WITH CONTROLS
// ==========================================
export default function AllGrievancesView() {
    // Mock Dataset matching TIBL structural workflow specifications
    const initialGrievances = [
        { id: 'GRV-2026-089', title: 'Lab Equipment Malfunction', category: 'Infrastructure', priority: 'High', date: '2026-06-12', status: 'Pending' },
        { id: 'GRV-2026-088', title: 'Portal Single-Sign-On Error', category: 'IT Support', priority: 'Critical', date: '2026-06-11', status: 'In Progress' },
        { id: 'GRV-2026-087', title: 'Library Access Extension', category: 'Admin', priority: 'Low', date: '2026-06-10', status: 'Resolved' },
        { id: 'GRV-2026-086', title: 'Cafeteria Hygiene Audit', category: 'Facility', priority: 'Medium', date: '2026-06-08', status: 'Closed' },
        { id: 'GRV-2026-085', title: 'Scholarship Disbursal Delay', category: 'Finance', priority: 'High', date: '2026-06-05', status: 'Pending' },
        { id: 'GRV-2026-084', title: 'Wi-Fi Downtime Block C', category: 'IT Support', priority: 'High', date: '2026-06-04', status: 'In Progress' },
        { id: 'GRV-2026-083', title: 'Air Conditioning Failure', category: 'Infrastructure', priority: 'Medium', date: '2026-06-02', status: 'Resolved' },
    ];

    // State Management for Controls
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [priorityFilter, setPriorityFilter] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Table Structure Definition
    const headers = ["Grievance ID", "Title", "Category", "Priority", "Date Raised", "Status", "Actions"];

    // 1. Filter and Search Logic
    const filteredData = useMemo(() => {
        return initialGrievances.filter(item => {
            const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.id.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
            const matchesPriority = priorityFilter === 'All' || item.priority === priorityFilter;

            return matchesSearch && matchesStatus && matchesPriority;
        });
    }, [searchTerm, statusFilter, priorityFilter]);

    // 2. Pagination Logic
    const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredData.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredData, currentPage]);

    // Reset page safely if filters out-index current view
    React.useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, statusFilter, priorityFilter]);

    // 3. Dynamic Row Render Engine passed to your original CustomTable component
    const renderGrievanceRow = (item, idx) => {
        const priorityColors = {
            Critical: 'bg-rose-100 text-rose-800 border-rose-200',
            High: 'bg-amber-100 text-amber-800 border-amber-200',
            Medium: 'bg-blue-100 text-blue-800 border-blue-200',
            Low: 'bg-zinc-100 text-zinc-800 border-zinc-200'
        };

        const statusColors = {
            'Pending': 'bg-orange-50 text-orange-700 ring-orange-600/20',
            'In Progress': 'bg-sky-50 text-sky-700 ring-sky-600/20',
            'Resolved': 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
            'Closed': 'bg-neutral-50 text-neutral-600 ring-neutral-500/10'
        };

        return (
            <tr key={item.id} className="hover:bg-zinc-50/70 transition-colors text-zinc-700">
                <td className="p-4 font-semibold text-emerald-700 font-mono">{item.id}</td>
                <td className="p-4 font-medium text-zinc-900">{item.title}</td>
                <td className="p-4 text-zinc-500">{item.category}</td>
                <td className="p-4">
                    <span className={`px-2 py-0.5 text-xs font-semibold rounded-md border ${priorityColors[item.priority]}`}>
                        {item.priority}
                    </span>
                </td>
                <td className="p-4 text-zinc-500">{item.date}</td>
                <td className="p-4">
                    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${statusColors[item.status]}`}>
                        {item.status}
                    </span>
                </td>
                <td className="p-4">
                    <button className="text-xs font-semibold text-emerald-600 hover:text-emerald-800 hover:underline">
                        View Details
                    </button>
                </td>
            </tr>
        );
    };

    return (
        <div className="flex-1 bg-zinc-50 text-zinc-800 h-screen  overflow-y-auto relative selection:bg-emerald-500/20">

            {/* MAIN VIEWPORT WORKSPACE */}
            <div className="flex-1 flex flex-col min-w-0">

                {/* COMPONENT CONTENT BODY */}
                <main className="p-6 space-y-4 flex-1">
                    <div>
                        <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">Master Grievances Index</h1>
                        <p className="text-sm text-neutral-500">View, evaluate, and prioritize tenant compliance workflows.</p>
                    </div>

                    {/* INTERACTIVE CONTROLS CONTAINER (Search & Filtering Matrix) */}
                    <div className="bg-white p-4 rounded-xl border border-zinc-200 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">

                        {/* Live Search Field */}
                        <div className="relative w-full sm:w-80">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
                            <input
                                type="text"
                                placeholder="Search case ID or description..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                            />
                        </div>

                        {/* Structured Select Dropdowns */}
                        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
                            <div className="flex items-center space-x-2 text-xs text-zinc-500 bg-zinc-50 border border-zinc-100 px-2.5 py-1.5 rounded-lg">
                                <SlidersHorizontal size={14} />
                                <span className="font-medium">Filters</span>
                            </div>

                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="text-sm border border-zinc-200 rounded-lg bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                            >
                                <option value="All">All Statuses</option>
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Resolved">Resolved</option>
                                <option value="Closed">Closed</option>
                            </select>

                            <select
                                value={priorityFilter}
                                onChange={(e) => setPriorityFilter(e.target.value)}
                                className="text-sm border border-zinc-200 rounded-lg bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                            >
                                <option value="All">All Priorities</option>
                                <option value="Critical">Critical</option>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </div>
                    </div>

                    {/* EXECUTION LAYER: PASSING PARAMS INTO YOUR UNMODIFIED CUSTOM TABLE COMPONENT */}
                    <CustomTable
                        headers={headers}
                        data={paginatedData}
                        renderRow={renderGrievanceRow}
                    />

                    {/* DYNAMIC PAGINATION CONTROLS PANEL */}
                    <div className="bg-white border border-zinc-200 rounded-xl px-4 py-3 shadow-sm flex items-center justify-between text-sm text-zinc-600">
                        <div>
                            Showing <span className="font-semibold text-zinc-900">{filteredData.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                            <span className="font-semibold text-zinc-900">{Math.min(currentPage * itemsPerPage, filteredData.length)}</span> of{' '}
                            <span className="font-semibold text-zinc-900">{filteredData.length}</span> results
                        </div>

                        <div className="flex items-center space-x-1">
                            <button
                                onClick={() => setCurrentPage(1)}
                                disabled={currentPage === 1}
                                className="p-1.5 rounded border border-zinc-200 hover:bg-zinc-50 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
                            >
                                <ChevronsLeft size={16} />
                            </button>
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="p-1.5 rounded border border-zinc-200 hover:bg-zinc-50 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
                            >
                                <ChevronLeft size={16} />
                            </button>

                            <div className="px-3 text-xs font-medium text-zinc-500">
                                Page {currentPage} of {totalPages}
                            </div>

                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="p-1.5 rounded border border-zinc-200 hover:bg-zinc-50 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
                            >
                                <ChevronRight size={16} />
                            </button>
                            <button
                                onClick={() => setCurrentPage(totalPages)}
                                disabled={currentPage === totalPages}
                                className="p-1.5 rounded border border-zinc-200 hover:bg-zinc-50 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
                            >
                                <ChevronsRight size={16} />
                            </button>
                        </div>
                    </div>

                </main>
            </div>
        </div>
    );
}