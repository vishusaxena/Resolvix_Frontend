import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaBuilding, FaGraduationCap, FaHospitalUser, FaShieldAlt } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Lottie from "lottie-react";
import authAnimation from "../assets/auth.json";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthContext";

const Auth = () => {
  const { login, signup } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    tenantType: "corporate", // corporate, education, healthcare
    organizationName: "",
    department: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLogin && !isValidEmail(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
        toast.success("Welcome back to Resolvix!");
        navigate("/dashboard");
      } else {
        await signup(
          formData.name,
          formData.email,
          formData.password,
          formData.role,
          formData.tenantType,
          formData.organizationName,
          formData.department
        );
        toast.success("Account created successfully! Please log in.");
        setIsLogin(true);
      }
    } catch (error) {
      toast.error(error.message || "Authentication failed.");
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] text-zinc-100 font-sans antialiased flex flex-col relative overflow-hidden">
      {/* Ambient Radial Glow Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none" />

      <Navbar />
      <ToastContainer theme="dark" />

      <div className="flex-grow flex items-center justify-center pt-24 pb-12 px-4 sm:px-6 relative z-10">
        <div className="flex w-full max-w-5xl bg-zinc-900/20 border border-zinc-800/60 rounded-2xl backdrop-blur-xl shadow-2xl overflow-hidden min-h-[600px]">

          {/* Left Panel: Graphic & Content Branding */}
          <div className="hidden lg:flex lg:w-1/2 bg-zinc-950/40 border-r border-zinc-900 p-12 flex-col justify-between items-center text-center">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 text-xs font-medium text-violet-400">
                Secure Portal Access
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 to-zinc-400">
                Enterprise Resolution Engine
              </h2>
              <p className="text-sm text-zinc-400 max-w-sm mx-auto">
                Log in to access your isolated workspace instance, manage ticket escalations, or handle real-time compliance metrics.
              </p>
            </div>

            <div className="w-full max-w-xs opacity-80 mix-blend-screen">
              <Lottie animationData={authAnimation} className="w-full h-auto" />
            </div>

            <div className="text-xs text-zinc-600 tracking-wide font-mono">
              RESOLVIX SHIELD V2.4 // DATA ENCRYPTED
            </div>
          </div>

          {/* Right Panel: Clean Form Layout */}
          <div className="w-full lg:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
            <div className="max-w-md w-full mx-auto space-y-8">

              {/* Sliding Form Controls Alternative */}
              <div className="flex p-1 bg-zinc-950 border border-zinc-800/80 rounded-xl">
                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${isLogin ? "bg-zinc-800 text-violet-400 shadow-sm" : "text-zinc-400 hover:text-zinc-200"
                    }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${!isLogin ? "bg-zinc-800 text-violet-400 shadow-sm" : "text-zinc-400 hover:text-zinc-200"
                    }`}
                >
                  Register
                </button>
              </div>

              {/* Form Element */}
              <form className="space-y-4" onSubmit={handleSubmit}>

                {/* Field: Full Name (Signup Only) */}
                {!isLogin && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-400">Full Name</label>
                    <div className="flex items-center border border-zinc-800 bg-zinc-950/60 rounded-lg px-3 py-2.5 focus-within:border-violet-500/50 focus-within:ring-1 focus-within:ring-violet-500/50 transition-all">
                      <FaUser className="text-zinc-500 mr-2.5 text-sm" />
                      <input
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        className="w-full bg-transparent outline-none text-sm text-zinc-200 placeholder-zinc-600"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Field: Email Address */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-zinc-400">Email Address</label>
                  <div className="flex items-center border border-zinc-800 bg-zinc-950/60 rounded-lg px-3 py-2.5 focus-within:border-violet-500/50 focus-within:ring-1 focus-within:ring-violet-500/50 transition-all">
                    <FaEnvelope className="text-zinc-500 mr-2.5 text-sm" />
                    <input
                      type="email"
                      name="email"
                      placeholder="name@organization.com"
                      className="w-full bg-transparent outline-none text-sm text-zinc-200 placeholder-zinc-600"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Field: Password */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-zinc-400">Password</label>
                  <div className="flex items-center border border-zinc-800 bg-zinc-950/60 rounded-lg px-3 py-2.5 focus-within:border-violet-500/50 focus-within:ring-1 focus-within:ring-violet-500/50 transition-all">
                    <FaLock className="text-zinc-500 mr-2.5 text-sm" />
                    <input
                      type="password"
                      name="password"
                      placeholder="••••••••"
                      className="w-full bg-transparent outline-none text-sm text-zinc-200 placeholder-zinc-600"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Dynamic Configuration Sections (Signup Only) */}
                {!isLogin && (
                  <div className="space-y-4 pt-2 border-t border-zinc-900">

                    {/* Vertical / Tenant Context Mapping */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-zinc-400">Vertical Type</label>
                        <div className="flex items-center border border-zinc-800 bg-zinc-950/60 rounded-lg px-3 py-2.5 focus-within:border-violet-500/50 transition-all">
                          <FaBuilding className="text-zinc-500 mr-2.5 text-sm" />
                          <select
                            name="tenantType"
                            className="w-full bg-transparent outline-none text-sm text-zinc-200 appearance-none [&>option]:bg-zinc-950 [&>option]:text-zinc-300"
                            value={formData.tenantType}
                            onChange={handleChange}
                          >
                            <option value="corporate">Corporate</option>
                            <option value="education">Education</option>
                            <option value="healthcare">Healthcare</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-zinc-400">Account Access</label>
                        <div className="flex items-center border border-zinc-800 bg-zinc-950/60 rounded-lg px-3 py-2.5 focus-within:border-violet-500/50 transition-all">
                          <FaShieldAlt className="text-zinc-500 mr-2.5 text-sm" />
                          <select
                            name="role"
                            className="w-full bg-transparent outline-none text-sm text-zinc-200 appearance-none [&>option]:bg-zinc-950 [&>option]:text-zinc-300"
                            value={formData.role}
                            onChange={handleChange}
                          >
                            <option value="user">Complainant (User)</option>
                            <option value="authority">Ombudsman / Authority</option>
                            <option value="admin">Global Admin</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Conditional Field: Organization Metadata mapping */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-zinc-400">Organization Name</label>
                      <div className="flex items-center border border-zinc-800 bg-zinc-950/60 rounded-lg px-3 py-2.5 focus-within:border-violet-500/50 transition-all">
                        <FaGraduationCap className="text-zinc-500 mr-2.5 text-sm" />
                        <input
                          type="text"
                          name="organizationName"
                          placeholder={formData.tenantType === "education" ? "Stanford University" : formData.tenantType === "healthcare" ? "Mayo Clinic" : "Acme Corp"}
                          className="w-full bg-transparent outline-none text-sm text-zinc-200 placeholder-zinc-600"
                          value={formData.organizationName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    {/* Conditional Field: Department Context Info */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-zinc-400">Department / Division Name</label>
                      <div className="flex items-center border border-zinc-800 bg-zinc-950/60 rounded-lg px-3 py-2.5 focus-within:border-violet-500/50 transition-all">
                        <FaHospitalUser className="text-zinc-500 mr-2.5 text-sm" />
                        <input
                          type="text"
                          name="department"
                          placeholder="e.g. Human Resources, Computer Science, Cardiology"
                          className="w-full bg-transparent outline-none text-sm text-zinc-200 placeholder-zinc-600"
                          value={formData.department}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                  </div>
                )}

                {/* Primary Form Action Button */}
                <button
                  type="submit"
                  className="w-full mt-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-medium text-sm py-3 rounded-lg transition-all duration-200 shadow-lg shadow-violet-900/15 transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  {isLogin ? "Authenticate Credentials" : "Initialize Instance Account"}
                </button>
              </form>

              {/* Toggle Interface Footer link */}
              <p className="text-center text-sm text-zinc-500">
                {isLogin ? "New to the platform?" : "Already registered?"}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-violet-400 hover:text-violet-300 font-semibold ml-1.5 focus:outline-none transition-colors"
                >
                  {isLogin ? "Create account" : "Sign in here"}
                </button>
              </p>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Auth;