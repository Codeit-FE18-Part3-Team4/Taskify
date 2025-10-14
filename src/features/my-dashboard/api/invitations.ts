import axiosInstance from '@/services/axios-instance';

export async function getInvitations({ title = "", size = 10 }) {
  try {
    // 로그인 구현전에 테스트용으로 넣는 토큰입니다.
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjI4MSwidGVhbUlkIjoiMTgtNCIsImlhdCI6MTc2MDQ0MzU5MSwiaXNzIjoic3AtdGFza2lmeSJ9.wZBkvY8Q8gGwwpFgMaBIH32CzjtISeq56EB4g8ise9o";

    const res = await axiosInstance.get(
      `/invitations?size=${size}&title=${title}`,
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