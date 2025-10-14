import axiosInstance from "@/services/axios-instance";

export async function getDashboards({ page = 1, size = 10 }) {
  try {
    // 로그인 구현전에 테스트용으로 넣는 토큰입니다.
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjI4MSwidGVhbUlkIjoiMTgtNCIsImlhdCI6MTc2MDQzNzYwMiwiaXNzIjoic3AtdGFza2lmeSJ9.eKkkeG0uztPYhJWBNAk1enDFYkqNREoXNJcTDlcmVks";

    const res = await axiosInstance.get(
      `/dashboards?navigationMethod=pagination&page=${page}&size=${size}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const body = res.data;
    return body;
  } catch (e) {
    console.error(e);
  }
}
