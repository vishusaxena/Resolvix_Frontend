import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaUsers } from "react-icons/fa";
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
    department: "",
    year: "",
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
        toast.success("Logged in successfully!");
        navigate("/dashboard");
      } else {
        await signup(
          formData.name,
          formData.email,
          formData.password,
          formData.role,
          formData.department,
          formData.year
        );
        toast.success("Account created successfully! Please log in.");
        setIsLogin(true);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-indigo-400">
      <Navbar />
      <ToastContainer />
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col md:flex-row items-center bg-white shadow-xl rounded-lg p-10 gap-8 max-w-4xl w-full">
          <div className="hidden md:flex w-1/2">
            <Lottie animationData={authAnimation} className="w-full h-auto" />
          </div>
          <div className="w-full md:w-1/2 flex flex-col items-center">
            <div className="flex mb-6 w-full">
              <button
                onClick={() => setIsLogin(true)}
                className={`w-1/2 text-lg font-semibold p-3 rounded-t-md ${
                  isLogin ? "bg-indigo-500 text-white" : "bg-gray-200"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`w-1/2 text-lg font-semibold p-3 rounded-t-md ${
                  !isLogin ? "bg-indigo-500 text-white" : "bg-gray-200"
                }`}
              >
                Signup
              </button>
            </div>

            <form className="w-full px-6" onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="mb-4 flex items-center border rounded-md p-2 bg-gray-100">
                  <FaUser className="text-gray-500 mr-2" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    className="w-full bg-transparent outline-none"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}
              <div className="mb-4 flex items-center border rounded-md p-2 bg-gray-100">
                <FaEnvelope className="text-gray-500 mr-2" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full bg-transparent outline-none"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4 flex items-center border rounded-md p-2 bg-gray-100">
                <FaLock className="text-gray-500 mr-2" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full bg-transparent outline-none"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              {!isLogin && (
                <>
                  <div className="mb-4 flex items-center border rounded-md p-2 bg-gray-100">
                    <FaUsers className="text-gray-500 mr-2" />
                    <select
                      name="role"
                      className="w-full bg-transparent outline-none"
                      value={formData.role}
                      onChange={handleChange}
                    >
                      <option value="user">User</option>
                      <option value="authority">Authority</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  {(formData.role === "user" ||
                    formData.role === "authority") && (
                    <div className="mb-4 flex items-center border rounded-md p-2 bg-gray-100">
                      <FaUsers className="text-gray-500 mr-2" />
                      <input
                        type="text"
                        name="department"
                        placeholder="Department"
                        className="w-full bg-transparent outline-none"
                        value={formData.department}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  )}
                  {formData.role === "user" && (
                    <div className="mb-4 flex items-center border rounded-md p-2 bg-gray-100">
                      <FaUsers className="text-gray-500 mr-2" />
                      <input
                        type="text"
                        name="year"
                        placeholder="Year"
                        className="w-full bg-transparent outline-none"
                        value={formData.year}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  )}
                </>
              )}
              <button
                type="submit"
                className="w-full bg-indigo-500 text-white p-3 rounded-md mt-2 hover:bg-indigo-600"
              >
                {isLogin ? "Login" : "Sign Up"}
              </button>
            </form>
            <p className="mt-4 text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <span
                onClick={() => setIsLogin(!isLogin)}
                className="text-indigo-500 font-semibold cursor-pointer ml-2"
              >
                {isLogin ? "Sign up" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
