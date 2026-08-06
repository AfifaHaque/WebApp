import axios from "axios";

const api = axios.create({
  baseURL: "https://student-study-planner-fastapi-1.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach the JWT token to protected requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;