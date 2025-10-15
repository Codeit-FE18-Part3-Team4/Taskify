import axiosInstanceTest from '@/services/axios-instance-test';

export async function getInvitations({ size = 10, cursorId }: { size?: number; cursorId?: number } = {}) {
  try {
    const params = new URLSearchParams();
    params.append('size', size.toString());
    if (cursorId) {
      params.append('cursorId', cursorId.toString());
    }
    
    const res = await axiosInstanceTest.get(
      `/invitations?${params.toString()}`,
    );
    const body = res.data;
    return body;
  } catch (e) {
    console.error(e);
  }
}