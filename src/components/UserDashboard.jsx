import React, { useState, useEffect } from "react";
import {
  FaThLarge,
  FaFolderPlus,
  FaTasks,
  FaHistory,
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
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
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
    <div className="w-full flex h-screen bg-[#f8f9fa] text-slate-800 overflow-hidden font-sans">

      {/* Sidebar Navigation Panel - Matches Image Exactly */}
      <aside className="w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between shrink-0 h-full">
        <div className="p-4 space-y-6">
          <div className="flex items-center gap-2 px-3 pt-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00875a]"></span>
            <span className="font-bold text-base tracking-tight text-slate-900">Resolvix</span>
          </div>

          <nav className="space-y-1">
            {[
              { id: "dashboard", label: "Overview Dashboard", icon: <FaThLarge /> },
              { id: "submit", label: "File a Grievance", icon: <FaFolderPlus /> },
              { id: "status", label: "Track Status Matrices", icon: <FaTasks /> },
              { id: "history", label: "User Master Directory", icon: <FaHistory /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center px-4 py-3 text-xs font-medium rounded-lg transition-all ${activeTab === tab.id
                  ? "bg-slate-900 text-white font-semibold"
                  : "text-slate-600 bg-transparent hover:bg-slate-100 hover:text-slate-900"
                  }`}
              >
                <span className="text-sm mr-3.5 opacity-80">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* User Module Footer Info - Image Style */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00875a] to-teal-600 flex items-center justify-center font-bold text-xs text-white shadow-sm">
              SA
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Super Admin</p>
              <p className="text-[10px] font-medium text-slate-400">Management Engine</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Primary Display Content Grid View */}
      <main className="flex-1 w-full p-8 md:p-10 overflow-y-auto bg-[#f8f9fa]">

        {/* OVERVIEW MODULE */}
        {activeTab === "dashboard" && (
          <div className="space-y-8 max-w-full">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900">System Ecosystem</h2>
              <p className="text-xs text-slate-400 mt-0.5">Micro-analytics cross-referenced cleanly in real-time.</p>
            </div>

            {/* Metrics Dashboard Flat Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { title: "Registered Tenants", val: totalGrievances, text: "Active organizational structures" },
                { title: "Departments Master", val: pendingGrievances, text: "Global systemic sectors" },
                { title: "Roles Created", val: resolvedGrievances, text: "Defined validation limits" },
                { title: "Active Directories", val: closedGrievances, text: "Profiles provisioned" },
              ].map((card, i) => (
                <div key={i} className="bg-white border border-slate-200 p-5 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {card.title}
                  </h4>
                  <p className="text-2xl font-bold text-slate-900 mt-1.5 tracking-tight">{card.val}</p>
                  <p className="text-[10px] text-slate-400/80 mt-1">{card.text}</p>
                </div>
              ))}
            </div>

            {/* Action Ribbon Container */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full">
              <div>
                <h3 className="text-sm font-bold text-slate-800">Need immediate resolution assistance?</h3>
                <p className="text-xs text-slate-400 mt-0.5">Submit structured escalations straight into automated workflow layers.</p>
              </div>
              <button
                onClick={() => setActiveTab("submit")}
                className="flex items-center gap-1.5 bg-[#00875a] hover:bg-[#00704a] text-white font-medium text-xs px-4 py-2.5 rounded-lg transition-all shadow-sm whitespace-nowrap"
              >
                File New Case <FaChevronRight className="text-[9px]" />
              </button>
            </div>
          </div>
        )}

        {/* FORM MODULE */}
        {activeTab === "submit" && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900">File a Grievance</h2>
              <p className="text-xs text-slate-400 mt-0.5">Input system configurations to optimize pipeline matching speeds.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Grievance Subject Title</label>
                <input
                  type="text"
                  placeholder="Summarize the core concern briefly..."
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400/20 transition"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Primary Classification</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value, subcategory: "" })}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-slate-400 transition"
                    required
                  >
                    {Object.keys(CATEGORY_SUBCATEGORIES).map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Subcategory Scope Specifier</label>
                  <select
                    value={form.subcategory}
                    onChange={(e) => setForm({ ...form, subcategory: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-slate-400 transition"
                    required
                  >
                    <option value="">Select Specific Subject...</option>
                    {CATEGORY_SUBCATEGORIES[form.category]?.map((sub) => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Contextual Parameters</label>
                <textarea
                  rows="5"
                  placeholder="Provide precise contextual logging details, timestamps, metrics, or notes..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-400 transition resize-none"
                  required
                />
              </div>

              <div className="flex justify-end pt-2">
                <button type="submit" className="bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs px-5 py-2.5 rounded-lg transition-all shadow-sm">
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
                <h2 className="text-xl font-bold tracking-tight text-slate-900">
                  {activeTab === "status" ? "Track Pipeline Progress" : "Historical Archive Logs"}
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">Filter, extract, or evaluate running system data structures.</p>
              </div>

              {activeTab === "history" && (
                <button onClick={() => window.print()} className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-3.5 py-2 rounded-lg text-xs font-medium flex items-center gap-2 transition-all shadow-sm">
                  <FaFileInvoice className="text-xs text-slate-400" />
                  Export Statement
                </button>
              )}
            </div>

            {/* Filter Group Container */}
            <div className="bg-white border border-slate-200 p-4 rounded-xl flex flex-wrap gap-6 items-center shadow-[0_1px_2px_rgba(0,0,0,0.01)]">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Status:</span>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 focus:outline-none"
                >
                  <option value="All">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Category:</span>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 focus:outline-none"
                >
                  <option value="All">All Scope Categories</option>
                  {Object.keys(CATEGORY_SUBCATEGORIES).map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Premium Density Custom Table Implementation */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/70 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      <th className="px-6 py-3.5">Ref ID</th>
                      <th className="px-6 py-3.5">Subject Parameter</th>
                      <th className="px-6 py-3.5">Classification</th>
                      <th className="px-6 py-3.5">Scope Subcategory</th>
                      <th className="px-6 py-3.5">SLA State</th>
                      <th className="px-6 py-3.5 text-right">Operations</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs text-slate-600">
                    {filteredGrievances.map((grievance, index) => (
                      <tr key={grievance._id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 font-mono text-slate-400">#{index + 1}</td>
                        <td className="px-6 py-4 font-semibold text-slate-900">{grievance.title}</td>
                        <td className="px-6 py-4 text-slate-500">{grievance.category}</td>
                        <td className="px-6 py-4">
                          <span className="bg-slate-100 text-slate-600 border border-slate-200/60 px-2 py-0.5 rounded text-[11px]">
                            {grievance.subcategory}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-medium ${grievance.status === "Pending" ? "bg-amber-50 text-amber-700 border border-amber-200" :
                            grievance.status === "Resolved" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" :
                              "bg-slate-100 text-slate-500 border border-slate-200"
                            }`}>
                            {grievance.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => deleteGrievance(grievance._id)}
                            className={`text-[11px] font-medium transition-all ${grievance.status === "Closed"
                              ? "text-red-600 hover:text-red-700"
                              : "text-slate-300 cursor-not-allowed"
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
                        <td colSpan="6" className="text-center py-10 text-xs text-slate-400 tracking-wide">
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