import axiosInstance from "@/services/axios-instance";

interface ChangePasswordRequest {
  password: string;
  newPassword: string;
}

interface ChangePasswordResponse {
  message: string;
}

export async function changePassword(
  body: ChangePasswordRequest
): Promise<ChangePasswordResponse> {
  const response = await axiosInstance.put("/auth/password", body);
  return response.data;
}
