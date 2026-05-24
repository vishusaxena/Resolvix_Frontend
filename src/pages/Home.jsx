import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { FaCheckCircle, FaHospital, FaUniversity, FaBuilding, FaShieldAlt, FaChartPie, FaSlidersH, FaArrowRight } from "react-icons/fa";
import Lottie from "lottie-react";
import grievanceAnimation from "../assets/grievance.json";

const Home = () => {
  const [activeTab, setActiveTab] = useState("education");

  const tenants = {
    education: {
      title: "Colleges & Schools",
      desc: "Empower students and faculty with anonymous reporting, anti-ragging compliance, and structured academic grievance workflows.",
      features: ["Academic & Fee disputes", "Hostel & Infrastructure queries", "Anonymous anti-bullying routing"],
      color: "from-violet-500 to-indigo-500"
    },
    corporate: {
      title: "Enterprise & Offices",
      desc: "Maintain POSH compliance, resolve workplace friction, and provide employees a secure, secure line directly to HR and leadership.",
      features: ["POSH & Ethics compliance", "Inter-departmental ticketing", "Whistleblower protection"],
      color: "from-indigo-500 to-blue-500"
    },
    healthcare: {
      title: "Hospitals & Care Centers",
      desc: "Prioritize patient care quality, manage medical staff escalations, and handle operational feedback under strict compliance protocols.",
      features: ["Patient care escalations", "Duty roster & staff conflicts", "Strict operational audit trails"],
      color: "from-purple-500 to-pink-500"
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#030303] text-zinc-100 font-sans antialiased selection:bg-violet-500/30 selection:text-violet-200">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative flex-grow flex items-center justify-center pt-28 pb-20 px-6 overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto flex flex-col lg:flex-row items-center gap-16 max-w-7xl relative z-10">
          <div className="w-full lg:w-7/12 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 backdrop-blur-md text-xs font-medium text-violet-400 tracking-wide">
              <span className="flex h-2 w-2 rounded-full bg-violet-500 animate-pulse" />
              Next-Gen Multi-Tenant GMS
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.15]">
              Resolution, Reimagined with{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-indigo-400 to-purple-400 drop-shadow-sm">
                Resolvix
              </span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              An enterprise-grade, highly configurable Multi-Tenant Grievance Management System. Engineered to adapt seamlessly for <span className="text-zinc-200 font-semibold">universities, healthcare networks, corporate offices</span>, and government bodies.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2">
              <button className="px-6 py-3 rounded-lg font-medium text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 transition-all duration-300 shadow-lg shadow-violet-900/20 flex items-center gap-2 group transform hover:-translate-y-0.5">
                Deploy Resolvix <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
              </button>
              <button className="px-6 py-3 rounded-lg font-medium text-zinc-300 border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/80 transition-all duration-200 backdrop-blur-sm">
                Request Demo
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 max-w-xl mx-auto lg:mx-0 border-t border-zinc-900">
              {[
                "Instant Routing",
                "ISO 27001 Ready",
                "E2E Encryption",
                "SLA Automation",
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2 justify-center lg:justify-start">
                  <FaCheckCircle className="text-violet-500 text-sm flex-shrink-0" />
                  <span className="text-xs text-zinc-400 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-5/12 flex justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/10 to-transparent rounded-full blur-3xl opacity-30" />
            <div className="w-full max-w-md bg-zinc-900/20 border border-zinc-800/60 p-6 rounded-2xl backdrop-blur-xl shadow-2xl">
              <Lottie animationData={grievanceAnimation} className="w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* --- MULTI-TENANT VERTICALS SECTION --- */}
      <section className="py-24 bg-[#070708] border-y border-zinc-900 relative">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              One Engine. Built for Any Architecture.
            </h2>
            <p className="text-zinc-400 text-base sm:text-lg">
              Resolvix isolates telemetry, styling, database scopes, and organizational workflows out-of-the-box for your distinct industry verticals.
            </p>
          </div>

          {/* Tab Toggles */}
          <div className="flex justify-center p-1 bg-zinc-900/60 backdrop-blur-sm border border-zinc-800/80 rounded-xl max-w-md mx-auto mb-12">
            <button
              onClick={() => setActiveTab("education")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all ${activeTab === "education"
                ? "bg-zinc-800 text-violet-400 shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
                }`}
            >
              <FaUniversity /> Academia
            </button>
            <button
              onClick={() => setActiveTab("corporate")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all ${activeTab === "corporate"
                ? "bg-zinc-800 text-indigo-400 shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
                }`}
            >
              <FaBuilding /> Corporate
            </button>
            <button
              onClick={() => setActiveTab("healthcare")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all ${activeTab === "healthcare"
                ? "bg-zinc-800 text-purple-400 shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
                }`}
            >
              <FaHospital /> Medical
            </button>
          </div>

          {/* Dynamic Content Display */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 bg-zinc-900/20 border border-zinc-800/40 rounded-2xl p-8 lg:p-12 backdrop-blur-md items-center">
            <div className="md:col-span-7 space-y-6">
              <h3 className="text-2xl font-bold text-zinc-100">
                Tailored Environment for <span className={`bg-clip-text text-transparent bg-gradient-to-r ${tenants[activeTab].color}`}>{tenants[activeTab].title}</span>
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                {tenants[activeTab].desc}
              </p>
              <div className="space-y-3 pt-2">
                {tenants[activeTab].features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-md bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                    </div>
                    <span className="text-sm text-zinc-300 font-medium">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:col-span-5 flex justify-center">
              <div className={`w-48 h-48 sm:w-64 sm:h-64 rounded-2xl bg-gradient-to-br ${tenants[activeTab].color} opacity-20 blur-xl absolute`} />
              <div className="w-full h-44 sm:h-56 rounded-xl border border-zinc-800 bg-zinc-950/80 shadow-inner flex flex-col items-center justify-center p-6 text-center relative z-10">
                <div className="text-xs uppercase tracking-widest text-zinc-500 mb-2">Active Tenant Instance</div>
                <div className="text-lg font-mono font-bold text-zinc-200">{activeTab}-instance.resolvix.io</div>
                <div className="mt-4 px-3 py-1 rounded-full text-xs font-mono bg-zinc-900 border border-zinc-800 text-emerald-400">Status: Operational</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CORE CAPABILITIES --- */}
      <section className="py-24 bg-[#030303]">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Enterprise Features out of the Box
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base">
              Say goodbye to legacy complaint boxes. Resolvix shifts your workflow into a modern, automated system.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-zinc-900/30 border border-zinc-800/80 p-8 rounded-xl backdrop-blur-sm hover:border-zinc-700/80 transition-all group">
              <div className="p-3 bg-violet-600/10 text-violet-400 w-fit rounded-lg mb-6 border border-violet-500/20 group-hover:bg-violet-600/20 transition-all">
                <FaSlidersH className="text-xl" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-zinc-100">Granular Configurator</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Design custom intake fields, categories, custom escalations, and custom SLAs matching your organizational hierarchy via our intuitive portal.
              </p>
            </div>

            <div className="bg-zinc-900/30 border border-zinc-800/80 p-8 rounded-xl backdrop-blur-sm hover:border-zinc-700/80 transition-all group">
              <div className="p-3 bg-indigo-600/10 text-indigo-400 w-fit rounded-lg mb-6 border border-indigo-500/20 group-hover:bg-indigo-600/20 transition-all">
                <FaShieldAlt className="text-xl" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-zinc-100">Anonymity & Security</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Provide encrypted whistleblowing options. Compliant with strict data standards, ensuring file attachments and records stay audit-safe.
              </p>
            </div>

            <div className="bg-zinc-900/30 border border-zinc-800/80 p-8 rounded-xl backdrop-blur-sm hover:border-zinc-700/80 transition-all group">
              <div className="p-3 bg-purple-600/10 text-purple-400 w-fit rounded-lg mb-6 border border-purple-500/20 group-hover:bg-purple-600/20 transition-all">
                <FaChartPie className="text-xl" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-zinc-100">Advanced Analytics</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Track resolution velocity, pinpoint high-friction departments, and generate structured analytical exports for compliance reviews.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="border-t border-zinc-900 bg-[#050506] text-center text-zinc-600 py-8 mt-auto text-xs tracking-wide">
        © {new Date().getFullYear()} <span className="text-zinc-400 font-medium">Resolvix Labs Inc.</span> All rights reserved.
      </footer>
    </div>
  );
};

export default Home;