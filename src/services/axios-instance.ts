import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

export default AxiosInstance;
