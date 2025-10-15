import axiosInstanceTest from '@/services/axios-instance-test';

export async function getInvitations({ title = "", size = 10 } = {}) {
  try {
    const res = await axiosInstanceTest.get(
      `/invitations?size=${size}`,
    );
    const body = res.data;
    return body;
  } catch (e) {
    console.error(e);
  }
}