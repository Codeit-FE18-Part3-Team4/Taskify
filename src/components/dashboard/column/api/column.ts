import axiosInstance from "@/services/axios-instance";

export async function getColumn({ dashboardId }: { dashboardId: number }) {
  if (!dashboardId) return [];

  try {
    const res = await axiosInstance.get(`/columns?dashboardId=${dashboardId}`);
    return res.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
}
