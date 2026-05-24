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
      alert("Please provide a response.");
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
        alert("Grievance resolved and email sent.");
        setResponse("");
        setSelectedGrievance(null);
        fetchAssignedGrievances();
      } else {
        alert("Failed to resolve grievance.");
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
          subject: "Your Grievance Has Been Resolved",
          message: `Hello ${selectedGrievance.userId?.name},\n\nYour grievance titled "${selectedGrievance.title}" has been resolved.\nResponse: ${response}\n\nThank you!`,
        }),
      });
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  const printFeedback = () => {
    const win = window.open("", "_blank");
    win.document.write(`
      <html><head><title>Grievance Receipt</title></head><body>
        <h2>Resolved Grievance Receipt</h2>
        <p><strong>Title:</strong> ${selectedGrievance.title}</p>
        <p><strong>Description:</strong> ${selectedGrievance.description}</p>
        <p><strong>Category:</strong> ${selectedGrievance.category}</p>
        <p><strong>Submitted By:</strong> ${selectedGrievance.userId?.name}</p>
        <p><strong>Response:</strong> ${selectedGrievance.response}</p>
      </body></html>
    `);
    win.document.close();
    win.print();
  };

  return (
    <div className="flex h-screen font-sans">
      <div className="w-1/4 bg-blue-800 text-white p-4 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Filters</h2>
        <select
          className="w-full p-2 mb-2 rounded bg-blue-700"
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          {[...new Set(grievances.map((g) => g.category))].map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <select
          className="w-full p-2 rounded bg-blue-700"
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Resolved">Resolved</option>
        </select>
        <h2 className="text-xl font-bold mt-4">Grievances</h2>
        <ul className="mt-2 space-y-2">
          {filteredGrievances.map((g) => (
            <li
              key={g._id}
              className={`cursor-pointer p-2 rounded ${
                selectedGrievance?._id === g._id
                  ? "bg-blue-600 font-semibold"
                  : "hover:bg-blue-700"
              }`}
              onClick={() => {
                setSelectedGrievance(g);
                setResponse(g.response || "");
              }}
            >
              {g.title}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-1 p-8 bg-gray-100 overflow-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Authority Dashboard
        </h2>

        {selectedGrievance ? (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-blue-800 mb-2">
              {selectedGrievance.title}
            </h3>
            <p>{selectedGrievance.description}</p>
            <p className="text-sm text-gray-600 mt-2">
              <strong>Category:</strong> {selectedGrievance.category}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Status:</strong> {selectedGrievance.status}
            </p>
            <p className="text-sm text-gray-600 mb-4">
              <strong>Submitted By:</strong> {selectedGrievance.userId?.name}
            </p>

            {selectedGrievance.status !== "Resolved" ? (
              <>
                <textarea
                  placeholder="Enter response"
                  className="border p-2 w-full rounded mb-3"
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                />
                <button
                  onClick={resolveGrievance}
                  className={`px-4 py-2 rounded text-white ${
                    response
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                  disabled={!response}
                >
                  Mark as Resolved
                </button>
              </>
            ) : (
              <>
                <p className="text-green-700 font-medium mt-2">
                  Grievance has been resolved.
                </p>
                <button
                  onClick={printFeedback}
                  className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Print Feedback
                </button>
              </>
            )}
          </div>
        ) : (
          <p className="text-gray-600">Select a grievance to view details.</p>
        )}
      </div>
    </div>
  );
};

export default AuthorityDashboard;
