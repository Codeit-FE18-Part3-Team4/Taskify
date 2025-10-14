import { axiosInstance } from "@/services/api-client";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginSuccess {
  user: {
    id: number;
    email: string;
    nickname: string;
    profileImageUrl: string | null;
    createdAt: string;
    updatedAt: string;
  };
  accessToken: string;
}

export const login = async (body: LoginRequest): Promise<LoginSuccess> => {
  const res = await axiosInstance.post<LoginSuccess>("/auth/login", body);
  return res.data;
};
