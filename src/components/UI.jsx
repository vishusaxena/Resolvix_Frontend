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
export function Switch({ checked, onChange, label }) {
    return (
        <div className="flex items-center justify-start ml-5">
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
    primaryLabel = "Confirm",
    onPrimaryClick,
    secondaryLabel = "Cancel",
    showFooter = true,
    size = "md" // sm, md, lg, xl
}) => {

    // Close modal on 'Escape' key press
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    // Configuration for modal sizing
    const sizeClasses = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl'
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs transition-opacity animate-fade-in">
            {/* Backdrop overlay trigger */}
            <div className="absolute inset-0" onClick={onClose} />

            {/* Modal Card Container */}
            <div className={`w-full ${sizeClasses[size]} bg-white rounded-xl border border-zinc-200 shadow-xl relative z-10 overflow-hidden transform transition-all duration-300 scale-100`}>

                {/* Header Section */}
                <div className="px-6 py-5 border-b border-zinc-100 flex items-start justify-between">
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
                    {/* Close Icon Cross */}
                    <button
                        onClick={onClose}
                        className="text-zinc-400 hover:text-zinc-600 p-1 rounded-lg transition-colors focus:outline-none"
                        aria-label="Close modal"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content Body Section */}
                <div className="p-6 overflow-y-auto max-h-[calc(100vh-16rem)] text-zinc-700 text-sm">
                    {children}
                </div>

                {/* Footer Actions Section */}
                {showFooter && (
                    <div className="px-6 py-4 bg-zinc-50 border-t border-zinc-100 flex items-center justify-end gap-3">
                        {secondaryLabel && (
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-sm font-medium text-zinc-700 bg-white border border-zinc-300 rounded-lg hover:bg-zinc-50 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                            >
                                {secondaryLabel}
                            </button>
                        )}
                        {primaryLabel && (
                            <button
                                type="button"
                                onClick={onPrimaryClick}
                                className="px-4 py-2 text-sm font-medium text-white bg-[#00A86B] rounded-lg hover:bg-[#00945e] transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 shadow-sm"
                            >
                                {primaryLabel}
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};