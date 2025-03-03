import axios from 'axios';

const API = axios.create({
  baseURL: '/api/auth', // Uses Vite proxy to avoid CORS issues
});

export const login = async (email, password) => {
  try {
    const response = await API.post('/login', { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Login failed";
  }
};
