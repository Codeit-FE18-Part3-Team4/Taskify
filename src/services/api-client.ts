import { AuthStorage } from "@/services/auth-storage";
import axios from "axios";
import Router from "next/router";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = AuthStorage.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const status = error?.response?.status;

    if (status === 401) {
      AuthStorage.clear();
      Router.push("/login");
    }

    //TODO: 다른 status 시 동작 추가

    return Promise.reject(error);
  }
);
