import axiosInstance from "@/services/axios-instance";

interface ChangePasswordRequest {
  nickname: string;
  profileImageUrl: string;
}

interface ChangePasswordResponse {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export async function changeUserdata(
  nickname: string,
  profileImage: string
): Promise<ChangePasswordResponse> {
  const response = await axiosInstance.put("/users/me", {
    nickname,
    profileImageUrl: profileImage,
  });
  return response.data;
}
