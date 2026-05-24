import React, { useEffect, useState, useRef } from "react";

const AdminDashboard = () => {
  const [grievances, setGrievances] = useState([]);
  const [users, setUsers] = useState([]);
  const [authorities, setAuthorities] = useState([]);
  const [selectedOption, setSelectedOption] = useState("grievances");
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
      const response = await fetch(
        "http://localhost:5000/api/admin/authorities",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to fetch authorities");
      }

      const data = await response.json();
      console.log(data);
      setAuthorities(data);
    } catch (error) {
      console.error("Error fetching authorities:", error);
    }
  };

  const assignGrievance = async (grievanceId) => {
    if (!authorityId) {
      alert("Please select an authority.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/assign/${grievanceId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ authorityId }),
        }
      );

      if (response.ok) {
        alert("Grievance assigned successfully!");
        fetchGrievances();
      } else {
        const errorData = await response.json();
        alert(`Failed to assign grievance: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error assigning grievance:", error);
    }
  };

  const closeGrievance = async (grievanceId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/close/${grievanceId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Grievance closed successfully");
        // Refresh the list
        fetchGrievances();
      } else {
        alert(data.message || "Error closing grievance");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong.");
    }
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
    if (user) {
      setSelectedUser(user);
      setShowUserModal(true);
    }
  };

  const closeUserModal = () => {
    setShowUserModal(false);
    setSelectedUser(null);
  };

  return (
    <div className="flex h-screen font-sans">
      {/* Sidebar */}
      <div className="w-1/5 bg-blue-900 text-white p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-8 text-center">Admin Panel</h2>
        <ul className="space-y-4">
          {["grievances", "users", "authorities", "admins"].map((option) => (
            <li
              key={option}
              className={`p-3 rounded-md cursor-pointer text-center ${
                selectedOption === option ? "bg-blue-700" : "hover:bg-blue-800"
              }`}
              onClick={() => setSelectedOption(option)}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Panel */}
      <div className="w-4/5 p-8 bg-gray-100 overflow-y-auto">
        {selectedOption === "grievances" && (
          <>
            <div className="flex justify-between mb-6 items-center">
              <h3 className="text-3xl font-bold">Grievances</h3>
              <button
                onClick={handlePrint}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Print List
              </button>
            </div>

            <div ref={tableRef}>
              <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
                <thead className="bg-blue-900 text-white">
                  <tr>
                    <th className="py-3 px-6 text-left">Title</th>
                    <th className="py-3 px-6 text-left">Description</th>
                    <th className="py-3 px-6 text-left">Category</th>
                    <th className="py-3 px-6 text-left">Status</th>
                    <th className="py-3 px-6 text-left">Submitted By</th>
                    <th className="py-3 px-6 text-left">Assigned To</th>
                    <th className="py-3 px-6 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {grievances.length ? (
                    grievances.map((grievance) => (
                      <tr
                        key={grievance._id}
                        className="border-b hover:bg-gray-100"
                      >
                        <td className="py-3 px-6">{grievance.title}</td>
                        <td className="py-3 px-6">{grievance.description}</td>
                        <td className="py-3 px-6">{grievance.category}</td>
                        <td className="py-3 px-6">{grievance.status}</td>
                        <td className="py-3 px-6">
                          <button
                            className="text-blue-600 hover:underline"
                            onClick={() => openUserModal(grievance.userId)}
                          >
                            {getUserById(grievance.userId)?.name || "Unknown"}
                          </button>
                        </td>
                        <td className="py-3 px-6">
                          {grievance.assignedTo
                            ? getUserById(grievance.assignedTo)?.name ||
                              "Unknown"
                            : "Not Assigned"}
                        </td>
                        <td className="py-3 px-6 space-y-2">
                          {!grievance.assignedTo && (
                            <>
                              <select
                                onChange={(e) => setAuthorityId(e.target.value)}
                                className="border rounded p-1 mb-1"
                              >
                                <option value="">Select Authority</option>
                                {authorities.map((auth) => (
                                  <option key={auth._id} value={auth._id}>
                                    {auth.name}
                                  </option>
                                ))}
                              </select>
                              <button
                                onClick={() => assignGrievance(grievance._id)}
                                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                              >
                                Assign
                              </button>
                            </>
                          )}
                          {grievance.status === "Resolved" && (
                            <button
                              onClick={() => closeGrievance(grievance._id)}
                              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                            >
                              Close
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center py-6">
                        No grievances found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {["users", "authorities", "admins"].includes(selectedOption) && (
          <div>
            <h3 className="text-3xl font-bold mb-6 capitalize">
              {selectedOption}
            </h3>
            <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
              <thead className="bg-blue-900 text-white">
                <tr>
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Email</th>
                  <th className="py-3 px-6 text-left">Role</th>
                  <th className="py-3 px-6 text-left">Department</th>
                  <th className="py-3 px-6 text-left">Created At</th>
                </tr>
              </thead>
              <tbody>
                {(selectedOption === "authorities"
                  ? authorities
                  : users.filter(
                      (u) =>
                        u.role ===
                        (selectedOption === "users" ? "user" : "admin")
                    )
                ).map((user) => (
                  <tr key={user._id} className="border-b hover:bg-gray-100">
                    <td className="py-3 px-6">{user.name}</td>
                    <td className="py-3 px-6">{user.email}</td>
                    <td className="py-3 px-6">{user.role}</td>
                    <td className="py-3 px-6">{user.department || "N/A"}</td>
                    <td className="py-3 px-6">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-white/10">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-semibold mb-4">User Details</h2>
            <p className="mb-2">
              <strong>Name:</strong> {selectedUser.name}
            </p>
            <p className="mb-2">
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p className="mb-2">
              <strong>Role:</strong> {selectedUser.role}
            </p>
            <p className="mb-2">
              <strong>Department:</strong> {selectedUser.department || "N/A"}
            </p>
            <button
              onClick={closeUserModal}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
