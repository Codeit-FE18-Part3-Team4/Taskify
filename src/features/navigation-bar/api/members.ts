import axiosInstance from "@/services/axios-instance";

interface MembersProps {
  size: number;
  page: number;
  dashboardId: number;
}

export async function getMembers({ size, page, dashboardId }: MembersProps) {
  if (!dashboardId) return [];

  try {
    const res = await axiosInstance.get(
      `/members??page=${page}&size=${size}&dashboardId=${dashboardId}`,
    );
    return res.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function getDashboardInvitees({
  size = 6,
  page = 1,
  dashboardId,
}: MembersProps) {
  if (!dashboardId) return [];

  try {
    const res = await axiosInstance.get(
      `/dashboards/${dashboardId}/invitations?page=${page}&size=${size}`,
    );
    return res.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function deleteDashboardMember(memberId: number) {
  try {
    return await axiosInstance.delete(`/members/${memberId}`);
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function cancelDashboardInviete({
  dashboardId,
  invitationId,
}: {
  dashboardId: number;
  invitationId: number;
}) {
  try {
    return axiosInstance.delete(`/dashboards/${dashboardId}/invitations/${invitationId}
`);
  } catch (e) {
    console.error(e);
    throw e;
  }
}
