import axiosInstanceTest from "@/services/axios-instance-test";

export async function getColumn({ dashboardId }: { dashboardId: number }) {
  if (!dashboardId) return [];

  try {
    const res = await axiosInstanceTest.get(
      `/columns?dashboardId=${dashboardId}`,
    );
    return res.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
}
