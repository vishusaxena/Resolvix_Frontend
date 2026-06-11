import React, { useEffect, useState, useRef } from "react";

const AdminDashboard = () => {
  const [grievances, setGrievances] = useState([]);
  const [users, setUsers] = useState([]);
  const [authorities, setAuthorities] = useState([]);
  const [selectedOption, setSelectedOption] = useState("dashboard");
  const [authorityId, setAuthorityId] = useState("");
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const tableRef = useRef();

  useEffect(() => {
    fetchGrievances();
    fetchUsers();
    fetchAuthorities();
  }, []);

  const fetchGrievances = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/grievances", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await response.json();
      setGrievances(data);
    } catch (error) {
      console.error("Error fetching grievances:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/users", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchAuthorities = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/authorities", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (!response.ok) throw new Error("Failed to fetch authorities");
      const data = await response.json();
      setAuthorities(data);
    } catch (error) {
      console.error("Error fetching authorities:", error);
    }
  };

  const assignGrievance = async (grievanceId) => {
    if (!authorityId) return alert("Please select an authority.");
    try {
      const response = await fetch(`http://localhost:5000/api/admin/assign/${grievanceId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ authorityId }),
      });
      if (response.ok) { fetchGrievances(); }
    } catch (error) { console.error(error); }
  };

  const closeGrievance = async (grievanceId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/close/${grievanceId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (response.ok) fetchGrievances();
    } catch (error) { console.error(error); }
  };

  const handlePrint = () => {
    const printContents = tableRef.current.innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  const getUserById = (id) => users.find((u) => u._id === id);

  const openUserModal = (userId) => {
    const user = getUserById(userId);
    if (user) { setSelectedUser(user); setShowUserModal(true); }
  };

  // Computations
  const totalGrievances = grievances.length;
  const pendingGrievances = grievances.filter((g) => g.status !== "Resolved" && g.status !== "Closed").length;
  const resolvedGrievances = grievances.filter((g) => g.status === "Resolved" || g.status === "Closed").length;

  const getSidebarIcon = (option) => {
    const props = { className: "w-5 h-5 mr-3" };
    switch (option) {
      case "dashboard": return <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" /></svg>;
      case "grievances": return <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>;
      case "users": return <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
      case "authorities": return <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>;
      case "admins": return <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
      default: return null;
    }
  };

  return (
    /* Main App Layout Container - Prevents document stretching */
    <div className="flex h-screen w-screen overflow-hidden bg-[#050508] text-gray-200 antialiased font-sans">

      {/* Sidebar - Locked Full Height View */}
      <aside className="w-64 flex-shrink-0 bg-[#0a0a12] border-r border-gray-900 flex flex-col justify-between">
        <div className="p-6">
          <div className="flex items-center space-x-2.5 mb-8">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center shadow-md shadow-purple-500/20">
              <span className="font-black text-white text-base">R</span>
            </div>
            <h2 className="text-lg font-bold tracking-wider text-white">
              Resolv<span className="text-purple-400">ix</span>
            </h2>
          </div>

          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-2 mb-4">Management Panel</p>

          <nav className="space-y-1">
            {["dashboard", "grievances", "users", "authorities", "admins"].map((option) => (
              <button
                key={option}
                onClick={() => setSelectedOption(option)}
                className={`w-full flex items-center px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${selectedOption === option
                  ? "bg-purple-600/10 text-purple-400 border border-purple-500/20 shadow-sm"
                  : "text-gray-400 hover:bg-gray-900 hover:text-gray-200"
                  }`}
              >
                {getSidebarIcon(option)}
                <span className="capitalize">{option}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-gray-900 bg-gray-950/20">
          <div className="flex items-center space-x-3 p-2 rounded-xl">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center font-bold text-xs text-white">AD</div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-gray-200 truncate">System Admin</p>
              <p className="text-[10px] text-gray-500 truncate">Root Access</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Pane Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-950/5 via-[#050508] to-[#050508] overflow-hidden">

        {/* Secondary Inner View Wrapper with clean scrolling */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 max-w-[1600px] w-full mx-auto">

          {/* Top Status Overview Panel Component */}
          {selectedOption === "dashboard" && (
            <section className="space-y-4">
              <div>
                <h3 className="text-2xl font-extrabold text-white tracking-tight">System Status</h3>
                <p className="text-xs text-gray-400">Real-time analytical performance summary metrics.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="bg-[#0a0a12] border border-gray-900 p-5 rounded-xl flex flex-col justify-between hover:border-purple-500/20 transition-all">
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Total Grievances</span>
                  <span className="text-3xl font-black text-white mt-2 font-mono">{totalGrievances}</span>
                </div>
                <div className="bg-[#0a0a12] border border-gray-900 p-5 rounded-xl flex flex-col justify-between hover:border-amber-500/20 transition-all">
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Pending / Active</span>
                  <span className="text-3xl font-black text-amber-400 mt-2 font-mono">{pendingGrievances}</span>
                </div>
                <div className="bg-[#0a0a12] border border-gray-900 p-5 rounded-xl flex flex-col justify-between hover:border-emerald-500/20 transition-all">
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Resolved Tickets</span>
                  <span className="text-3xl font-black text-emerald-400 mt-2 font-mono">{resolvedGrievances}</span>
                </div>
              </div>
            </section>
          )}

          {/* Grievances Master Table System Component */}
          {(selectedOption === "grievances" || selectedOption === "dashboard") && (
            <section className="space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="text-2xl font-extrabold text-white tracking-tight">Grievance Backlog</h3>
                  <p className="text-xs text-gray-400">Review, prioritize, and assign incoming escalated system issues.</p>
                </div>
                <button
                  onClick={handlePrint}
                  className="flex items-center space-x-1.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 text-white font-semibold px-4 py-2 rounded-xl text-xs transition-all shadow-sm"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                  <span>Export Ledger</span>
                </button>
              </div>

              <div ref={tableRef} className="bg-[#0a0a12] border border-gray-900 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left border-collapse">
                    <thead className="bg-gray-950/50 text-[11px] text-gray-400 uppercase font-semibold tracking-wider border-b border-gray-900">
                      <tr>
                        <th className="py-3 px-5">Title & Category</th>
                        <th className="py-3 px-5">Description</th>
                        <th className="py-3 px-5">Status</th>
                        <th className="py-3 px-5">Submitted By</th>
                        <th className="py-3 px-5">Assigned Node</th>
                        <th className="py-3 px-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-900/60 text-gray-300">
                      {grievances.length ? (
                        grievances.map((grievance) => (
                          <tr key={grievance._id} className="hover:bg-gray-900/30 transition-colors">
                            <td className="py-3.5 px-5 max-w-[200px]">
                              <div className="font-semibold text-gray-200 truncate">{grievance.title}</div>
                              <span className="inline-block mt-1 text-[9px] bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded px-1.5 py-0.5 uppercase font-mono">
                                {grievance.category || "General"}
                              </span>
                            </td>
                            <td className="py-3.5 px-5 max-w-[240px] truncate text-gray-400">{grievance.description}</td>
                            <td className="py-3.5 px-5 whitespace-nowrap">
                              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border ${grievance.status === "Resolved" || grievance.status === "Closed"
                                ? "bg-emerald-500/5 text-emerald-400 border-emerald-500/10"
                                : "bg-amber-500/5 text-amber-400 border-amber-500/10"
                                }`}>
                                {grievance.status}
                              </span>
                            </td>
                            <td className="py-3.5 px-5 whitespace-nowrap">
                              <button
                                className="text-blue-400 hover:underline text-xs font-medium"
                                onClick={() => openUserModal(grievance.userId)}
                              >
                                {getUserById(grievance.userId)?.name || "Unknown"}
                              </button>
                            </td>
                            <td className="py-3.5 px-5 whitespace-nowrap text-xs text-gray-400">
                              {grievance.assignedTo ? (
                                <span className="bg-gray-900 px-2 py-0.5 border border-gray-800 rounded text-gray-300">
                                  {getUserById(grievance.assignedTo)?.name || "Unknown"}
                                </span>
                              ) : (
                                <span className="text-gray-600 italic">Unassigned</span>
                              )}
                            </td>
                            <td className="py-3.5 px-5 text-right whitespace-nowrap">
                              <div className="inline-flex items-center gap-2">
                                {!grievance.assignedTo && (
                                  <>
                                    <select
                                      onChange={(e) => setAuthorityId(e.target.value)}
                                      className="bg-gray-950 border border-gray-800 rounded-lg px-2 py-1 text-xs text-gray-300 focus:outline-none focus:border-purple-500"
                                    >
                                      <option value="">Select Target Node</option>
                                      {authorities.map((auth) => (
                                        <option key={auth._id} value={auth._id}>{auth.name}</option>
                                      ))}
                                    </select>
                                    <button
                                      onClick={() => assignGrievance(grievance._id)}
                                      className="bg-purple-600 hover:bg-purple-500 text-white text-xs px-2.5 py-1 rounded-lg transition-all font-medium"
                                    >
                                      Assign
                                    </button>
                                  </>
                                )}
                                {(grievance.status === "Resolved") && (
                                  <button
                                    onClick={() => closeGrievance(grievance._id)}
                                    className="bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 text-xs px-3 py-1 rounded-lg hover:bg-emerald-600 hover:text-white transition-all font-medium"
                                  >
                                    Close Case
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="text-center py-10 text-gray-500 text-xs">
                            No matching verified active tickets found in database.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}

          {/* Submenu Registries View Panels */}
          {["users", "authorities", "admins"].includes(selectedOption) && (
            <section className="space-y-4">
              <div>
                <h3 className="text-2xl font-extrabold text-white tracking-tight capitalize">{selectedOption} Directory</h3>
                <p className="text-xs text-gray-400">Index table of records verified on the network system.</p>
              </div>

              <div className="bg-[#0a0a12] border border-gray-900 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left border-collapse">
                    <thead className="bg-gray-950/50 text-[11px] text-gray-400 uppercase font-semibold tracking-wider border-b border-gray-900">
                      <tr>
                        <th className="py-3 px-5">Name</th>
                        <th className="py-3 px-5">Email Handle</th>
                        <th className="py-3 px-5">Clearance Role</th>
                        <th className="py-3 px-5">Department</th>
                        <th className="py-3 px-5 text-right">Registered Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-900/60 text-gray-300">
                      {(selectedOption === "authorities"
                        ? authorities
                        : users.filter((u) => u.role === (selectedOption === "users" ? "user" : "admin"))
                      ).map((user) => (
                        <tr key={user._id} className="hover:bg-gray-900/30 transition-colors">
                          <td className="py-3.5 px-5 font-medium text-white">{user.name}</td>
                          <td className="py-3.5 px-5 text-gray-400 font-mono text-xs">{user.email}</td>
                          <td className="py-3.5 px-5">
                            <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-mono rounded">
                              {user.role}
                            </span>
                          </td>
                          <td className="py-3.5 px-5 text-gray-400">{user.department || "—"}</td>
                          <td className="py-3.5 px-5 text-right text-gray-500 text-xs">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>

      {/* User Dossier Overlay Modal Component */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#0a0a12] border border-gray-900 rounded-xl max-w-sm w-full p-6 space-y-4 shadow-xl">
            <div className="border-b border-gray-900 pb-3">
              <h4 className="text-base font-bold text-white">Identity Details</h4>
              <p className="text-[11px] text-gray-500">Database node properties validation ledger.</p>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <span className="block text-gray-500 font-semibold mb-1">Name</span>
                <span className="text-gray-200 text-sm font-medium">{selectedUser.name}</span>
              </div>
              <div>
                <span className="block text-gray-500 font-semibold mb-1">Email Interface</span>
                <span className="text-gray-300 font-mono">{selectedUser.email}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="block text-gray-500 font-semibold mb-1">Role</span>
                  <span className="text-purple-400 font-mono uppercase">{selectedUser.role}</span>
                </div>
                <div>
                  <span className="block text-gray-500 font-semibold mb-1">Division</span>
                  <span className="text-gray-300">{selectedUser.department || "N/A"}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => { setShowUserModal(false); setSelectedUser(null); }}
              className="w-full bg-gray-900 hover:bg-gray-800 text-gray-200 font-semibold py-2 rounded-lg border border-gray-800 text-xs transition-all"
            >
              Close Ledger
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;