import React from "react";
import { CustomTable } from "../UI";
import { useState } from "react";
import { formatDate } from "../../utils/services";

export default function AllGrievancesView({ grievances, headers, filters }) {

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
                    <button className="text-sm font-medium text-emerald-600 hover:text-emerald-800 hover:underline">
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
            </main>
        </div>
    );
}