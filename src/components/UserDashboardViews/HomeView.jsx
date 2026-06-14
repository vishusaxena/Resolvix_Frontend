import React from 'react';
import {
    Building2,
    Plus,
    Search,
    PhoneCall,
    HelpCircle,
    Clock,
    CheckCircle2,
    AlertCircle,
    Hourglass,
    Megaphone,
    HardDrive,
    GraduationCap,
    Laptop,
    Coins,
    Briefcase,
    Layers,
    ArrowUpRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function HomeView() {
    // Mock Tenant Data Configurations
    const { tenants } = useAuth()
    const tenant = {
        name: tenants?.tenantName,
        tagline: "Transparent administration, efficient operational resolution.",
        logoLetter: "N"
    };

    const stats = [
        { label: "Total Complaints Received", count: tenants?.totalComplaints, icon: Layers, color: "text-zinc-500 bg-zinc-100" },
        { label: "Resolved Complaints", count: "982", icon: CheckCircle2, color: "text-emerald-600 bg-emerald-50" },
        { label: "Pending Review", count: "194", icon: Hourglass, color: "text-amber-600 bg-amber-50" },
        { label: "Avg. Resolution Time", count: "2.4 Days", icon: Clock, color: "text-emerald-600 bg-emerald-50" }
    ];

    const categories = [
        { name: "Infrastructure", desc: "Facilities, maintenance & campus utility issues", icon: HardDrive },
        { name: "Academic", desc: "Course registration, grading, and curriculum feed", icon: GraduationCap },
        { name: "IT Support", desc: "Software access, accounts, hosting, and network hardware", icon: Laptop },
        { name: "Finance", desc: "Tuition processing, vendor billing, and scholarship distribution", icon: Coins },
        { name: "HR", desc: "Workplace disputes, onboarding, and staff inquiries", icon: Briefcase },
        { name: "General", desc: "Miscellaneous feedback and auxiliary operations", icon: Layers }
    ];

    return (
        <div className="flex-1 bg-zinc-50 text-zinc-800 min-h-screen px-8 py-10 overflow-y-auto relative selection:bg-emerald-500/20">

            {/* BACKGROUND GRAPHIC INTERACTION: Low opacity centered tenant watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none opacity-[0.03] z-0">
                <span className="text-[40vw] font-black tracking-tighter text-zinc-900">
                    {tenant.logoLetter}
                </span>
            </div>

            {/* Hero Interactive Branding Zone */}
            <header className="relative z-10 rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm mb-8">
                <div className="flex items-start justify-between">
                    <div>
                        <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-2.5 py-1 rounded-full">
                            Portal Workspace
                        </span>
                        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 mt-4">
                            Welcome to {tenant.name}
                        </h1>
                        <p className="text-zinc-500 text-sm max-w-xl mt-2 font-medium leading-relaxed">
                            {tenant.tagline}
                        </p>
                    </div>
                    <div className="w-16 h-16 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-2xl font-black text-white shadow-sm">
                        {tenant.logoLetter}
                    </div>
                </div>
            </header>

            {/* Analytics Statistics Panel Row */}
            <section className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((item, index) => (
                    <div key={index} className="p-5 rounded-xl border border-zinc-200 bg-white shadow-sm flex items-center justify-between group hover:border-zinc-300 transition-all">
                        <div className="space-y-1">
                            <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">{item.label}</p>
                            <p className="text-2xl font-bold tracking-tight text-zinc-900">{item.count}</p>
                        </div>
                        <div className={`p-3 rounded-lg shrink-0 ${item.color}`}>
                            <item.icon size={20} />
                        </div>
                    </div>
                ))}
            </section>

            {/* Split Block Section: Quick Actions + Announcements */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

                {/* Quick Actions Container Grid */}
                <div className="lg:col-span-2 space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 px-1">Quick Actions</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        <button className="p-4 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50/50 text-left flex items-center gap-4 group transition-all shadow-sm">
                            <div className="p-3 rounded-lg bg-emerald-600 text-white group-hover:scale-105 transition-transform shadow-sm">
                                <Plus size={18} />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-zinc-800 group-hover:text-emerald-600 transition-colors">Submit Grievance</h4>
                                <p className="text-xs text-zinc-400 mt-0.5">Report a new incident anonymously</p>
                            </div>
                        </button>

                        <button className="p-4 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50/50 text-left flex items-center gap-4 group transition-all shadow-sm">
                            <div className="p-3 rounded-lg bg-zinc-100 border border-zinc-200 text-zinc-600 group-hover:scale-105 transition-transform">
                                <Search size={18} />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-zinc-800 group-hover:text-emerald-600 transition-colors">Track Complaint</h4>
                                <p className="text-xs text-zinc-400 mt-0.5">Check ongoing tracking ID histories</p>
                            </div>
                        </button>

                        <button className="p-4 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50/50 text-left flex items-center gap-4 group transition-all shadow-sm">
                            <div className="p-3 rounded-lg bg-zinc-100 border border-zinc-200 text-zinc-600 group-hover:scale-105 transition-transform">
                                <PhoneCall size={18} />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-zinc-800 group-hover:text-emerald-600 transition-colors">Contact Support</h4>
                                <p className="text-xs text-zinc-400 mt-0.5">Direct helpline and support vectors</p>
                            </div>
                        </button>

                        <button className="p-4 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50/50 text-left flex items-center gap-4 group transition-all shadow-sm">
                            <div className="p-3 rounded-lg bg-zinc-100 border border-zinc-200 text-zinc-600 group-hover:scale-105 transition-transform">
                                <HelpCircle size={18} />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-zinc-800 group-hover:text-emerald-600 transition-colors">Help Center</h4>
                                <p className="text-xs text-zinc-400 mt-0.5">Browse processing rules and FAQs</p>
                            </div>
                        </button>

                    </div>
                </div>

                {/* Recent Announcements Panel Feed */}
                <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 px-1">Recent Announcements</h3>
                    <div className="p-5 rounded-xl border border-zinc-200 bg-white space-y-4 shadow-sm max-h-[224px] overflow-y-auto scrollbar-thin">

                        <div className="flex gap-3 items-start text-xs border-b border-zinc-100 pb-3 last:border-0 last:pb-0">
                            <div className="p-1.5 rounded bg-amber-50 text-amber-600 mt-0.5 shrink-0">
                                <Megaphone size={12} />
                            </div>
                            <div>
                                <span className="text-[10px] font-bold text-zinc-400 block uppercase tracking-wide">Maintenance Alert</span>
                                <p className="font-semibold text-zinc-700 mt-0.5">Database scaling scheduled for Sunday 02:00 UTC.</p>
                            </div>
                        </div>

                        <div className="flex gap-3 items-start text-xs">
                            <div className="p-1.5 rounded bg-blue-50 text-blue-600 mt-0.5 shrink-0">
                                <AlertCircle size={12} />
                            </div>
                            <div>
                                <span className="text-[10px] font-bold text-zinc-400 block uppercase tracking-wide">Policy Circular</span>
                                <p className="font-semibold text-zinc-700 mt-0.5">Updated academic resource grading timelines published.</p>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

            {/* Section Content: Grievance Categories Routing Directory Grid */}
            <section className="relative z-10 space-y-4">
                <header className="flex items-center justify-between px-1">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Complaint Classifications</h3>
                    <span className="text-[11px] text-zinc-400 font-medium">Select a category folder to begin layout</span>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categories.map((cat, index) => {
                        const Icon = cat.icon;
                        return (
                            <div
                                key={index}
                                className="p-5 rounded-xl border border-zinc-200 bg-white hover:border-zinc-300 transition-all duration-200 flex flex-col justify-between group cursor-pointer shadow-sm relative overflow-hidden"
                            >
                                <div>
                                    <div className="w-9 h-9 rounded-lg bg-zinc-50 border border-zinc-200 flex items-center justify-center text-zinc-500 group-hover:text-emerald-600 group-hover:border-emerald-200 group-hover:bg-emerald-50 transition-colors">
                                        <Icon size={18} />
                                    </div>
                                    <h4 className="text-sm font-bold text-zinc-800 mt-4 tracking-wide group-hover:text-zinc-900">
                                        {cat.name}
                                    </h4>
                                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed max-w-[210px]">
                                        {cat.desc}
                                    </p>
                                </div>

                                <div className="flex items-center gap-1 text-[11px] font-bold text-zinc-400 mt-6 group-hover:text-emerald-600 transition-colors self-start">
                                    Open Category
                                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-0.5" />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

        </div>
    );
}