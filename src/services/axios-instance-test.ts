import axios from "axios";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjI4MSwidGVhbUlkIjoiMTgtNCIsImlhdCI6MTc2MDQ1MTc5MywiaXNzIjoic3AtdGFza2lmeSJ9.4f_06SuC8-dvHECOeTyrz842fyZ3plJ4IAg6cdSgEdo";

const axiosInstanceTest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

export default axiosInstanceTest;
