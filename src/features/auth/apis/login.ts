import axios from "axios";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  user: {
    id: number;
    email: string;
    nickname: string;
    profileImageUrl: string | null;
    createdAt: string;
    updatedAt: string;
  };
}

export async function login(body: LoginRequest): Promise<LoginResponse> {
  const response = await axios.post<LoginResponse>("/api/auth/login", body);
  const data: LoginResponse = response.data;
  return data;
}
