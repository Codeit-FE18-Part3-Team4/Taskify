import axiosInstance from "@/services/axios-instance";

export interface GetMeResponse {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export async function getMe(): Promise<GetMeResponse> {
  const reponse = await axiosInstance.get("/users/me");
  return reponse.data;
}
