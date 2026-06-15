import React, { useState } from 'react';
import {
    FileText,
    UploadCloud,
    ShieldCheck,
    Clock,
    AlertCircle,
    CheckCircle,
    Paperclip,
    Trash2,
    User,
    Building
} from 'lucide-react';
import FileUploader from '../../utils/hooks';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ConfigurableDialog from '../ConfigurableDialog';
import { SelectBox } from '../UI';

export default function SubmitGrievanceView() {
    const { tenantCode } = useParams()
    const token = localStorage.getItem("token");
    // Form State
    const [formData, setFormData] = useState({
        complainantName: "",
        complainantEmail: "",
        complainantPhone: "",
        complaintType: "Anonymous",
        complaintSubject: "",
        complaintDetails: "",
        complaintPriority: "",
        complaintDepartment: {
            departmentCode: "",
            departmentName: "",
        },
        complaintAttachments: [{
            fileName: "",
            fileExt: "",
            fileBase64: "",
        }]
    });

    const [files, setFiles] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [isOpen, setIsOpen] = useState(false);


    // Mock Dropdown configurations
    const categories = ["Infrastructure", "Academic", "IT Support", "Finance", "HR", "General"];
    const departments = ["Administration", "Facility Operations", "Academic Board", "Bursar Office", "Technical Support Team"];

    // File Drop Handlers
    const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
    const handleDragLeave = () => setIsDragging(false);
    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files) {
            setFiles([...files, ...Array.from(e.dataTransfer.files)]);
        }
    };

    const removeFile = (indexToRemove) => {
        const updatedFiles = files.filter(
            (_, idx) => idx !== indexToRemove
        );

        setFiles(updatedFiles);

        setFormData(prev => ({
            ...prev,
            complaintAttachments: updatedFiles
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!formData) return;
            const payload = {
                ...formData,
                complaintType:
                    !formData.complainantEmail &&
                        !formData.complainantName &&
                        !formData.complainantPhone
                        ? "Anonymous"
                        : "Named",
            };

            const response = await axios.post(
                `http://localhost:5000/api/users/grievance/${tenantCode}`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.data.status === 'success') {
                setIsOpen(true);
            }
        } catch (err) {
            console.error('Error adding department:', err);
        }
    }

    return (
        <div className="flex-1 bg-zinc-50 text-zinc-800 min-h-screen px-8 py-10 overflow-y-auto selection:bg-emerald-500/20">
            <ConfigurableDialog
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                type="success" // Options: "info", "success", "warning", "danger"
                title="Grievance Submitted Successfully"
                description="Your Grievance is Submitted Successfully"

            /* Notice: onConfirm is left out completely here */
            />

            {/* Header Banner Section */}
            <header className="mb-8">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-2.5 py-1 rounded-full">
                    Grievance Submission Engine
                </span>
                <h1 className="text-2xl font-bold tracking-tight text-zinc-900 mt-3">File an Official Grievance</h1>
                <p className="text-zinc-500 text-xs mt-1 font-medium">
                    Please provide complete details. Submissions are securely routed and encrypted upon filing.
                </p>
            </header>

            {/* Main Split Interface */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                {/* LEFT COLUMN: Main Form Interface (Spans 2 columns) */}
                <div className="lg:col-span-2 space-y-6">
                    <form className="bg-white border border-zinc-200 rounded-xl shadow-sm p-6 space-y-6" onSubmit={handleSubmit}>

                        {/* 1. Complainant Details Section */}
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-4 flex items-center gap-2">
                                <User size={14} className="text-emerald-600" /> Complainant Details
                            </h3>

                            {/* Identity Scope Selector */}
                            <div className="grid grid-cols-2 gap-3 mb-4">
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, complaintType: 'Named' })}
                                    className={`p-3 rounded-lg border text-xs font-bold transition-all text-center ${formData.identityScope === 'revel'
                                        ? 'border-emerald-600 bg-emerald-50 text-emerald-700'
                                        : 'border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50'
                                        }`}
                                >
                                    Standard Public Filing
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, complaintType: 'Anonymous' })}
                                    className={`p-3 rounded-lg border text-xs font-bold transition-all text-center ${formData.identityScope === 'anonymous'
                                        ? 'border-amber-500 bg-amber-50 text-amber-700'
                                        : 'border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50'
                                        }`}
                                >
                                    File Anonymously
                                </button>
                            </div>

                            {formData.complaintType === 'Named' ? (
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fadeIn">
                                    <div>
                                        <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wide mb-1">Full Name</label>
                                        <input
                                            type="text"
                                            placeholder="e.g., John Doe"
                                            value={formData.complainantName}
                                            onChange={e => setFormData({ ...formData, complainantName: e.target.value })}
                                            className="w-full text-xs font-medium border border-zinc-200 rounded-lg p-2.5 bg-zinc-50/50 focus:bg-white focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wide mb-1">Email Address</label>
                                        <input
                                            type="email"
                                            placeholder="johndoe@institution.edu"
                                            value={formData.complainantEmail}
                                            onChange={e => setFormData({ ...formData, complainantEmail: e.target.value })}
                                            className="w-full text-xs font-medium border border-zinc-200 rounded-lg p-2.5 bg-zinc-50/50 focus:bg-white focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wide mb-1">Phone Vector</label>
                                        <input
                                            type="tel"
                                            placeholder="+1 (555) 000-0000"
                                            value={formData.complainantPhone}
                                            onChange={e => setFormData({ ...formData, complainantPhone: e.target.value })}
                                            className="w-full text-xs font-medium border border-zinc-200 rounded-lg p-2.5 bg-zinc-50/50 focus:bg-white focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="p-3 bg-amber-50/60 border border-amber-200 text-amber-800 text-xs font-medium rounded-lg flex items-start gap-2.5 animate-fadeIn">
                                    <AlertCircle size={16} className="text-amber-600 mt-0.5 shrink-0" />
                                    <p>
                                        <strong>Anonymity Enabled:</strong> Your structural metadata, profile tags, and contact parameters will be stripped from this record. Response trackers will use your secure tracking token key instead.
                                    </p>
                                </div>
                            )}
                        </div>

                        <hr className="border-zinc-100" />

                        {/* 2. Grievance Context Inputs */}
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-4 flex items-center gap-2">
                                <Building size={14} className="text-emerald-600" /> Case Classifications
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <SelectBox
                                        label="Target Department"
                                        type="departments"
                                        tenantId={tenantCode}
                                        placeholder="Select a department"
                                        onChange={dept => setFormData({ ...formData, complaintDepartment: { departmentCode: dept, departmentName: dept } })}
                                        value={formData.complaintDepartment.departmentCode}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                                <div className="sm:col-span-2">
                                    <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wide mb-1">Subject Heading</label>
                                    <input
                                        type="text"
                                        placeholder="Provide a clear headline for your grievance case"
                                        value={formData.complaintSubject}
                                        onChange={e =>
                                            setFormData({
                                                ...formData,
                                                complaintSubject: e.target.value
                                            })
                                        }
                                        className="w-full text-xs font-medium border border-zinc-200 rounded-lg p-2.5 bg-zinc-50/50 focus:bg-white focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wide mb-1">Urgency Priority</label>
                                    <select className="w-full text-xs font-bold border border-zinc-200 rounded-lg p-2.5 bg-zinc-50/50 focus:bg-white outline-none transition-all"
                                        value={formData.complaintPriority}
                                        onChange={e =>
                                            setFormData({
                                                ...formData,
                                                complaintPriority: e.target.value
                                            })
                                        }
                                    >
                                        <option value="Low">Low (Routine Review)</option>
                                        <option value="Medium" selected>Medium (Standard Turn)</option>
                                        <option value="High">High (Immediate Action)</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wide mb-1">Comprehensive Description</label>
                                <textarea
                                    rows={5}
                                    placeholder="Please state facts clearly, including exact logs, times, and key events..."
                                    value={formData.complaintDetails}
                                    onChange={e =>
                                        setFormData({
                                            ...formData,
                                            complaintDetails: e.target.value
                                        })
                                    }
                                    className="w-full text-xs font-medium border border-zinc-200 rounded-lg p-2.5 bg-zinc-50/50 focus:bg-white focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all resize-y"
                                />
                            </div>
                        </div>

                        <hr className="border-zinc-100" />

                        {/* 3. Drag & Drop Attachment Engine */}
                        <div>
                            <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wide mb-2">Evidence Documentation</label>
                            <div
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                className={`border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer flex flex-col items-center justify-center ${isDragging
                                    ? 'border-emerald-500 bg-emerald-50/50 text-emerald-700'
                                    : 'border-zinc-200 bg-zinc-50/30 hover:bg-zinc-50 hover:border-zinc-300 text-zinc-500'
                                    }`}
                            >
                                <UploadCloud size={28} className={isDragging ? 'text-emerald-600' : 'text-zinc-400'} />
                                <p className="text-xs font-bold text-zinc-700 mt-2">Drag & Drop files to verify context</p>
                                <p className="text-[10px] text-zinc-400 mt-0.5 font-medium">Supports single or multi-part logs (PDF, Images, Documents)</p>

                                <FileUploader onFilesChange={(files) => { setFiles(files); setFormData({ ...formData, complaintAttachments: files }) }} />

                            </div>

                            {/* Upload Tracking Queue */}
                            {files.length > 0 && (
                                <div className="mt-3 p-2 bg-white border border-zinc-100 rounded-lg space-y-1.5">
                                    {files.map((file, idx) => (
                                        <div key={idx} className="flex items-center justify-between text-xs bg-zinc-50 p-2 rounded border border-zinc-200/60 animate-fadeIn">
                                            <div className="flex items-center gap-2 truncate max-w-[85%]">
                                                <Paperclip size={12} className="text-zinc-400 shrink-0" />
                                                <span className="font-semibold text-zinc-700 truncate">{file.fileName}</span>
                                                <span className="text-[10px] text-zinc-400 font-medium">({(file.size / 1024).toFixed(1)} KB)</span>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeFile(idx)}
                                                className="text-zinc-400 hover:text-red-500 transition-colors p-1"
                                            >
                                                <Trash2 size={13} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Form Footer Action Core */}
                        <div className="flex items-center justify-end gap-3 pt-2 border-t border-zinc-100">
                            <button
                                type="button"
                                className="px-4 py-2 text-xs font-bold text-zinc-600 border border-zinc-200 rounded-lg bg-white hover:bg-zinc-50 transition-all shadow-sm"
                            >
                                Save Draft
                            </button>
                            <button
                                type="submit"
                                className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] rounded-lg transition-all shadow-sm shadow-emerald-700/20"
                            >
                                Submit Grievance
                            </button>
                        </div>

                    </form>
                </div>

                {/* RIGHT COLUMN: Information Panel & Policy Framework */}
                <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 px-1">Filing Guidelines</h3>

                    <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-sm space-y-5 text-xs font-medium text-zinc-600">

                        {/* Guidelines */}
                        <div className="space-y-1.5">
                            <h4 className="font-bold text-zinc-900 flex items-center gap-1.5">
                                <FileText size={14} className="text-emerald-600" /> Submission Rules
                            </h4>
                            <p className="text-zinc-400 leading-relaxed text-[11px]">
                                Ensure your descriptions are clear, factual, and free from inflammatory remarks. Use locations and departments accurately to minimize routing delays.
                            </p>
                        </div>

                        {/* Allowed Formats */}
                        <div className="space-y-1.5">
                            <h4 className="font-bold text-zinc-900 flex items-center gap-1.5">
                                <CheckCircle size={14} className="text-emerald-600" /> Allowed Formats
                            </h4>
                            <div className="flex flex-wrap gap-1.5 pt-1">
                                {['.pdf', '.png', '.jpg', '.jpeg', '.docx', '.xlsx', '.txt'].map((ext) => (
                                    <span key={ext} className="bg-zinc-100 text-zinc-500 font-bold px-2 py-0.5 rounded text-[10px] tracking-wide border border-zinc-200/50">
                                        {ext.toUpperCase()}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Expected Turnaround */}
                        <div className="space-y-1.5">
                            <h4 className="font-bold text-zinc-900 flex items-center gap-1.5">
                                <Clock size={14} className="text-emerald-600" /> Service-Level Agreements
                            </h4>
                            <p className="text-zinc-400 leading-relaxed text-[11px]">
                                Cases are categorized inside our system within 24 business hours. Standard processing maps out a solution trajectory within <strong>2 to 4 business days</strong>.
                            </p>
                        </div>

                        {/* Privacy Shield */}
                        <div className="p-3.5 bg-zinc-50 border border-zinc-100 rounded-lg space-y-1">
                            <h4 className="font-bold text-zinc-900 flex items-center gap-1.5">
                                <ShieldCheck size={14} className="text-emerald-600" /> Privacy & Encrypt Guarantee
                            </h4>
                            <p className="text-zinc-400 leading-normal text-[11px]">
                                Your case data is governed under strict cryptographic identity protection layers. Authorizations are logged dynamically to secure confidentiality compliance.
                            </p>
                        </div>

                    </div>
                </div>

            </div>

        </div>
    );
}