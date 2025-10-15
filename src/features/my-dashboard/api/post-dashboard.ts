import axiosInstanceTest from "@/services/axios-instance-test";

interface PostDashboardProps {
  title: string;
  color: string;
}

export async function postDashboard({ title, color }: PostDashboardProps) {
  try {
    const res = await axiosInstanceTest.post(`/dashboards`, {
      title,
      color,
    });
    const body = res.data;
    return body;
  } catch (e) {
    console.error(e);
  }
}
