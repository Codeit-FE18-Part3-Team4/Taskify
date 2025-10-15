import axiosInstanceTest from "@/services/axios-instance-test";

interface putInvitationsAcceptsProps {
  invitationsId: number;
  inviteAccepted: boolean;
}

export async function putInvitationsAccepts({
  invitationsId, inviteAccepted,
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
