import React, { useState, useEffect } from "react";
import {
  FaThLarge,
  FaFolderPlus,
  FaTasks,
  FaHistory,
  FaTrashAlt,
  FaChevronRight,
  FaFileInvoice
} from "react-icons/fa";

const CATEGORY_SUBCATEGORIES = {
  "Academic & Administrative": [
    "Unfair Grading",
    "Faculty Misconduct",
    "Exam Issues",
    "Registration Problems",
    "Fee Issues",
  ],
  "Campus Facilities & Services": [
    "Hostel Maintenance",
    "Food Quality",
    "Library/Lab Issues",
    "Internet/Wi-Fi",
    "Transport",
    "Medical Services",
  ],
  "Behavioral & Ethical": [
    "Harassment",
    "Ragging",
    "Plagiarism",
    "Discrimination",
    "Code of Conduct Violation",
  ],
};

const UserDashboard = () => {
  const [grievances, setGrievances] = useState([]);
  const [filteredGrievances, setFilteredGrievances] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Academic & Administrative",
    subcategory: "",
  });
  const [filters, setFilters] = useState({
    status: "All",
    category: "All",
  });

  useEffect(() => {
    fetchGrievances();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, grievances]);

  const fetchGrievances = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users/grievances", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await response.json();
      setGrievances(data);
      setFilteredGrievances(data);
    } catch (error) {
      console.error("Error fetching grievances:", error);
    }
  };

  const applyFilters = () => {
    let filtered = grievances;
    if (filters.status !== "All") {
      filtered = filtered.filter((g) => g.status === filters.status);
    }
    if (filters.category !== "All") {
      filtered = filtered.filter((g) => g.category === filters.category);
    }
    setFilteredGrievances(filtered);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/users/grievance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setForm({
          title: "",
          description: "",
          category: "Academic & Administrative",
          subcategory: "",
        });
        fetchGrievances();
        setActiveTab("status");
      }
    } catch (error) {
      console.error("Error submitting grievance:", error);
    }
  };

  const deleteGrievance = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    try {
      await fetch(`http://localhost:5000/api/users/grievance/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchGrievances();
    } catch (error) {
      console.error("Error deleting grievance:", error);
    }
  };

  const totalGrievances = grievances.length;
  const pendingGrievances = grievances.filter((g) => g.status === "Pending").length;
  const resolvedGrievances = grievances.filter((g) => g.status === "Resolved").length;
  const closedGrievances = grievances.filter((g) => g.status === "Closed").length;

  return (
    <div className="w-full flex h-full bg-[#030303] overflow-hidden">

      {/* Sidebar Navigation Panel */}
      <aside className="w-64 bg-[#050507] border-r border-zinc-900 flex flex-col justify-between shrink-0 h-full">
        <div className="p-4 space-y-4">
          <div className="px-3 pt-2">
            <p className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-widest">Navigation Control</p>
          </div>

          <nav className="space-y-1">
            {[
              { id: "dashboard", label: "Dashboard Overview", icon: <FaThLarge /> },
              { id: "submit", label: "File a Grievance", icon: <FaFolderPlus /> },
              { id: "status", label: "Track Status", icon: <FaTasks /> },
              { id: "history", label: "History & Reports", icon: <FaHistory /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center px-4 py-3 text-xs font-medium rounded-xl transition-all border ${activeTab === tab.id
                  ? "bg-violet-600/10 border-violet-500/20 text-violet-400 font-semibold"
                  : "text-zinc-400 bg-transparent border-transparent hover:bg-zinc-900/40 hover:text-zinc-200"
                  }`}
              >
                <span className="text-sm mr-3 opacity-80">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* User Module Footer Info */}
        <div className="p-4 border-t border-zinc-900 bg-zinc-950/40">
          <div className="flex items-center gap-3 px-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center font-bold text-[11px] text-white">
              U
            </div>
            <div>
              <p className="text-xs font-semibold text-zinc-300">Active User</p>
              <p className="text-[9px] font-mono text-zinc-600 tracking-wider uppercase">Portal Client</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Primary Display Content Grid View */}
      <main className="flex-1 w-full p-8 md:p-10 overflow-y-auto bg-[#030303]">

        {/* OVERVIEW MODULE */}
        {activeTab === "dashboard" && (
          <div className="space-y-8 max-w-full">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-zinc-100">Resolution Insights</h2>
              <p className="text-sm text-zinc-400 mt-1">Real-time performance analytics metrics of active pipeline items.</p>
            </div>

            {/* Metrics Dashboard Grid Layout spanning full available width */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { title: "Total Tickets", val: totalGrievances, text: "text-zinc-400" },
                { title: "Pending Action", val: pendingGrievances, text: "text-amber-400" },
                { title: "Resolved Cases", val: resolvedGrievances, text: "text-emerald-400" },
                { title: "Closed Archives", val: closedGrievances, text: "text-zinc-500" },
              ].map((card, i) => (
                <div key={i} className="bg-[#09090b] border border-zinc-900 p-6 rounded-xl relative overflow-hidden">
                  <h4 className={`text-[10px] font-mono font-bold uppercase tracking-wider ${card.text}`}>
                    {card.title}
                  </h4>
                  <p className="text-3xl font-bold text-zinc-100 mt-2 tracking-tight">{card.val}</p>
                </div>
              ))}
            </div>

            {/* Action CTA Ribbon Container */}
            <div className="bg-gradient-to-r from-violet-950/20 to-indigo-950/10 border border-violet-500/10 rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full">
              <div>
                <h3 className="text-sm font-semibold text-zinc-200">Need immediate resolution assistance?</h3>
                <p className="text-xs text-zinc-400 mt-1">Submit structured escalations straight into automated workflow layers.</p>
              </div>
              <button
                onClick={() => setActiveTab("submit")}
                className="flex items-center gap-1.5 bg-violet-600 hover:bg-violet-500 text-white font-medium text-xs px-4 py-2.5 rounded-lg transition-all shadow-md shadow-violet-950/50 whitespace-nowrap"
              >
                File New Case <FaChevronRight className="text-[10px]" />
              </button>
            </div>
          </div>
        )}

        {/* FORM MODULE */}
        {activeTab === "submit" && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-zinc-100">File a Grievance</h2>
              <p className="text-sm text-zinc-400 mt-1">Input system configurations to optimize pipeline matching speeds.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 bg-[#09090b] border border-zinc-900 rounded-xl p-6 shadow-xl">
              <div className="space-y-2">
                <label className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">Grievance Subject Title</label>
                <input
                  type="text"
                  placeholder="Summarize the core concern briefly..."
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full bg-[#030303] border border-zinc-800 rounded-xl px-4 py-3 text-xs text-zinc-200 focus:outline-none focus:border-violet-500/40 placeholder-zinc-700 transition"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">Primary Classification</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value, subcategory: "" })}
                    className="w-full bg-[#030303] border border-zinc-800 rounded-xl px-4 py-3 text-xs text-zinc-200 focus:outline-none focus:border-violet-500/40 appearance-none [&>option]:bg-[#030303]"
                    required
                  >
                    {Object.keys(CATEGORY_SUBCATEGORIES).map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">Subcategory Scope Specifier</label>
                  <select
                    value={form.subcategory}
                    onChange={(e) => setForm({ ...form, subcategory: e.target.value })}
                    className="w-full bg-[#030303] border border-zinc-800 rounded-xl px-4 py-3 text-xs text-zinc-200 focus:outline-none focus:border-violet-500/40 appearance-none [&>option]:bg-[#030303]"
                    required
                  >
                    <option value="">Select Specific Subject...</option>
                    {CATEGORY_SUBCATEGORIES[form.category]?.map((sub) => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">Contextual Parameters & Description</label>
                <textarea
                  rows="6"
                  placeholder="Provide precise contextual logging details, timestamps, metrics, or notes..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full bg-[#030303] border border-zinc-800 rounded-xl px-4 py-3 text-xs text-zinc-200 focus:outline-none focus:border-violet-500/40 placeholder-zinc-700 transition resize-none"
                  required
                />
              </div>

              <div className="flex justify-end pt-2">
                <button type="submit" className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-medium text-xs px-6 py-3 rounded-xl transition-all shadow-md shadow-violet-950/40">
                  Deploy Resolution Routing
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STATUS & LOGS MODULE */}
        {(activeTab === "status" || activeTab === "history") && (
          <div className="space-y-6 max-w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-extrabold tracking-tight text-zinc-100">
                  {activeTab === "status" ? "Track Pipeline Progress" : "Historical Archive Logs"}
                </h2>
                <p className="text-sm text-zinc-400 mt-1">Filter, extract, or evaluate running system data structures.</p>
              </div>

              {activeTab === "history" && (
                <button onClick={() => window.print()} className="bg-zinc-900 border border-zinc-800 hover:bg-zinc-800/80 text-zinc-300 px-4 py-2 rounded-xl text-xs font-medium flex items-center gap-2 transition-all">
                  <FaFileInvoice className="text-xs text-zinc-400" />
                  Export Statement
                </button>
              )}
            </div>

            <div className="bg-[#09090b] border border-zinc-900 p-4 rounded-xl flex flex-wrap gap-6 items-center">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase text-zinc-500 tracking-wider">Status:</span>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  className="bg-[#030303] border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-300 focus:outline-none focus:border-violet-500/40"
                >
                  <option value="All">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase text-zinc-500 tracking-wider">Category:</span>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  className="bg-[#030303] border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-300 focus:outline-none focus:border-violet-500/40"
                >
                  <option value="All">All Scope Categories</option>
                  {Object.keys(CATEGORY_SUBCATEGORIES).map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="bg-[#09090b] border border-zinc-900 rounded-xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-900 bg-zinc-950/60 text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
                      <th className="px-6 py-4">Ref ID</th>
                      <th className="px-6 py-4">Subject Parameter</th>
                      <th className="px-6 py-4">Classification</th>
                      <th className="px-6 py-4">Scope Subcategory</th>
                      <th className="px-6 py-4">SLA State</th>
                      <th className="px-6 py-4 text-right">Operations</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-900 text-xs text-zinc-300">
                    {filteredGrievances.map((grievance, index) => (
                      <tr key={grievance._id} className="hover:bg-zinc-900/20 transition-colors">
                        <td className="px-6 py-4 font-mono text-zinc-600">#{index + 1}</td>
                        <td className="px-6 py-4 font-semibold text-zinc-200">{grievance.title}</td>
                        <td className="px-6 py-4 text-zinc-400">{grievance.category}</td>
                        <td className="px-6 py-4">
                          <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 px-2 py-0.5 rounded text-[11px]">
                            {grievance.subcategory}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold ${grievance.status === "Pending" ? "bg-amber-500/5 text-amber-400 border border-amber-500/10" :
                            grievance.status === "Resolved" ? "bg-emerald-500/5 text-emerald-400 border border-emerald-500/10" :
                              "bg-zinc-900 text-zinc-500 border border-zinc-800"
                            }`}>
                            <span className={`w-1 h-1 rounded-full ${grievance.status === "Pending" ? "bg-amber-400" :
                              grievance.status === "Resolved" ? "bg-emerald-400" : "bg-zinc-500"
                              }`}></span>
                            {grievance.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => deleteGrievance(grievance._id)}
                            className={`inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1.5 rounded-md font-medium transition-all ${grievance.status === "Closed"
                              ? "bg-red-950/20 text-red-400 border border-red-900/30 hover:bg-red-900/30"
                              : "text-zinc-700 cursor-not-allowed opacity-30"
                              }`}
                            disabled={grievance.status !== "Closed"}
                          >
                            Purge Record
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filteredGrievances.length === 0 && (
                      <tr>
                        <td colSpan="6" className="text-center py-12 text-xs font-mono text-zinc-600 uppercase tracking-widest">
                          No pipeline data entries match active parameters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default UserDashboard;