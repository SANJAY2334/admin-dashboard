import axios from 'axios';

const API = axios.create({
<<<<<<< HEAD
  baseURL: import.meta.env.VITE_API_URL || '/api/auth', // Use environment variable if available
  withCredentials: true, // Ensure credentials are sent (for cookies-based auth)
  headers: { 'Content-Type': 'application/json' },
=======
  baseURL: '/api/auth', 
>>>>>>> a60d90c9f5f46c65fbd65d3ca34a8f47c0eac978
});

export const login = async (email, password) => {
  try {
    const response = await API.post('/login', { email, password });
    return response.data;
  } catch (error) {
    console.error("Login Error:", error.response?.data || error.message); // Log full error details
    throw new Error(error.response?.data?.message || "Login failed. Please try again.");
  }
};
