import axiosInstance from "@/services/axios-instance";

interface SignupRequest {
  email: string;
  nickname: string;
  password: string;
}

interface SignupResponse {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export async function signup(body: SignupRequest): Promise<SignupResponse> {
  const response = await axiosInstance.post("/users", body);
  return response.data;
}
