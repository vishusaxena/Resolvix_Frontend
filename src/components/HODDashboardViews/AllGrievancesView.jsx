import React from "react";
import { CustomTable, Modal } from "../UI";
import { useState } from "react";
import { formatDate } from "../../utils/services";

export default function AllGrievancesView({ grievances, headers, filters, viewDetails }) {
    const [detailsModal, setDetailsModal] = useState(null);
    const grievanceDetail = viewDetails?.find(
        g => g.grievanceCode === detailsModal
    );
    const getStatusStyles = (status) => {
        switch (status?.toLowerCase()) {
            case 'resolved':
            case 'closed':
                return 'bg-emerald-50 text-emerald-700 border-emerald-200';
            case 'in progress':
            case 'pending':
                return 'bg-amber-50 text-amber-700 border-amber-200';
            default:
                return 'bg-zinc-100 text-zinc-700 border-zinc-200';
        }
    };

    // Helper function to color code priority badges
    const getPriorityStyles = (priority) => {
        switch (priority?.toLowerCase()) {
            case 'high':
            case 'urgent':
                return 'bg-rose-50 text-rose-700 border-rose-200';
            case 'medium':
                return 'bg-amber-50 text-amber-700 border-amber-200';
            default:
                return 'bg-sky-50 text-sky-700 border-sky-200';
        }
    };
    const renderGrievanceRow = (item, idx) => {
        const priorityColors = {
            Critical:
                "bg-rose-100 text-rose-800 border border-rose-200",
            High:
                "bg-amber-100 text-amber-800 border border-amber-200",
            Medium:
                "bg-blue-100 text-blue-800 border border-blue-200",
            Low:
                "bg-zinc-100 text-zinc-700 border border-zinc-200",
        };

        const statusColors = {
            Pending:
                "bg-orange-50 text-orange-700 ring-orange-600/20",
            "In Progress":
                "bg-sky-50 text-sky-700 ring-sky-600/20",
            Resolved:
                "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
            Closed:
                "bg-zinc-50 text-zinc-600 ring-zinc-500/10",
        };

        return (
            <tr
                key={idx}
                className="hover:bg-zinc-50 transition-colors"
            >
                <td className="p-4 font-semibold text-emerald-700 font-mono">
                    {item.grievanceId}
                </td>

                <td className="p-4 font-medium text-zinc-900">
                    {item.title}
                </td>
                <td className="p-4">
                    <span
                        className={`px-2 py-1 rounded-md text-xs font-semibold ${priorityColors[item.priority]}`}
                    >
                        {item.priority}
                    </span>
                </td>

                <td className="p-4 text-zinc-600">
                    {formatDate(item.dateRaised)}
                </td>

                <td className="p-4">
                    <span
                        className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${statusColors[item.status]}`}
                    >
                        {item.status}
                    </span>
                </td>

                <td className="p-4">
                    <button
                        className="text-sm font-medium text-emerald-600 hover:text-emerald-800 hover:underline"
                        onClick={() => setDetailsModal(item.grievanceId)}
                    >
                        View Details
                    </button>
                </td>
            </tr>
        );
    };

    return (
        <div className="flex-1 bg-zinc-50 min-h-screen">
            <main className="p-6 space-y-5">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900">
                        Master Grievances Index
                    </h1>

                    <p className="text-sm text-zinc-500 mt-1">
                        View, evaluate and manage all grievance
                        workflows.
                    </p>
                </div>

                <CustomTable
                    headers={headers}
                    data={grievances}
                    renderRow={renderGrievanceRow}
                    itemsPerPage={5}
                    searchKeys={["id", "title", "category"]}
                    filters={filters}
                />
                <Modal
                    isOpen={!!detailsModal}
                    size="xl" // Bumped to xl for a more breathable side-by-side/grid feel
                    onClose={() => setDetailsModal(null)}
                    title="Grievance Details"
                >
                    {grievanceDetail && (
                        <div className="space-y-6 p-1 text-zinc-800 antialiased">

                            {/* Header Section */}
                            <div className="border-b border-zinc-200 pb-5">
                                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                                    <h2 className="text-xl font-semibold tracking-tight text-zinc-900">
                                        {grievanceDetail.grievanceDetails?.complaintSubject || "No Subject Specified"}
                                    </h2>
                                    <span className="inline-flex items-center rounded-md bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600 ring-1 ring-inset ring-zinc-500/10">
                                        {grievanceDetail.grievanceCode}
                                    </span>
                                </div>
                            </div>

                            {/* Metadata Grid (3 columns on desktop for better spatial balance) */}
                            <div className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-5">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-4">
                                    Ticket Overview
                                </h3>
                                <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-3">
                                    <div>
                                        <p className="text-xs font-medium text-zinc-400">Status</p>
                                        <div className="mt-1">
                                            <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getStatusStyles(grievanceDetail.grievanceStatus)}`}>
                                                {grievanceDetail.grievanceStatus}
                                            </span>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-xs font-medium text-zinc-400">Priority</p>
                                        <div className="mt-1">
                                            <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getPriorityStyles(grievanceDetail.grievanceDetails?.complaintPriority)}`}>
                                                {grievanceDetail.grievanceDetails?.complaintPriority}
                                            </span>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-xs font-medium text-zinc-400">Department</p>
                                        <p className="mt-1 text-sm font-semibold text-zinc-800">
                                            {grievanceDetail.grievanceDetails?.complaintDepartment?.departmentName || 'N/A'}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs font-medium text-zinc-400">Complaint Type</p>
                                        <p className="mt-1 text-sm font-medium text-zinc-700">
                                            {grievanceDetail.grievanceDetails?.complaintType}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs font-medium text-zinc-400">Tracking ID</p>
                                        <p className="mt-1 text-sm font-mono text-zinc-700">
                                            {grievanceDetail.trackingId}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs font-medium text-zinc-400">Created On</p>
                                        <p className="mt-1 text-sm font-medium text-zinc-700">
                                            {formatDate(grievanceDetail.createdAt)}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Complainant Details (Conditional Card) */}
                            {grievanceDetail.grievanceDetails?.complaintType === "Named" && (
                                <div className="rounded-xl border border-zinc-200 p-5">
                                    <h3 className="text-sm font-semibold text-zinc-900 mb-4">
                                        Complainant Information
                                    </h3>
                                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                                        <div className="space-y-0.5">
                                            <p className="text-xs text-zinc-400 font-medium">Full Name</p>
                                            <p className="text-sm font-medium text-zinc-800">
                                                {grievanceDetail.grievanceDetails?.complainantName}
                                            </p>
                                        </div>
                                        <div className="space-y-0.5">
                                            <p className="text-xs text-zinc-400 font-medium">Email Address</p>
                                            <p className="text-sm font-medium text-zinc-800 break-all">
                                                {grievanceDetail.grievanceDetails?.complainantEmail}
                                            </p>
                                        </div>
                                        <div className="space-y-0.5">
                                            <p className="text-xs text-zinc-400 font-medium">Phone Number</p>
                                            <p className="text-sm font-medium text-zinc-800">
                                                {grievanceDetail.grievanceDetails?.complainantPhone}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Description Block */}
                            <div className="space-y-2">
                                <h3 className="text-sm font-semibold text-zinc-900">
                                    Detailed Description
                                </h3>
                                <div className="rounded-xl border border-zinc-200 bg-white p-4 text-sm leading-relaxed text-zinc-600 shadow-sm whitespace-pre-wrap">
                                    {grievanceDetail.grievanceDetails?.complaintDetails}
                                </div>
                            </div>

                            {/* Attachments Block */}
                            {grievanceDetail.grievanceDetails?.complaintAttachments?.length > 0 && (
                                <div className="space-y-3">
                                    <h3 className="text-sm font-semibold text-zinc-900">
                                        Attachments ({grievanceDetail.grievanceDetails.complaintAttachments.length})
                                    </h3>
                                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                        {grievanceDetail.grievanceDetails.complaintAttachments.map((file) => (
                                            <a
                                                key={file._id}
                                                href={file.url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="group flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-3.5 transition-all hover:border-zinc-300 hover:bg-zinc-50 hover:shadow-sm"
                                            >
                                                <div className="flex items-center space-x-3 overflow-hidden">
                                                    {/* Minimalistic Attachment Icon Asset Placeholder */}
                                                    <svg className="h-5 w-5 flex-shrink-0 text-zinc-400 group-hover:text-zinc-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
                                                    </svg>
                                                    <span className="truncate text-sm font-medium text-zinc-600 group-hover:text-zinc-900">
                                                        {file.fileName}
                                                    </span>
                                                </div>
                                                <span className="text-xs font-semibold text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    View →
                                                </span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </Modal>
            </main>
        </div>
    );
}