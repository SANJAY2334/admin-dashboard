import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/auth"; 

export const registerUser = async (userData) => {
  try {
    const { data } = await axios.post(`${API_URL}/register`, userData);
    return data;
  } catch (error) {
    console.error("Registration error:", error.response?.data || error.message);
    throw error.response?.data || { message: "Registration failed" };
  }
};

export const loginUser = async (userData) => {
  try {
    const { data } = await axios.post("http://localhost:5000/api/auth/login", userData);
    localStorage.setItem("token", data.token);
    localStorage.setItem("username", data.user?.username || "");
    localStorage.setItem("email", data.user?.email || ""); // Store email properly
    return data;
  } catch (error) {
    throw error.response?.data?.message || "Login failed";
  }
};
