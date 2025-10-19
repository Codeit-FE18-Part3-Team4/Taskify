import axiosInstance from "@/services/axios-instance";

interface UploadProfileImageResponse {
  profileImageUrl: string;
}

export async function uploadProfileImage(file: File) {
  const form = new FormData();
  form.append("image", file);
  const { data } = await axiosInstance.post<UploadProfileImageResponse>(
    "/users/me/image",
    form,
    { headers: { "Content-Type": "multipart/form-data" } }
  );

  return data.profileImageUrl;
}
