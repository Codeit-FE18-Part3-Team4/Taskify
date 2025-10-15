import axios from "axios";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjI4MSwidGVhbUlkIjoiMTgtNCIsImlhdCI6MTc2MDUxNTg5NSwiaXNzIjoic3AtdGFza2lmeSJ9.UOLJq-w0kCxngs01txsVcUd5Ypka5BWDi6MpsvOnbaE";

const axiosInstanceTest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

export default axiosInstanceTest;
