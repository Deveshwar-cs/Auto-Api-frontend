import axios from "axios";
import {navigateTo} from "../utils/navigation";

const api = axios.create({
  baseURL: "http://localhost:5001/api",
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
      navigateTo("/login");
    }
    alert(message);
    throw error;
  },
);

export default api;
