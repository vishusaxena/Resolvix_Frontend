import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 

const Navbar = () => {
  const { user, loading, logout } = useAuth(); 

  if (loading) {
    return null; 
  }

  return (
    <div className="shadow-lg bg-white">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="text-2xl font-bold text-indigo-600">GMS</div>
        <div className="flex gap-6">
          <Link
            to="/"
            className="text-gray-700 hover:text-indigo-500 font-medium"
          >
            Home
          </Link>

          {user && (
            <>
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-indigo-500 font-medium"
              >
                Dashboard
              </Link>
              <span className="text-gray-700 font-medium capitalize">
                Role: {user.role}
              </span>
            </>
          )}
        </div>

        <div className="flex gap-4">
          {user ? (
            <button
              onClick={logout}
              className="border border-red-500 text-red-500 px-5 py-2 rounded-md hover:bg-red-100 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/auth"
                className="border border-indigo-500 text-indigo-500 px-5 py-2 rounded-md hover:bg-indigo-100 transition"
              >
                Login
              </Link>
              <Link
                to="/auth"
                className="bg-indigo-500 text-white px-5 py-2 rounded-md hover:bg-indigo-600 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
