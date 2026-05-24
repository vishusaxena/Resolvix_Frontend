import React, { useState, useEffect } from "react";

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
  const [activeTab, setActiveTab] = useState("submit");
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
      const response = await fetch(
        "http://localhost:5000/api/users/grievances",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
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
      filtered = filtered.filter(
        (grievance) => grievance.status === filters.status
      );
    }

    if (filters.category !== "All") {
      filtered = filtered.filter(
        (grievance) => grievance.category === filters.category
      );
    }

    setFilteredGrievances(filtered);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/api/users/grievance",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(form),
        }
      );

      if (response.ok) {
        alert("Grievance submitted successfully!");
        setForm({
          title: "",
          description: "",
          category: "Academic & Administrative",
          subcategory: "",
        });
        fetchGrievances();
      } else {
        alert("Failed to submit grievance.");
      }
    } catch (error) {
      console.error("Error submitting grievance:", error);
    }
  };

  const deleteGrievance = async (id) => {
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

  const handlePrint = () => {
    window.print();
  };

  const totalGrievances = grievances.length;
  const pendingGrievances = grievances.filter(
    (g) => g.status === "Pending"
  ).length;
  const closedGrievances = grievances.filter(
    (g) => g.status === "Closed"
  ).length;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-1/4 bg-blue-700 text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <ul className="space-y-4">
          <li
            className={`cursor-pointer p-2 rounded ${
              activeTab === "submit" ? "bg-blue-500" : "hover:bg-blue-600"
            }`}
            onClick={() => setActiveTab("submit")}
          >
            Submit Grievance
          </li>
          <li
            className={`cursor-pointer p-2 rounded ${
              activeTab === "all" ? "bg-blue-500" : "hover:bg-blue-600"
            }`}
            onClick={() => setActiveTab("all")}
          >
            All Grievances
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {activeTab === "submit" && (
          <form
            onSubmit={handleSubmit}
            className="space-y-4 bg-white shadow-md rounded-lg p-6"
          >
            <h3 className="text-xl font-semibold">Submit a Grievance</h3>
            <input
              type="text"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="border p-2 w-full"
              required
            />
            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="border p-2 w-full"
              required
            />
            <select
              value={form.category}
              onChange={(e) =>
                setForm({
                  ...form,
                  category: e.target.value,
                  subcategory: "", // reset subcategory
                })
              }
              className="border p-2 w-full"
              required
            >
              {Object.keys(CATEGORY_SUBCATEGORIES).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <select
              value={form.subcategory}
              onChange={(e) =>
                setForm({ ...form, subcategory: e.target.value })
              }
              className="border p-2 w-full"
              required
            >
              <option value="">Select Subcategory</option>
              {CATEGORY_SUBCATEGORIES[form.category]?.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </form>
        )}

        {activeTab === "all" && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">My Grievances</h3>

            {/* Summary Cards */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-100 p-4 rounded-lg text-center">
                <h4 className="text-lg font-bold">Total</h4>
                <p className="text-2xl">{totalGrievances}</p>
              </div>
              <div className="bg-yellow-100 p-4 rounded-lg text-center">
                <h4 className="text-lg font-bold">Pending</h4>
                <p className="text-2xl">{pendingGrievances}</p>
              </div>
              <div className="bg-green-100 p-4 rounded-lg text-center">
                <h4 className="text-lg font-bold">Closed</h4>
                <p className="text-2xl">{closedGrievances}</p>
              </div>
            </div>

            {/* Filters */}
            <div className="flex space-x-4 mb-4">
              <select
                value={filters.status}
                onChange={(e) =>
                  setFilters({ ...filters, status: e.target.value })
                }
                className="border p-2 rounded"
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Resolved">Resolved</option>
                <option value="Closed">Closed</option>
              </select>
              <select
                value={filters.category}
                onChange={(e) =>
                  setFilters({ ...filters, category: e.target.value })
                }
                className="border p-2 rounded"
              >
                <option value="All">All Categories</option>
                {Object.keys(CATEGORY_SUBCATEGORIES).map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <button
                onClick={handlePrint}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Print List
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full border">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 border">ID</th>
                    <th className="px-4 py-2 border">Title</th>
                    <th className="px-4 py-2 border">Category</th>
                    <th className="px-4 py-2 border">Subcategory</th>
                    <th className="px-4 py-2 border">Status</th>
                    <th className="px-4 py-2 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredGrievances.map((grievance, index) => (
                    <tr key={grievance._id} className="text-center">
                      <td className="border px-4 py-2">{index + 1}</td>
                      <td className="border px-4 py-2">{grievance.title}</td>
                      <td className="border px-4 py-2">{grievance.category}</td>
                      <td className="border px-4 py-2">
                        {grievance.subcategory}
                      </td>
                      <td className="border px-4 py-2">{grievance.status}</td>
                      <td className="border px-4 py-2">
                        <button
                          onClick={() => deleteGrievance(grievance._id)}
                          className={`px-2 py-1 rounded text-sm ${
                            grievance.status === "Closed"
                              ? "bg-gray-500 text-white"
                              : "bg-gray-300 text-gray-600 cursor-not-allowed"
                          }`}
                          disabled={grievance.status !== "Closed"}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredGrievances.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center p-4">
                        No grievances found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default UserDashboard;
