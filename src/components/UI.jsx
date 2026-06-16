import axios from 'axios';
import React, { useEffect, useState, useMemo } from 'react';
import {
    Search,
    SlidersHorizontal,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight
} from "lucide-react";

// Minimalistic Light Input & Button Group
export function InputGroup({ label, ...props }) {
    return (
        <div className={`${props.className}`}>
            {label && (
                <label className="block text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-1">
                    {label}
                </label>
            )}
            <input
                {...props}
                className={`
    w-full
    bg-white
    border border-slate-300
    rounded-lg
    px-4 py-3
    text-sm
    text-slate-700
    placeholder-slate-400
    focus:outline-none
    focus:ring-2
    focus:ring-teal-500
    focus:border-teal-500
     ${props.disabled ? 'cursor-not-allowed bg-zinc-100' : 'hover:border-slate-400'}
  `}
            />
        </div>
    );
}

// Clean Minimal Switch Toggle
export function Switch({ checked, onChange, label, customClass = "justify-start" }) {
    return (
        <div className={`flex items-center ${customClass} ml-5`}>
            {label && (
                <span className="block text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mr-5 ">
                    {label}
                </span>
            )}
            <button
                type="button"
                onClick={() => onChange(!checked)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${checked ? 'bg-emerald-600' : 'bg-zinc-200'
                    }`}
            >
                <span
                    className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${checked ? 'translate-x-4' : 'translate-x-0'
                        }`}
                />
            </button>
        </div>
    );
}

// Elite High-Density Data Table



export function CustomTable({
    headers,
    data = [],
    renderRow,
    searchKeys = [],
    filters = [],
    itemsPerPage = 10
}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterValues, setFilterValues] = useState({});
    const [currentPage, setCurrentPage] = useState(1);

    // Filtering + Search
    const filteredData = useMemo(() => {
        return data.filter((item) => {
            const matchesSearch =
                !searchTerm ||
                searchKeys.some((key) =>
                    String(item[key] || "")
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                );

            const matchesFilters = filters.every((filter) => {
                const value = filterValues[filter.key] || "All";

                if (value === "All") return true;

                return item[filter.key] === value;
            });

            return matchesSearch && matchesFilters;
        });
    }, [data, searchTerm, filterValues, filters, searchKeys]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, filterValues]);

    const totalPages =
        Math.ceil(filteredData.length / itemsPerPage) || 1;

    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredData.slice(start, start + itemsPerPage);
    }, [filteredData, currentPage, itemsPerPage]);

    return (
        <div className="space-y-4">

            {/* Search + Filters */}
            <div className="bg-white p-4 rounded-xl border border-zinc-200 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">

                <div className="relative w-full sm:w-80">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) =>
                            setSearchTerm(e.target.value)
                        }
                        className="w-full pl-9 pr-4 py-2 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    />
                </div>

                {filters.length > 0 && (
                    <div className="flex flex-wrap gap-3 items-center">
                        <div className="flex items-center gap-2 text-xs text-zinc-500 bg-zinc-50 border border-zinc-100 px-2.5 py-1.5 rounded-lg">
                            <SlidersHorizontal size={14} />
                            <span className="font-medium">
                                Filters
                            </span>
                        </div>

                        {filters.map((filter) => (
                            <select
                                key={filter.key}
                                value={
                                    filterValues[filter.key] ||
                                    "All"
                                }
                                onChange={(e) =>
                                    setFilterValues((prev) => ({
                                        ...prev,
                                        [filter.key]:
                                            e.target.value
                                    }))
                                }
                                className="text-sm border border-zinc-200 rounded-lg bg-white px-3 py-2"
                            >
                                <option value="All">
                                    All {filter.label}
                                </option>

                                {filter.options.map((option) => (
                                    <option
                                        key={option}
                                        value={option}
                                    >
                                        {option}
                                    </option>
                                ))}
                            </select>
                        ))}
                    </div>
                )}
            </div>

            {/* Table */}
            <div className="w-full bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-zinc-200 bg-zinc-50">
                                {headers.map((head, i) => (
                                    <th
                                        key={i}
                                        className="p-4 font-semibold text-slate-600"
                                    >
                                        {head}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-zinc-100">
                            {paginatedData.length > 0 ? (
                                paginatedData.map((item, idx) =>
                                    renderRow(item, idx)
                                )
                            ) : (
                                <tr>
                                    <td
                                        colSpan={headers.length}
                                        className="p-6 text-center text-zinc-500"
                                    >
                                        No records found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            <div className="bg-white border border-zinc-200 rounded-xl px-4 py-3 shadow-sm flex items-center justify-between text-sm text-zinc-600">

                <div>
                    Showing{" "}
                    <span className="font-semibold text-zinc-900">
                        {filteredData.length === 0
                            ? 0
                            : (currentPage - 1) *
                            itemsPerPage +
                            1}
                    </span>{" "}
                    to{" "}
                    <span className="font-semibold text-zinc-900">
                        {Math.min(
                            currentPage * itemsPerPage,
                            filteredData.length
                        )}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-zinc-900">
                        {filteredData.length}
                    </span>
                </div>

                <div className="flex items-center gap-1">
                    <button
                        onClick={() => setCurrentPage(1)}
                        disabled={currentPage === 1}
                        className="p-1.5 border rounded disabled:opacity-40"
                    >
                        <ChevronsLeft size={16} />
                    </button>

                    <button
                        onClick={() =>
                            setCurrentPage((p) =>
                                Math.max(1, p - 1)
                            )
                        }
                        disabled={currentPage === 1}
                        className="p-1.5 border rounded disabled:opacity-40"
                    >
                        <ChevronLeft size={16} />
                    </button>

                    <span className="px-3">
                        Page {currentPage} of {totalPages}
                    </span>

                    <button
                        onClick={() =>
                            setCurrentPage((p) =>
                                Math.min(totalPages, p + 1)
                            )
                        }
                        disabled={currentPage === totalPages}
                        className="p-1.5 border rounded disabled:opacity-40"
                    >
                        <ChevronRight size={16} />
                    </button>

                    <button
                        onClick={() =>
                            setCurrentPage(totalPages)
                        }
                        disabled={currentPage === totalPages}
                        className="p-1.5 border rounded disabled:opacity-40"
                    >
                        <ChevronsRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function BoxCard({
    title,
    subtitle,
    borderColor = 'border-t-violet-500', // Default top border color
    className = '',                      // Custom classes fallback
    children,
    childClasses        // Default background color
}) {
    return (
        <div className={`border border-t-4 ${borderColor} rounded-xl p-5  ${className}`}>

            {/* Header Area (Optional) */}
            {(title || subtitle) && (
                <div className="mb-4">
                    {title && (
                        <h3 className="text-base font-bold tracking-tight">
                            {title}
                        </h3>
                    )}
                    {subtitle && (
                        <p className="text-xs  mt-0.5">
                            {subtitle}
                        </p>
                    )}
                </div>
            )}

            {/* Main Content Area */}
            <div className={`${childClasses}`} >
                {children}
            </div>
        </div>
    );
}


export const Modal = ({
    isOpen,
    onClose,
    title = "Modal Title",
    subtitle,
    children,
    footerButtons, // Array of element nodes/ModalButtons or custom jsx
    size = "md", // 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
    closeOnBackdropClick = true,
}) => {

    // Bind local window loop parameters for structural layout dismissals
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            window.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden'; // Lock background scrolling
        }
        return () => {
            window.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    // Upgraded sizing allocations
    const sizeClasses = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        '2xl': 'max-w-6xl',
        'full': 'max-w-[calc(100vw-2rem)] h-[calc(100vh-2rem)]'
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/40 backdrop-blur-xs animate-fade-in">
            {/* Backdrop wrapper handling trigger parameters */}
            <div
                className="absolute inset-0 cursor-default"
                onClick={closeOnBackdropClick ? onClose : undefined}
            />

            {/* Main Modal Surface Card */}
            <div className={`w-full ${sizeClasses[size]} bg-white rounded-xl border border-zinc-200 shadow-2xl relative z-10 flex flex-col overflow-hidden max-h-[calc(100vh-2rem)] transform scale-100 transition-all duration-300`}>

                {/* Header Section Container */}
                <div className="px-6 py-5 border-b border-zinc-100 flex items-start justify-between bg-white shrink-0">
                    <div>
                        <h3 className="text-xl font-bold text-zinc-900 tracking-tight">
                            {title}
                        </h3>
                        {subtitle && (
                            <p className="mt-1 text-sm text-zinc-500 font-normal">
                                {subtitle}
                            </p>
                        )}
                    </div>

                    {/* Native Anchor Close Trigger Element */}
                    <button
                        onClick={onClose}
                        className="text-zinc-400 hover:text-zinc-600 hover:bg-zinc-50 p-1.5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-200"
                        aria-label="Close modal"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Main Yield Content View Window */}
                <div className="p-6 overflow-y-auto text-zinc-700 text-sm flex-1">
                    {children}
                </div>

                {/* Composite Footer Actions Container */}
                {footerButtons && (
                    <div className="px-6 py-4 bg-zinc-50/70 border-t border-zinc-100 flex items-center justify-end gap-3 shrink-0">
                        {footerButtons}
                    </div>
                )}
            </div>
        </div>
    );
};

export function SelectBox({
    label,
    type,        // Pass "roles" or "departments"
    tenantId,    // Pass the active tenant identifier string
    value,       // Controlled component value (the selected code)
    onChange,    // Function to handle value changes
    placeholder = "Select an option..."
}) {
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Build URL query strings dynamically
        const params = new URLSearchParams();
        if (type) params.append('type', type);
        if (tenantId) params.append('tenantId', tenantId);

        // Prevent firing empty or invalid requests if neither is configured yet
        if (!type && !tenantId) return;

        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:5000/api/data?${params.toString()}`);
                if (response.data.success && response.data.data) {
                    setOptions(response.data.data); // Targets the normalized data array safely
                } else {
                    setOptions([]);
                }
            } catch (error) {
                console.error("Failed to fetch select options:", error);
                setOptions([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [tenantId, type]); // Fires fresh API queries automatically whenever these parameters mutate

    return (
        <div className="w-full">
            {label && (
                <label className="block text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-1">
                    {label}
                </label>
            )}
            <div className="relative">
                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    disabled={loading || options.length === 0}
                    className={`
                        w-full appearance-none bg-white border border-slate-300 rounded-lg px-4 py-3 
                        text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 
                        focus:ring-teal-500 focus:border-teal-500 cursor-pointer
                        ${(loading || options.length === 0) ? 'bg-zinc-50 cursor-not-allowed text-zinc-400' : 'hover:border-slate-400'}
                    `}
                >
                    <option value="" disabled>
                        {loading ? 'Loading items...' : placeholder}
                    </option>

                    {options.map((opt) => (
                        <option key={opt.code} value={opt.name}>
                            {opt.name}
                        </option>
                    ))}
                </select>

                {/* Micro chevron arrow dropdown indicator */}
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
        </div>
    );
}

export const Button = ({
    children,
    onClick,
    variant = "primary", // primary, secondary, accent, danger, ghost, outline
    size = "md",         // sm, md, lg, xl
    className = "",      // Tailored styling injects
    type = "button",
    disabled = false,
    fullWidth = false,
    ...props
}) => {

    // Core structural mechanics
    const baseClasses = "inline-flex items-center justify-center font-medium tracking-tight transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none";

    // Theme configurations (Using zinc/violet styling palettes matching modern setups)
    const variantClasses = {
        primary: "bg-zinc-900 text-white hover:bg-zinc-800 border border-transparent focus:ring-zinc-950 shadow-xs",
        secondary: "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 border border-transparent focus:ring-zinc-300",
        accent: "bg-violet-600 text-white hover:bg-violet-700 border border-transparent focus:ring-violet-500 shadow-sm",
        danger: "bg-rose-600 text-white hover:bg-rose-700 border border-transparent focus:ring-rose-500 shadow-xs",
        outline: "bg-transparent text-zinc-700 border border-zinc-200 hover:bg-zinc-50 hover:border-zinc-300 focus:ring-zinc-200",
        ghost: "bg-transparent text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 focus:ring-zinc-300",
    };

    // Sizing system scale matrix
    const sizeClasses = {
        sm: "text-xs px-3 py-1.5 gap-1.5 rounded-md",
        md: "text-sm px-4 py-2 gap-2",
        lg: "text-base px-5 py-2.5 gap-2.5",
        xl: "text-lg px-6 py-3 gap-3 rounded-xl",
    };

    const widthClass = fullWidth ? "w-full flex" : "";

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};