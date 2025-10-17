import { auth } from "@/features/auth/components/auth-provider";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  if (!auth.token) {
    delete config.headers.Authorization;
    return config;
  }

  if (config.headers) {
    config.headers.Authorization = `Bearer ${auth.token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      const publicPaths = ["/", "/login", "/signup"];
      const currentPath = window.location.pathname;
      if (!publicPaths.includes(currentPath)) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
