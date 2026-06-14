import React, { useState } from "react";
import { Shield, Lock, Mail, ArrowRight, Building2, KeyRound } from "lucide-react";
import { useAuth } from "../context/AuthContext"; // Update path if needed

const InputField = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  icon: Icon,
  rightContent,
}) => (
  <div className="space-y-1.5">
    <div className="flex justify-between items-center">
      <label className="text-xs font-bold uppercase tracking-wider text-[#111311]">
        {label}
      </label>
      {rightContent}
    </div>

    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
        <Icon className="w-4 h-4 text-[#6E8D43]" />
      </div>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        className="w-full bg-white border border-[#9AB17A]/30 rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium text-[#111311] placeholder:text-[#424744]/40 focus:outline-none focus:border-2 focus:border-[#6E8D43] transition-all"
      />
    </div>
  </div>
);

export default function Auth() {
  const { login, tenantLogin } = useAuth(); // If your context has a separate method for admin, import it here

  // Tab State: 'user' or 'authority'
  const [activeTab, setActiveTab] = useState("user");
  const [loading, setLoading] = useState(false);

  // Form Fields State Split
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const [authorityInfo, setAuthorityInfo] = useState({
    tenantCode: "",
    tenantAccessCode: "",
  });

  // Handle Input Changes Dynamically Based on Active Tab
  const handleUserChange = (field) => (e) => {
    setLoginInfo((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleAuthorityChange = (field) => (e) => {
    setAuthorityInfo((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      if (activeTab === "user") {
        await login(
          loginInfo.email.trim(),
          loginInfo.password
        );
      } else {
        // Authority authentication route trigger
        await tenantLogin(authorityInfo.tenantCode, authorityInfo.tenantAccessCode);
        // Replace with your distinct admin login context call if required, e.g.:
        // await authorityLogin(authorityInfo.tenantCode.trim(), authorityInfo.tenantAccessCode);
      }
    } catch (error) {
      console.error(`${activeTab === "user" ? "User" : "Authority"} login failed:`, error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-[#FBFBF9] text-[#2C302E] font-sans antialiased selection:bg-[#9BC264]/30 overflow-x-hidden relative p-4">
      {/* Background Blur Effects */}
      <div className="absolute top-12 left-12 w-72 h-72 bg-[#9BC264]/10 rounded-full blur-[80px]" />
      <div className="absolute bottom-12 right-12 w-80 h-80 bg-[#9AB17A]/10 rounded-full blur-[100px]" />

      {/* Auth Card */}
      <div className="w-full max-w-md bg-[#FAFBF7] border border-[#9AB17A]/20 rounded-2xl p-8 shadow-sm relative z-10">

        {/* Header Branding */}
        <div className="flex flex-col items-center text-center space-y-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-[#9BC264]/15 border border-[#9BC264]/40 flex items-center justify-center">
            <Shield className="w-6 h-6 text-[#6E8D43]" />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#111311]">
              Welcome to Resolvix
            </h1>
            <p className="text-sm text-[#424744] mt-1">
              Identify your access portal domain parameters
            </p>
          </div>
        </div>

        {/* Dynamic Action Tabs Segment */}
        <div className="grid grid-cols-2 p-1 bg-[#111311]/5 rounded-xl mb-6">
          <button
            type="button"
            onClick={() => setActiveTab("user")}
            className={`py-2 text-xs font-bold rounded-lg transition-all ${activeTab === "user"
              ? "bg-white text-[#111311] shadow-sm"
              : "text-[#424744]/70 hover:text-[#111311]"
              }`}
          >
            Authority / Admin
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("authority")}
            className={`py-2 text-xs font-bold rounded-lg transition-all ${activeTab === "authority"
              ? "bg-white text-[#111311] shadow-sm"
              : "text-[#424744]/70 hover:text-[#111311]"
              }`}
          >
            User Dashboard
          </button>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {activeTab === "user" ? (
            /* USER COMPARTMENT FIELDS */
            <>
              <InputField
                label="Username or Email"
                type="email"
                placeholder="username@organization.com"
                value={loginInfo.email}
                onChange={handleUserChange("email")}
                icon={Mail}
              />

              <InputField
                label="Password"
                type="password"
                placeholder="••••••••"
                value={loginInfo.password}
                onChange={handleUserChange("password")}
                icon={Lock}
                rightContent={
                  <button
                    type="button"
                    className="text-xs font-semibold text-[#6E8D43] hover:underline"
                  >
                    Forgot Password?
                  </button>
                }
              />
            </>
          ) : (
            /* AUTHORITY COMPARTMENT FIELDS */
            <>
              <InputField
                label="Tenant Identification Code"
                type="text"
                placeholder="e.g., TN-RESOLVIX-99"
                value={authorityInfo.tenantCode}
                onChange={handleAuthorityChange("tenantCode")}
                icon={Building2}
              />

              <InputField
                label="Tenant Access Code"
                type="password"
                placeholder="••••••••"
                value={authorityInfo.tenantAccessCode}
                onChange={handleAuthorityChange("tenantAccessCode")}
                icon={KeyRound}
                rightContent={
                  <button
                    type="button"
                    className="text-xs font-semibold text-[#6E8D43] hover:underline"
                  >
                    Recovery Node?
                  </button>
                }
              />
            </>
          )}

          {/* Combined Form Action Submission Button */}
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
            className="w-full mt-2 group bg-[#111311] hover:bg-[#2C302E] disabled:opacity-70 disabled:cursor-not-allowed text-[#FBFBF9] py-3 px-4 rounded-xl text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              "Verifying Handshake..."
            ) : (
              <>
                {activeTab === "user" ? "Sign In as User" : "Authenticate Tenant"}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Card Footer */}
        <div className="pt-6 mt-6 border-t border-[#9AB17A]/15 text-center">
          <p className="text-[11px] text-[#424744] font-medium">
            © {new Date().getFullYear()} Labs Inc. Secure Data Separation Active.
          </p>
        </div>
      </div>
    </div>
  );
}