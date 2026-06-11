import React, { useEffect, useState } from "react";

const AuthorityDashboard = () => {
  const [grievances, setGrievances] = useState([]);
  const [filteredGrievances, setFilteredGrievances] = useState([]);
  const [response, setResponse] = useState("");
  const [selectedGrievance, setSelectedGrievance] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    fetchAssignedGrievances();
  }, []);

  useEffect(() => {
    filterGrievances();
  }, [categoryFilter, statusFilter, grievances]);

  const fetchAssignedGrievances = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/authority/assigned", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();
      setGrievances(data);
      setFilteredGrievances(data);
    } catch (error) {
      console.error("Error fetching grievances:", error);
    }
  };

  const filterGrievances = () => {
    let filtered = grievances;
    if (categoryFilter) {
      filtered = filtered.filter((g) => g.category === categoryFilter);
    }
    if (statusFilter) {
      filtered = filtered.filter((g) => g.status === statusFilter);
    }
    setFilteredGrievances(filtered);
  };

  const resolveGrievance = async () => {
    if (!response || !selectedGrievance) {
      alert("Please provide a resolution statement.");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/api/authority/${selectedGrievance._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ response }),
        }
      );

      if (res.ok) {
        await sendResolutionEmail();
        alert("Grievance state resolved and ledger communication dispatched.");
        setResponse("");
        setSelectedGrievance(null);
        fetchAssignedGrievances();
      } else {
        alert("Failed to update grievance state.");
      }
    } catch (error) {
      console.error("Error resolving grievance:", error);
    }
  };

  const sendResolutionEmail = async () => {
    try {
      await fetch("http://localhost:5000/api/authority/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          email: selectedGrievance.userId?.email,
          subject: "Resolvix Network - Ticket Resolution Notice",
          message: `Hello ${selectedGrievance.userId?.name},\n\nYour assigned grievance titled "${selectedGrievance.title}" has been successfully updated to a Resolved status by the department node authority.\n\nResolution Response Detail:\n${response}\n\nSystem Authorization Key Verification Complete.\n\nBest Regards,\nResolvix GMS Team`,
        }),
      });
    } catch (error) {
      console.error("Error transmitting automated notification email:", error);
    }
  };

  const printFeedback = () => {
    const win = window.open("", "_blank");
    win.document.write(`
      <html>
        <head>
          <title>Resolvix Case Receipt</title>
          <style>
            body { font-family: sans-serif; background: #fafafa; color: #111; padding: 40px; }
            .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border: 1px solid #eee; border-radius: 8px; }
            h2 { color: #581c87; border-bottom: 2px solid #f3e8ff; padding-bottom: 10px; }
            p { font-size: 14px; line-height: 1.6; color: #333; }
            .label { font-weight: bold; color: #666; }
            .box { background: #f9f9f9; padding: 15px; border-left: 4px solid #a855f7; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>Resolvix GMS — Resolution Audit Receipt</h2>
            <p><span class="label">Ticket Title:</span> ${selectedGrievance.title}</p>
            <p><span class="label">Category:</span> ${selectedGrievance.category}</p>
            <p><span class="label">Submitted By:</span> ${selectedGrievance.userId?.name || "Unknown client"}</p>
            <p><span class="label">Case Description:</span> ${selectedGrievance.description}</p>
            <div class="box">
              <span class="label">Official Resolution Feedback:</span><br/>
              ${selectedGrievance.response || response}
            </div>
          </div>
        </body>
      </html>
    `);
    win.document.close();
    win.print();
  };

  // Live Analytical Metrics
  const totalAssigned = grievances.length;
  const pendingCount = grievances.filter((g) => g.status !== "Resolved" && g.status !== "Closed").length;
  const completedCount = grievances.filter((g) => g.status === "Resolved" || g.status === "Closed").length;

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#050508] text-gray-200 antialiased font-sans">

      {/* LEFT COMPARTMENT - CONTROLS & SELECTION LIST */}
      <div className="w-80 flex-shrink-0 bg-[#0a0a12] border-r border-gray-900 flex flex-col overflow-hidden">

        {/* Core System Brand Header */}
        <div className="p-6 border-b border-gray-900/40">
          <div className="flex items-center space-x-2.5 mb-6">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center shadow-md shadow-purple-500/20">
              <span className="font-black text-white text-base">R</span>
            </div>
            <h2 className="text-lg font-bold tracking-wider text-white">
              Resolv<span className="text-purple-400">ix</span>
            </h2>
          </div>

          {/* Form Filter Dropdowns */}
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Filter Matrices</p>
          <div className="space-y-2">
            <div className="relative">
              <select
                className="w-full bg-[#050508] border border-gray-800 rounded-xl px-3 py-2 text-xs text-gray-300 appearance-none focus:outline-none focus:border-purple-500/50 transition-colors"
                onChange={(e) => setCategoryFilter(e.target.value)}
                value={categoryFilter}
              >
                <option value="">All Categories</option>
                {[...new Set(grievances.map((g) => g.category))].filter(Boolean).map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-500 text-[10px]">▼</div>
            </div>

            <div className="relative">
              <select
                className="w-full bg-[#050508] border border-gray-800 rounded-xl px-3 py-2 text-xs text-gray-300 appearance-none focus:outline-none focus:border-purple-500/50 transition-colors"
                onChange={(e) => setStatusFilter(e.target.value)}
                value={statusFilter}
              >
                <option value="">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
                <option value="Closed">Closed</option>
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-500 text-[10px]">▼</div>
            </div>
          </div>
        </div>

        {/* Dynamic Assignment Feed Scrollbox */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-2 mb-2">Assigned Queue ({filteredGrievances.length})</p>

          {filteredGrievances.length > 0 ? (
            filteredGrievances.map((g) => {
              const isSelected = selectedGrievance?._id === g._id;
              const isResolved = g.status === "Resolved" || g.status === "Closed";
              return (
                <div
                  key={g._id}
                  onClick={() => {
                    setSelectedGrievance(g);
                    setResponse(g.response || "");
                  }}
                  className={`group w-full text-left p-3.5 rounded-xl cursor-pointer border transition-all duration-150 ${isSelected
                    ? "bg-gradient-to-r from-purple-600/15 to-blue-600/5 border-purple-500/40 shadow-inner"
                    : "bg-[#0c0c16]/40 border-gray-900 hover:border-gray-800 hover:bg-[#0c0c16]/80"
                    }`}
                >
                  <div className="flex justify-between items-start space-x-2">
                    <h4 className={`text-xs font-semibold truncate transition-colors ${isSelected ? "text-purple-400" : "text-gray-200 group-hover:text-white"}`}>
                      {g.title}
                    </h4>
                    <span className={`w-1.5 h-1.5 rounded-full mt-1 flex-shrink-0 ${isResolved ? "bg-emerald-400" : "bg-amber-400"}`} />
                  </div>
                  <div className="flex items-center justify-between mt-2.5">
                    <span className="text-[9px] font-mono text-gray-500 uppercase bg-gray-950 px-1.5 py-0.5 rounded border border-gray-900">
                      {g.category || "General"}
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium">{g.status}</span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-8 text-gray-600 text-xs italic">
              No matching records verified.
            </div>
          )}
        </div>

        {/* Locked Footer Authorization Indicator */}
        <div className="p-4 border-t border-gray-900 bg-gray-950/20">
          <div className="flex items-center space-x-2.5 p-1.5">
            <div className="h-7 w-7 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-xs font-bold text-purple-400">
              Ω
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-gray-300 truncate">Department Authority Node</p>
              <p className="text-[9px] font-mono text-emerald-400 tracking-tight">Status: Secured & Online</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COMPARTMENT - MAIN CASE MANAGEMENT SCREEN VIEW */}
      <main className="flex-1 flex flex-col min-w-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-950/5 via-[#050508] to-[#050508] overflow-hidden">
        <div className="flex-1 overflow-y-auto p-8 space-y-8 max-w-[1200px] w-full mx-auto">

          {/* Header Dashboard Statistics Strip */}
          <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-gray-900/30">
            <div>
              <h1 className="text-2xl font-black text-white tracking-tight">Authority Console</h1>
              <p className="text-xs text-gray-400 mt-0.5">Process localized case operations and execute resolution actions.</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-[#0a0a12] border border-gray-900 rounded-xl px-4 py-2 text-center min-w-[80px]">
                <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Assigned</div>
                <div className="text-base font-bold font-mono text-white mt-0.5">{totalAssigned}</div>
              </div>
              <div className="bg-[#0a0a12] border border-gray-900 rounded-xl px-4 py-2 text-center min-w-[80px]">
                <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Active</div>
                <div className="text-base font-bold font-mono text-amber-400 mt-0.5">{pendingCount}</div>
              </div>
              <div className="bg-[#0a0a12] border border-gray-900 rounded-xl px-4 py-2 text-center min-w-[80px]">
                <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Resolved</div>
                <div className="text-base font-bold font-mono text-emerald-400 mt-0.5">{completedCount}</div>
              </div>
            </div>
          </section>

          {/* Active Worksite Card Pane View */}
          {selectedGrievance ? (
            <div className="bg-[#0a0a12] border border-gray-900 rounded-2xl p-6 shadow-xl space-y-6 animate-fade-in">

              {/* Ticket Meta Section */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 pb-4 border-b border-gray-900/60">
                <div className="space-y-1">
                  <span className="inline-flex items-center px-2 py-0.5 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded text-[10px] font-mono uppercase tracking-wider">
                    {selectedGrievance.category || "General Core Segment"}
                  </span>
                  <h3 className="text-xl font-bold text-white tracking-tight pt-1">
                    {selectedGrievance.title}
                  </h3>
                </div>

                <div className="text-xs text-left sm:text-right space-y-1">
                  <div className="text-gray-500 font-medium">Submitted By:</div>
                  <div className="text-gray-200 font-semibold">{selectedGrievance.userId?.name || "Anonymous User"}</div>
                  <div className="text-gray-400 font-mono text-[10px]">{selectedGrievance.userId?.email || "No channel connected"}</div>
                </div>
              </div>

              {/* Ticket Narrative Content */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Case Description Statement</h4>
                <div className="bg-gray-950/40 border border-gray-900/60 p-4 rounded-xl text-sm text-gray-300 leading-relaxed font-normal">
                  {selectedGrievance.description}
                </div>
              </div>

              {/* Status Tracking Alert Banner */}
              <div className="flex items-center space-x-3 p-3 bg-gray-950/20 border border-gray-900 rounded-xl">
                <span className="text-xs text-gray-400">Current Lifecycle Pipeline Node Status:</span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${selectedGrievance.status === "Resolved" || selectedGrievance.status === "Closed"
                  ? "bg-emerald-500/5 text-emerald-400 border-emerald-500/10"
                  : "bg-amber-500/5 text-amber-400 border-amber-500/10"
                  }`}>
                  {selectedGrievance.status}
                </span>
              </div>

              {/* Action Operations Controller Section */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Resolution Console Execution</h4>

                {selectedGrievance.status !== "Resolved" && selectedGrievance.status !== "Closed" ? (
                  <div className="space-y-4">
                    <textarea
                      placeholder="Input comprehensive factual resolution log, verification notes, and remedial actions undertaken to solve this ticket..."
                      className="w-full bg-[#050508] text-sm text-gray-200 border border-gray-900 rounded-xl p-4 min-h-[140px] focus:outline-none focus:border-purple-500/40 transition-colors placeholder:text-gray-600 leading-relaxed font-sans"
                      value={response}
                      onChange={(e) => setResponse(e.target.value)}
                    />
                    <div className="flex justify-end">
                      <button
                        onClick={resolveGrievance}
                        disabled={!response}
                        className={`font-semibold px-5 py-2.5 rounded-xl text-xs transition-all tracking-wide ${response
                          ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 text-white shadow-lg shadow-purple-600/10 active:scale-98 cursor-pointer"
                          : "bg-gray-900 text-gray-600 border border-gray-800 cursor-not-allowed"
                          }`}
                      >
                        Publish Resolution & Transmit Logs
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-4 space-y-4">
                    <div>
                      <div className="text-xs text-emerald-400 font-semibold tracking-wide">Case Closed - Resolution Records Logged:</div>
                      <p className="text-sm text-gray-400 mt-1.5 italic font-sans leading-relaxed">
                        "{selectedGrievance.response || "No text log saved."}"
                      </p>
                    </div>
                    <div className="flex justify-end pt-2 border-t border-gray-900/40">
                      <button
                        onClick={printFeedback}
                        className="flex items-center space-x-1.5 bg-gray-900 hover:bg-gray-800 text-gray-200 font-semibold px-4 py-2 border border-gray-800 rounded-xl text-xs transition-all"
                      >
                        <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                        </svg>
                        <span>Print Audit Token</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

            </div>
          ) : (
            <div className="h-96 flex flex-col items-center justify-center border border-dashed border-gray-900 rounded-2xl p-6 text-center text-gray-500">
              <svg className="w-8 h-8 text-gray-700 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              <p className="text-xs font-medium">No system case initialized for terminal verification.</p>
              <p className="text-[11px] text-gray-600 mt-0.5">Please select an assigned case from the sidebar roster queue.</p>
            </div>
          )}
        </div>
      </main>

    </div>
  );
};

export default AuthorityDashboard;