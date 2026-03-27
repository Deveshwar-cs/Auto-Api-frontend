import axios from "axios";

const api = axios.create({
  baseURL: "https://auto-api-backend.onrender.com/api",
  // baseURL: "http://localhost:5001/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || "Something went wrong";

    if (error.response?.status === 401) {
      localStorage.removeItem("token");

      // redirect to login
      window.location.href = "/login";
    }

    alert(message);
    throw error;
  },
);

export default api;
