import React, { useState } from "react";
import { Shield, Lock, Mail, ArrowRight } from "lucide-react";

export default function Auth() {
  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-[#FBFBF9] text-[#2C302E] font-sans antialiased selection:bg-[#9BC264]/30 overflow-x-hidden relative p-4">

      {/* Ambient background blurs */}
      <div className="absolute top-12 left-12 w-72 h-72 bg-[#9BC264]/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-12 right-12 w-80 h-80 bg-[#9AB17A]/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Auth Card */}
      <div className="w-full max-w-md bg-[#FAFBF7] border border-[#9AB17A]/20 rounded-2xl p-8 shadow-sm relative z-10 space-y-6">

        {/* Branding Header */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#9BC264]/15 border border-[#9BC264]/40 flex items-center justify-center text-[#6E8D43]">
            <Shield className="w-5 h-5 stroke-[2]" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-[#111311]">Welcome to resolvix</h1>
            <p className="text-sm text-[#424744] mt-1">Please sign in to access your secure dashboard.</p>
          </div>
        </div>

        {/* Form Controls */}
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">

          {/* Username/Email Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#111311]">
              Username or Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#424744]">
                <Mail className="w-4 h-4 text-[#6E8D43]" />
              </div>
              <input
                type="text"
                placeholder="username@organization.com"
                className="w-full bg-white border border-[#9AB17A]/30 rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium text-[#111311] placeholder:text-[#424744]/40 focus:outline-none focus:border-2 focus:border-[#6E8D43] transition-all"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold uppercase tracking-wider text-[#111311]">
                Password
              </label>
              <a href="#" className="text-xs font-semibold text-[#6E8D43] hover:underline focus:outline-none">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#424744]">
                <Lock className="w-4 h-4 text-[#6E8D43]" />
              </div>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-white border border-[#9AB17A]/30 rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium text-[#111311] placeholder:text-[#424744]/40 focus:outline-none focus:border-2 focus:border-[#6E8D43] transition-all"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-2 group bg-[#111311] hover:bg-[#2C302E] text-[#FBFBF9] py-3 px-4 rounded-xl text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2"
          >
            Sign In
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </form>

        {/* System Footnote */}
        <div className="pt-4 border-t border-[#9AB17A]/15 text-center">
          <p className="text-[11px] text-[#424744] font-medium">
            © {new Date().getFullYear()} Labs Inc. Secure Data Separation Active.
          </p>
        </div>

      </div>
    </div>
  );
}