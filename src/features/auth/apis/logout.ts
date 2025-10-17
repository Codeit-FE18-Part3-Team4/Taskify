import { auth } from "@/features/auth/components/auth-provider";
import axios from "axios";

export async function logout() {
  await axios.post("/api/auth/logout");
  auth.token = null;
  window.location.href = "/";
}
