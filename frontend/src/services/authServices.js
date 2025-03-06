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
    const { data } = await axios.post(`${API_URL}/login`, userData);
    
    // Store token & user details only after successful login
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user)); // Save full user object

    return data;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error.response?.data || { message: "Login failed" };
  }
};
