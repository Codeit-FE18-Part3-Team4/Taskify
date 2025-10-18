import axiosInstance from "@/services/axios-instance";
import { withThrowingAxiosError } from "@/services/with-throwing-axios-error";

export async function createColumn({
  dashboardId,
  title,
}: {
  dashboardId: number;
  title: string;
}) {
  return withThrowingAxiosError(async () => {
    const response = await axiosInstance.post(`/columns`, {
      title,
      dashboardId,
    });
    return response.data;
  });
}

export async function updateColumn({
  columnId,
  title,
}: {
  columnId: number;
  title: string;
}) {
  return withThrowingAxiosError(async () => {
    const response = await axiosInstance.put(`/columns/${columnId}`, { title });
    return response.data;
  });
}

export async function uploadCardImage({
  columnId,
  imageFile,
}: {
  columnId: number;
  imageFile: File;
}): Promise<string> {
  return withThrowingAxiosError<string>(async () => {
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await axiosInstance.post<{ imageUrl: string }>(
      `/columns/${columnId}/card-image`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    if (response.status !== 201) {
      return "";
    }

    return response.data.imageUrl;
  });
}
