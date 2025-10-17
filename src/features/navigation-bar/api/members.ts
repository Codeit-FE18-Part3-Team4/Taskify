import axiosInstance from "@/services/axios-instance";

export async function getMembers({ dashboardId }: { dashboardId: number }) {
  if (!dashboardId) return [];

  try {
    const res = await axiosInstance.get(`/members?dashboardId=${dashboardId}`);
    const body = res.data;
    return body;
  } catch (e) {
    console.error(e);
    throw e;
  }
}
