import { createContext, useContext, useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axiosClient.get("/users/profile");
        setUser(data);
      } catch {
        setUser(null);
      }
    };
    fetchProfile();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:5000/api/users/login", { email, password }, { withCredentials: true });
  
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);  // Store token
        setUser(res.data.user);  // Store user info
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message || error.message);
    }
  };
  

  const logout = async () => {
    await axiosClient.post("/users/logout");
    setUser(null);
    navigate("/login");
  };

  const register = async (name, email, password) => {
    console.log("Registering with:", { name, email, password });

    try {
      const response = await axiosClient.post("/users/register", { name, email, password });
      console.log("Registration successful:", response.data);
      setUser(response.data);
      navigate("/dashboard");
    } catch (error) {
      console.error("Registration error:", error.response?.data || error.message);
    }
  };

  return <AuthContext.Provider value={{ user, login, logout, register }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
