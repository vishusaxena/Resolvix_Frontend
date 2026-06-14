import React, { useEffect, useState } from "react";
import {
    X,
    Copy,
    Check,
    AlertTriangle,
    CheckCircle2,
    Info,
    AlertCircle
} from "lucide-react";

// Modal Type Style Map Matrix
const TYPE_CONFIGS = {
    info: {
        icon: Info,
        iconColor: "text-blue-600",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-100",
        buttonBg: "bg-blue-600 hover:bg-blue-700 shadow-blue-700/10",
    },
    success: {
        icon: CheckCircle2,
        iconColor: "text-emerald-600",
        bgColor: "bg-emerald-50",
        borderColor: "border-emerald-100",
        buttonBg: "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-700/10",
    },
    warning: {
        icon: AlertTriangle,
        iconColor: "text-amber-600",
        bgColor: "bg-amber-50",
        borderColor: "border-amber-100",
        buttonBg: "bg-amber-600 hover:bg-amber-700 shadow-amber-700/10",
    },
    danger: {
        icon: AlertCircle,
        iconColor: "text-red-600",
        bgColor: "bg-red-50",
        borderColor: "border-red-100",
        buttonBg: "bg-red-600 hover:bg-red-700 shadow-red-700/10",
    }
};

export default function ConfigurableDialog({
    isOpen,
    onClose,
    title,
    description,
    type = "info", // info | success | warning | danger
    clipboardValue = null, // If provided, shows a copyable action slot
    clipboardLabel = "Tracking ID",
    confirmText = "Confirm Action",
    onConfirm = null, // If left null, the action button stays completely hidden
    children
}) {
    const [copied, setCopied] = useState(false);

    // Auto-reset copied indicator state when modal state changes
    useEffect(() => {
        if (!isOpen) setCopied(false);
    }, [isOpen]);

    if (!isOpen) return null;

    const currentType = TYPE_CONFIGS[type] || TYPE_CONFIGS.info;
    const IconComponent = currentType.icon;

    const handleCopyClipboard = async () => {
        if (!clipboardValue) return;
        try {
            await navigator.clipboard.writeText(clipboardValue);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to execute clipboard copy operation:", err);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 selection:bg-emerald-500/20">

            {/* 1. Backdrop Blur Overlay Layer */}
            <div
                className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm transition-opacity animate-fadeIn"
                onClick={onClose}
            />

            {/* 2. Dialog Core Card Structure */}
            <div className="bg-white border border-zinc-200 rounded-2xl w-full max-w-md shadow-xl relative z-10 overflow-hidden animate-scaleIn transform transition-all p-6 space-y-5">

                {/* Absolute Top Exit Anchor */}
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-zinc-400 hover:text-zinc-600 rounded-lg p-1 hover:bg-zinc-100 transition-all"
                >
                    <X size={16} />
                </button>

                {/* Header Stack Segment */}
                <div className="flex items-start gap-3.5 pr-6">
                    <div className={`w-10 h-10 rounded-xl ${currentType.bgColor} border ${currentType.borderColor} flex items-center justify-center ${currentType.iconColor} shrink-0`}>
                        <IconComponent size={20} />
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-sm font-bold text-zinc-900 tracking-tight">{title}</h3>
                        {description && (
                            <p className="text-xs text-zinc-400 font-medium leading-relaxed">{description}</p>
                        )}
                    </div>
                </div>

                {/* Dynamic Nested Structural Slot injection Point */}
                {children && (
                    <div className="text-xs text-zinc-600 font-medium leading-relaxed border-t border-b border-zinc-100 py-3">
                        {children}
                    </div>
                )}

                {/* 3. Clipboard Shortcut Subsystem */}
                {clipboardValue && (
                    <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-3 flex items-center justify-between gap-4 font-medium">
                        <div className="min-w-0">
                            <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">
                                {clipboardLabel}
                            </span>
                            <span className="text-xs font-mono font-bold text-zinc-800 truncate block mt-0.5 select-all">
                                {clipboardValue}
                            </span>
                        </div>

                        <button
                            type="button"
                            onClick={handleCopyClipboard}
                            className={`shrink-0 flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg border transition-all shadow-sm ${copied
                                ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                                : "bg-white hover:bg-zinc-50 border-zinc-200 text-zinc-600"
                                }`}
                        >
                            {copied ? (
                                <>
                                    <Check size={13} /> Copied!
                                </>
                            ) : (
                                <>
                                    <Copy size={13} /> Copy Value
                                </>
                            )}
                        </button>
                    </div>
                )}

                {/* 4. Action Controls Footer Row */}
                <div className="flex items-center justify-end gap-2.5 pt-1">
                    {/* Secondary fallback button text modifies dynamically if onConfirm exists */}
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-3.5 py-2 text-xs font-bold border border-zinc-200 text-zinc-600 bg-white hover:bg-zinc-50 rounded-lg shadow-sm transition-all"
                    >
                        {onConfirm ? "Cancel" : "Close"}
                    </button>

                    {/* Conditional Rendering Block for Primary Action Button */}
                    {onConfirm && (
                        <button
                            type="button"
                            onClick={() => {
                                onConfirm();
                                onClose();
                            }}
                            className={`px-4 py-2 text-xs font-bold text-white rounded-lg transition-all shadow-sm ${currentType.buttonBg}`}
                        >
                            {confirmText}
                        </button>
                    )}
                </div>

            </div>
        </div>
    );
}