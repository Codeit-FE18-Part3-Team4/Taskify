import { auth } from "@/features/auth/components/auth-provider";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  console.log("Request Interceptor Triggered , auth token:", auth.token);

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
    if (
      error.response?.status === 401 &&
      typeof window !== "undefined" &&
      !window.location.pathname.includes("/login")
    ) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
