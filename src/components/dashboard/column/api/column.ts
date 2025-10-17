import axiosInstance from "@/services/axios-instance";

interface PostColumnProps {
  dashboardId: number;
  columnTitle: string;
}

interface UpdateColumnProps {
  columnId: number;
  columnTitle: string;
}

export async function getColumn({ dashboardId }: { dashboardId: number }) {
  try {
    const res = await axiosInstance.get(`/columns?dashboardId=${dashboardId}`);
    return res.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function updateColumnTitle({
  columnId,
  columnTitle,
}: UpdateColumnProps) {
  try {
    const res = await axiosInstance.put(`/columns/${columnId}`, {
      title: columnTitle,
    });
    return res;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function PostColumn({
  columnTitle,
  dashboardId,
}: PostColumnProps) {
  try {
    const res = await axiosInstance.post(`/columns`, {
      title: columnTitle,
      dashboardId,
    });
    return res;
  } catch (e) {
    console.log(e);
    throw e;
  }
}
