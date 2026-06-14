import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [tenants, setTenant] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Retrieved Token:", token);

      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      const response = await axiosInstance.get("/auth/profile");
      console.log("User Data:", response.data);

      setUser(response.data);
    } catch (error) {
      console.error(
        "Error fetching user",
        error.response?.data || error.message
      );
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      setUser(response.data.user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed", error.response?.data || error.message);
    }
  };

  const tenantLogin = async (code, key) => {
    try {
      const response = await axiosInstance.post("/auth/tenantlogin", {
        tenantCode: code,
        tenantKey: key,
      });
      console.log(response.data.data)
      localStorage.setItem("token", response.data.token);
      setTenant(response.data.data);
      navigate(`/dashboard/userview/${response.data.data.tenantCode}`);
    } catch (error) {
      console.error("Login failed", error.response?.data || error.message);
    }
  };


  const signup = async (name, email, password, role, department, year) => {
    try {
      const response = await axiosInstance.post("/auth/register", {
        name,
        email,
        password,
        role: role.toLowerCase(),
        department,
        year,
      });

      setUser(response.data.user);
    } catch (error) {
      console.error("Signup failed", error.response?.data || error.message);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setTenant(null)
    navigate("/");
  };
  const GetTenant = async (tenantCode) => {
    try {
      console.log("called...", tenantCode);
      const response = await axios.get(`http://localhost:5000/api/auth/tenant-info/${tenantCode}`);
      console.log(response);
      if (response.data.status === 'success') {
        setTenant(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching departments:', err);
    }
  };


  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, tenants, tenantLogin, GetTenant }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
