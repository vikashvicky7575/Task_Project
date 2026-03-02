import axios from "axios";

//Api URL Centralization
const API = axios.create({
  baseURL: import.meta.env.API_URL || "http://localhost:5000/api"
});

//JWT Token stored in localStorage
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;