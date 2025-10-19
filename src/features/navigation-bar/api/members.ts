import axiosInstance from "@/services/axios-instance";

export async function getMembers({
  size = 6,
  page = 1,
  dashboardId,
}: {
  size: number;
  page: number;
  dashboardId: number;
}) {
  if (!dashboardId) return [];

  try {
    const res = await axiosInstance.get(
      `/members??page=${page}&size=${size}&dashboardId=${dashboardId}`,
    );
    const body = res.data;
    return body;
  } catch (e) {
    console.error(e);
    throw e;
  }
}
