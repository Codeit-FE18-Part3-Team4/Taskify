import axios from "axios";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjI4MSwidGVhbUlkIjoiMTgtNCIsImlhdCI6MTc2MDQ0NjI4NywiaXNzIjoic3AtdGFza2lmeSJ9.TizVM9cD7oRmMRFmMa_7_TMDjvs4iQL2GwrB-rlrXcc";

const axiosInstanceTest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

export default axiosInstanceTest;
