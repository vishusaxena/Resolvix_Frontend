import React from 'react';

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
export function Switch({ checked, onChange, label, description }) {
    return (
        <div className="flex items-center justify-between p-3 bg-zinc-50 border border-zinc-100 rounded-lg">
            <div>
                <span className="block text-xs font-medium text-zinc-800">{label}</span>
                {description && <span className="block text-[11px] text-zinc-400">{description}</span>}
            </div>
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
                        {data.length > 0 ? (
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