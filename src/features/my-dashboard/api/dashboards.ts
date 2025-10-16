import axiosInstance from "@/services/axios-instance";

export async function getDashboards({ page = 1, size = 10 } = {}) {
  try {
    const res = await axiosInstance.get(
      `/dashboards?navigationMethod=pagination&page=${page}&size=${size}`
    );
    const body = res.data;
    return body;
  } catch (e) {
    console.error(e);
  }
}
