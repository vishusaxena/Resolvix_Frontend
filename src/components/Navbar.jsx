import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaShieldAlt, FaSignOutAlt, FaUserShield } from "react-icons/fa";

const Navbar = () => {
  const { user, loading, logout } = useAuth();
  const location = useLocation();

  if (loading) {
    return null;
  }

  // Helper function to handle active route styles
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#030303]/60 backdrop-blur-md border-b border-zinc-900">
      <div className="container mx-auto max-w-7xl flex justify-between items-center p-4">

        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-2 bg-violet-600/10 text-violet-400 rounded-lg border border-violet-500/20 group-hover:bg-violet-600/20 transition-all">
            <FaShieldAlt className="text-xl" />
          </div>
          <span className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 to-zinc-400">
            Resolvix
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden sm:flex items-center gap-8">
          <Link
            to="/"
            className={`text-sm font-medium tracking-wide transition-colors ${isActive("/")
              ? "text-violet-400 font-semibold"
              : "text-zinc-400 hover:text-zinc-200"
              }`}
          >
            Home
          </Link>

          {user && (
            <>
              <Link
                to="/dashboard"
                className={`text-sm font-medium tracking-wide transition-colors ${isActive("/dashboard")
                  ? "text-violet-400 font-semibold"
                  : "text-zinc-400 hover:text-zinc-200"
                  }`}
              >
                Dashboard
              </Link>

              {/* Contextual Tenant/User Role Badge */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-xs font-mono font-medium text-indigo-400 uppercase tracking-wider">
                <FaUserShield className="text-xs" />
                {user.role}
              </div>
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          {user ? (
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-zinc-400 border border-zinc-800 bg-zinc-900/30 hover:bg-red-950/20 hover:text-red-400 hover:border-red-900/50 transition-all duration-200"
            >
              <FaSignOutAlt className="text-xs" />
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/auth"
                className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-zinc-100 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/auth"
                className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 transition-all duration-200 shadow-md shadow-violet-900/10"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;