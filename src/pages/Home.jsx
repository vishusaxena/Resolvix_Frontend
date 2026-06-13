import React, { useState } from "react";
import {
  Shield,
  CheckCircle,
  School,
  Building2,
  Stethoscope,
  Sliders,
  Lock,
  BarChart3,
  ArrowRight,
  Menu,
  X,
  Sparkles,
  Clock,
  UserCheck,
  AlertCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function App() {
  const [activeTab, setActiveTab] = useState("education");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  const tenants = {
    education: {
      title: "Colleges & Schools",
      desc: "Give students and staff a safe place to share problems anonymously. Handle things like anti-bullying rules, course conflicts, and campus housing questions through clear steps.",
      features: ["Classroom & Fee updates", "Hostel & campus setup queries", "Secure anti-bullying routing"],
    },
    corporate: {
      title: "Offices & Businesses",
      desc: "Keep your workplace safe, fair, and professional. Give team members a fully protected, confidential link to human resources and leaders to flag unfair treatment or structural friction.",
      features: ["Workplace rules compliance", "Team-to-team ticketing", "Whistleblower identity protection"],
    },
    healthcare: {
      title: "Hospitals & Care Centers",
      desc: "Put patients first while taking care of your staff. Easily manage doctor or nurse work-shift disputes, patient care feedback, and critical regulatory audit logs.",
      features: ["Patient care escalations", "Duty shifts & staff conflict fixes", "Strict audit trail updates"],
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBF9] text-[#2C302E] font-sans antialiased selection:bg-[#9BC264]/30">

      {/* SECTION 1: GLOBAL LIGHT NAVBAR */}
      <header className="sticky top-0 z-50 bg-[#FBFBF9]/90 backdrop-blur-md border-b border-[#9AB17A]/20 px-6 lg:px-16 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#9BC264]/10 border border-[#9BC264]/40 flex items-center justify-center text-[#6E8D43]">
            <Shield className="w-5 h-5 stroke-[2]" />
          </div>
          <span className="text-xl font-semibold tracking-tight text-[#111311]">resolvix</span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-tight text-[#424744]">
          <a href="#hero" className="hover:text-[#111311] transition-colors">Overview</a>
          <a href="#hubs" className="hover:text-[#111311] transition-colors">Industry Hubs</a>
          <a href="#features" className="hover:text-[#111311] transition-colors">System Tools</a>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <button className="group text-sm font-semibold bg-[#111311] text-[#FBFBF9] px-4 py-2 rounded-lg hover:bg-[#2C302E] transition-all flex items-center gap-1.5 shadow-sm">
            Deploy Now
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#2C302E] hover:text-[#111311]"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile Dropdown Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FBFBF9] border-b border-[#9AB17A]/20 px-6 py-4 space-y-3">
          <a href="#hero" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-medium text-[#424744]">Overview</a>
          <a href="#hubs" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-medium text-[#424744]">Industry Hubs</a>
          <a href="#features" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-medium text-[#424744]">System Tools</a>
          <button className="w-full text-center text-sm font-semibold bg-[#111311] text-[#FBFBF9] py-2 rounded-lg">Deploy Now</button>
        </div>
      )}

      <main className="flex-grow">

        {/* SECTION 2: CLEAN HERO SECTION */}
        <section id="hero" className="relative pt-16 pb-24 px-6 lg:px-16 max-w-7xl mx-auto overflow-hidden">
          {/* Ambient organic background accents */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#9BC264]/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#9AB17A]/12 rounded-full blur-[120px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9BC264]/15 border border-[#9BC264]/30 text-xs font-semibold text-[#3F4F27] tracking-tight mx-auto lg:mx-0">
                <Sparkles className="w-3.5 h-3.5 text-[#6E8D43]" /> Easy Multi-Tenant Management
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#111311] leading-[1.12]">
                Fix complaints faster. <br />
                <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#111311] to-[#6E8D43]">
                  Built for your team style.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#424744] max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
                A simple, secure website system that handles complaints. Seamlessly setup separate workspaces for schools, medical centers, corporate environments, or teams without mixing data up.
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <button onClick={() => navigate("/auth")} className="px-6 py-3 rounded-xl bg-[#9BC264] hover:bg-[#8AB153] text-[#111311] font-bold text-sm transition-all shadow-md flex items-center gap-2 group">
                  Deploy Resolvix <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
                <button className="px-6 py-3 rounded-xl border border-[#2C302E]/20 hover:border-[#2C302E]/40 text-sm font-semibold transition-colors bg-white/60 text-[#2C302E]">
                  See Sandbox Demo
                </button>
              </div>

              {/* Minimal Checkmarks Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 max-w-xl mx-auto lg:mx-0 border-t border-[#9AB17A]/25">
                {["Auto Routing", "Highly Secure", "Data Privacy", "SLA Monitors"].map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 justify-center lg:justify-start">
                    <CheckCircle className="text-[#6E8D43] w-4 h-4 flex-shrink-0" />
                    <span className="text-xs text-[#2C302E] font-semibold">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side UI Application Mockup Canvas Container */}
            <div className="lg:col-span-6 flex justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#9BC264]/20 to-transparent blur-3xl -z-10 rounded-full" />

              {/* CSS UI Mockup replaces Lottie for faster loading and pristine contrast */}
              <div className="w-full max-w-lg bg-white border border-[#9AB17A]/25 rounded-2xl shadow-xl p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-[#9AB17A]/15 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <span className="text-xs font-mono text-[#6E8D43] bg-[#9BC264]/10 px-2.5 py-0.5 rounded-full font-semibold">
                    live_dashboard_v2
                  </span>
                </div>

                {/* Simulated UI Content Block 1 */}
                <div className="p-4 rounded-xl bg-[#FAFBF7] border border-[#9AB17A]/20 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-bold text-[#6E8D43] tracking-wider uppercase">Ticket #2084</span>
                      <h4 className="text-sm font-bold text-[#111311] mt-0.5">Facilities Infrastructure Collision</h4>
                    </div>
                    <span className="text-[11px] font-semibold bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                      In Review
                    </span>
                  </div>
                  <p className="text-xs text-[#424744] line-clamp-2">
                    Discrepancy registered regarding workspace assignments and shift allocation logic overhead.
                  </p>
                  <div className="flex items-center gap-4 pt-1 text-[11px] text-[#424744] font-medium">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-amber-600" /> 14m ago</span>
                    <span className="flex items-center gap-1"><UserCheck className="w-3.5 h-3.5 text-blue-600" /> Route: Admin</span>
                  </div>
                </div>

                {/* Simulated UI Content Block 2 */}
                <div className="p-3 rounded-xl border border-dashed border-[#9AB17A]/40 flex items-center justify-between text-xs text-[#424744]">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-[#6E8D43]" />
                    <span>Anonymity vault encryption active</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: MULTI-TENANT SWITCHER HUBS */}
        <section id="hubs" className="bg-[#FAFBF7] border-y border-[#9AB17A]/20 py-24 px-6 lg:px-16">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">

            <div className="lg:col-span-4 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111311]">
                One Core Portal. <br />Any Business Shape.
              </h2>
              <p className="text-sm text-[#424744] font-normal leading-relaxed">
                Resolvix keeps branding, settings, and database access completely separate out-of-the-box for your specific spaces.
              </p>

              {/* Tab Selector Links */}
              <div className="flex flex-col gap-2 pt-4">
                <button
                  onClick={() => setActiveTab("education")}
                  className={`text-left px-4 py-3.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-between ${activeTab === "education"
                    ? "bg-white border-2 border-[#6E8D43] text-[#111311] shadow-sm"
                    : "text-[#424744] hover:text-[#111311] bg-white/40 border border-[#9AB17A]/10"
                    }`}
                >
                  <span className="flex items-center gap-2.5"><School className="w-4 h-4 text-[#6E8D43]" /> Academia Scope</span>
                  {activeTab === "education" && <div className="w-2 h-2 rounded-full bg-[#6E8D43]" />}
                </button>

                <button
                  onClick={() => setActiveTab("corporate")}
                  className={`text-left px-4 py-3.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-between ${activeTab === "corporate"
                    ? "bg-white border-2 border-[#6E8D43] text-[#111311] shadow-sm"
                    : "text-[#424744] hover:text-[#111311] bg-white/40 border border-[#9AB17A]/10"
                    }`}
                >
                  <span className="flex items-center gap-2.5"><Building2 className="w-4 h-4 text-[#6E8D43]" /> Corporate Offices</span>
                  {activeTab === "corporate" && <div className="w-2 h-2 rounded-full bg-[#6E8D43]" />}
                </button>

                <button
                  onClick={() => setActiveTab("healthcare")}
                  className={`text-left px-4 py-3.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-between ${activeTab === "healthcare"
                    ? "bg-white border-2 border-[#6E8D43] text-[#111311] shadow-sm"
                    : "text-[#424744] hover:text-[#111311] bg-white/40 border border-[#9AB17A]/10"
                    }`}
                >
                  <span className="flex items-center gap-2.5"><Stethoscope className="w-4 h-4 text-[#6E8D43]" /> Medical Centers</span>
                  {activeTab === "healthcare" && <div className="w-2 h-2 rounded-full bg-[#6E8D43]" />}
                </button>
              </div>
            </div>

            {/* Displaying Changing Workspace Content */}
            <div className="lg:col-span-8 flex items-center">
              <div className="w-full bg-white border border-[#9AB17A]/25 rounded-2xl p-8 shadow-sm min-h-[250px] flex flex-col justify-between transition-all duration-300">
                <div className="space-y-4">
                  <span className="text-[11px] uppercase font-mono tracking-wider text-[#3F4F27] font-bold bg-[#9BC264]/20 px-2.5 py-0.5 rounded">
                    Operational Matrix
                  </span>
                  <h3 className="text-2xl font-bold text-[#111311]">
                    {tenants[activeTab].title} Hub
                  </h3>
                  <p className="text-sm text-[#424744] font-normal leading-relaxed">
                    {tenants[activeTab].desc}
                  </p>

                  <div className="space-y-2 pt-2">
                    {tenants[activeTab].features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-sm font-medium text-[#2C302E]">
                        <div className="w-2 h-2 rounded-full bg-[#6E8D43]" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-[#2C302E]/10 pt-4 mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <span className="text-[#2C302E] font-mono font-bold">{activeTab}-workspace.resolvix.io</span>
                  <span className="text-[#3F4F27] font-bold bg-[#9BC264]/15 px-2 py-0.5 rounded border border-[#9BC264]/20">Isolated Secure Instance</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 4: PLATFORM CAPABILITIES */}
        <section id="features" className="py-24 px-6 lg:px-16 max-w-7xl mx-auto space-y-16">
          <div className="max-w-xl space-y-3">
            <h2 className="text-3xl font-bold tracking-tight text-[#111311]">Clean platform tools.</h2>
            <p className="text-sm text-[#424744] font-normal">
              We replaced legacy paperwork boxes with clean digital pipelines built to safeguard users and manage structural data easily.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature Pack 1 */}
            <div className="space-y-4 p-6 rounded-2xl border border-[#9AB17A]/25 hover:border-[#6E8D43]/50 transition-colors bg-white shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#9BC264]/15 text-[#6E8D43] flex items-center justify-center">
                <Sliders className="w-5 h-5 stroke-[2]" />
              </div>
              <h3 className="text-base font-bold text-[#111311]">Easy Configurator</h3>
              <p className="text-xs text-[#424744] font-normal leading-relaxed">
                Design custom reporting pages, priority categories, and response timelines matching your internal staff roles without needing help from code developers.
              </p>
            </div>

            {/* Feature Pack 2 */}
            <div className="space-y-4 p-6 rounded-2xl border border-[#9AB17A]/25 hover:border-[#6E8D43]/50 transition-colors bg-white shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#9BC264]/15 text-[#6E8D43] flex items-center justify-center">
                <Lock className="w-5 h-5 stroke-[2]" />
              </div>
              <h3 className="text-base font-bold text-[#111311]">Anonymity Secured</h3>
              <p className="text-xs text-[#424744] font-normal leading-relaxed">
                Provide identity-masked paths for sensitive feedback. All records, timeline audits, and attached file uploads stay safely hidden from unauthorized eyes.
              </p>
            </div>

            {/* Feature Pack 3 */}
            <div className="space-y-4 p-6 rounded-2xl border border-[#9AB17A]/25 hover:border-[#6E8D43]/50 transition-colors bg-white shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#9BC264]/15 text-[#6E8D43] flex items-center justify-center">
                <BarChart3 className="w-5 h-5 stroke-[2]" />
              </div>
              <h3 className="text-base font-bold text-[#111311]">Clear Performance Metrics</h3>
              <p className="text-xs text-[#424744] font-normal leading-relaxed">
                Monitor case review speeds, pinpoint struggling institutional groups, and print out clean, summarized layout sheets for regular compliance reports.
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* SECTION 5: FOOTER SECTION */}
      <footer className="border-t border-[#9AB17A]/20 px-6 lg:px-16 py-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#424744] font-medium max-w-7xl mx-auto w-full bg-[#FAFBF7]/40">
        <div className="flex items-center gap-2 mb-4 sm:mb-0">
          <div className="w-5 h-5 rounded bg-[#9BC264]/10 border border-[#9BC264]/40 flex items-center justify-center text-[#6E8D43]">
            <Shield className="w-3 h-3 stroke-[2]" />
          </div>
          <span className="font-bold text-[#111311]">resolvix</span>
          <span>© {new Date().getFullYear()} Labs Inc. All rights reserved.</span>
        </div>
        <div className="flex gap-6">
          <a href="#privacy" className="hover:text-[#111311] transition-colors">Data Separation Rules</a>
          <a href="#sla" className="hover:text-[#111311] transition-colors">Uptime Guarantee</a>
        </div>
      </footer>

    </div>
  );
}