import axiosInstanceTest from '@/services/axios-instance-test';

export async function getUserInfo() {
  try {
    const res = await axiosInstanceTest.get("/users/me");
    const body = res.data;
    return body;
  } catch (e) {
    console.error(e);
  }
}