import axiosInstanceTest from "@/services/axios-instance-test";

interface PostDashboardProps {
  title: string;
  color: string;
}

interface putInvitationsAcceptsProps {
  invitationsId: number;
  inviteAccepted: boolean;
}

export async function getDashboards({
  page = 1,
  size = 10,
}: { page?: number; size?: number } = {}) {
  try {
    const res = await axiosInstanceTest.get(
      `/dashboards?navigationMethod=pagination&page=${page}&size=${size}`
    );
    const body = res.data;
    return body;
  } catch (e) {
    console.error(e);
  }
}

export async function getInvitations({
  size = 10,
  cursorId,
}: { size?: number; cursorId?: number } = {}) {
  try {
    const params = new URLSearchParams();
    params.append("size", size.toString());
    if (cursorId) {
      params.append("cursorId", cursorId.toString());
    }

    const res = await axiosInstanceTest.get(`/invitations?${params}`);
    const body = res.data;
    return body;
  } catch (e) {
    console.error(e);
  }
}

export async function getUserInfo() {
  try {
    const res = await axiosInstanceTest.get("/users/me");
    const body = res.data;
    return body;
  } catch (e) {
    console.error(e);
  }
}

export async function postDashboard({ title, color }: PostDashboardProps) {
  try {
    const res = await axiosInstanceTest.post(`/dashboards`, {
      title,
      color,
    });
    const body = res.data;
    return body;
  } catch (e) {
    console.error(e);
  }
}

export async function putInvitationsAccepts({
  invitationsId,
  inviteAccepted,
}: putInvitationsAcceptsProps) {
  try {
    const res = await axiosInstanceTest.put(`/invitations/${invitationsId}`, {
      inviteAccepted,
    });
    const body = res.data;
    return body;
  } catch (e) {
    console.error(e);
  }
}
