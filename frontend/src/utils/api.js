import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api", // Adjust the base URL as needed
  withCredentials: false, // This is important for sending cookies with requests
});

// Add token to every request if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
