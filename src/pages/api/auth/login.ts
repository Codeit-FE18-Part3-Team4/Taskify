import axiosInstance from "@/services/axios-instance";
import axios from "axios";
import { serialize } from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";

interface LoginSuccess {
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  try {
    const response = await axiosInstance.post<LoginSuccess>(
      "/auth/login",
      req.body
    );
    const data: LoginSuccess = response.data;
    if (data.accessToken) {
      const cookie = serialize("accessToken", data.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60,
      });
      res.setHeader("Set-Cookie", cookie);
      return res.status(201).json({ user: data });
    }

    return res.status(401).json({ message: "Login failed" });
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      const { status, data } = error.response;
      return res.status(status).json({
        message: data?.message ?? "Unknown error",
      });
    }
    return res.status(500).json({ message: "Server error" });
  }
}
