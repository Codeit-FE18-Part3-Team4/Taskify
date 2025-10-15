import axiosInstanceTest from "@/services/axios-instance-test";

export async function getDashboards({ page = 1, size = 10} = {}) {
  try {
    const res = await axiosInstanceTest.get(
      `/dashboards?navigationMethod=pagination&page=${page}&size=${size}`
    );
    const body = res.data;
    console.log(body)
    return body;
  } catch (e) {
    console.error(e);
  }
}
