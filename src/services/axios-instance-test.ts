import axios from "axios";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjI4OSwidGVhbUlkIjoiMTgtNCIsImlhdCI6MTc2MDUxNTAwNCwiaXNzIjoic3AtdGFza2lmeSJ9.1sCur3__63EY4ZesIZJp1frrYKv4vnQ-vupjDgNFmeA";

const axiosInstanceTest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

export default axiosInstanceTest;
