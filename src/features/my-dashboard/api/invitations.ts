import axiosInstance from "@/services/axios-instance";

export async function getInvitations({ title = "", size = 10 } = {}) {
  try {
    const res = await axiosInstance.get(
      `/invitations?size=${size}&title=${title}`
    );
    const body = res.data;
    return body;
  } catch (e) {
    console.error(e);
  }
}
