import { useAuthEffect } from "@/features/auth/components/auth-provider";
import {
  getMembers,
  getDashboardInvitees,
  deleteDashboardMember,
  cancelDashboardInviete,
} from "@/features/navigation-bar/api/members";
import { Invitations } from "@/types/dashboard-invitations";
import { MemberInfo } from "@/types/member-info";
import { useState } from "react";

interface MembersProps {
  dashboardId: number | null;
  page?: number;
  size?: number;
}

export function useMembers({ dashboardId, page = 1, size = 6 }: MembersProps) {
  const [members, setMembers] = useState<MemberInfo[] | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  const loadMembers = async () => {
    if (!dashboardId) {
      setMembers(null);
      setTotalCount(0);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await getMembers({ dashboardId, page, size });
      setMembers(res?.members ?? []);
      setTotalCount(res?.totalCount ?? 0);
    } catch (e) {
      console.error(e);
      setError(e as Error);
      setMembers(null);
      setTotalCount(0);
    } finally {
      setIsLoading(false);
    }
  };

  useAuthEffect(() => {
    loadMembers();
  }, [dashboardId, page, size, refetchTrigger]);

  const refetch = () => setRefetchTrigger((prev) => prev + 1);

  return { members, totalCount, isLoading, error, refetch, loadMembers };
}

export function useDashboardInvitees({
  dashboardId,
  page = 1,
  size = 6,
}: MembersProps) {
  const [dashboardInvitations, setDashboardInvitations] = useState<
    Invitations[] | null
  >(null);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  const loadInvitees = async () => {
    if (!dashboardId) {
      setDashboardInvitations(null);
      setTotalCount(0);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await getDashboardInvitees({ dashboardId, page, size });
      setDashboardInvitations(res?.invitations ?? []);
      setTotalCount(res?.totalCount ?? 0);
    } catch (e) {
      console.error(e);
      setError(e as Error);
      setDashboardInvitations(null);
      setTotalCount(0);
    } finally {
      setIsLoading(false);
    }
  };

  useAuthEffect(() => {
    loadInvitees();
  }, [dashboardId, page, size, refetchTrigger]);

  const refetch = () => {
    setRefetchTrigger((prev) => prev + 1);
  };

  return { dashboardInvitations, totalCount, isLoading, error, refetch };
}

export function useDeleteDashboardMember(refetch: () => void) {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const removeMember = async (
    memberId: number,
  ): Promise<{ success: boolean; message: string }> => {
    setError(null);
    setSuccess(false);

    try {
      const res = await deleteDashboardMember(memberId);
      if (res.status === 204) {
        refetch();
        return {
          success: true,
          message: "멤버 삭제에 성공하였습니다.",
        };
      } else {
        return {
          success: false,
          message: "멤버 삭제에 실패하였습니다.",
        };
      }
    } catch (e) {
      console.error(e);
      const reulst = {
        success: false,
        message: e instanceof Error ? e.message : String(e),
      };
      return reulst;
    }
  };

  return { removeMember, error, success };
}

export function useCancelDashboardInvitation(refetch: () => void) {
  const [isCanceling, setIsCanceling] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const removeInvitation = async ({
    dashboardId,
    invitationId,
  }: {
    dashboardId: number;
    invitationId: number;
  }) => {
    if (!dashboardId || !invitationId) return;

    setError(null);
    setIsCanceling(true);
    setSuccess(false);

    try {
      const res = await cancelDashboardInviete({ dashboardId, invitationId });
      if (res.status === 204) {
        refetch();
        return { success: true, message: "초대 취소에 성공하였습니다." };
      } else {
        return { success: false, message: "초대 취소를 실패하였습니다." };
      }
    } catch (e) {
      console.error(e);
      return {
        success: false,
        message: (e as Error).message,
      };
    } finally {
      setIsCanceling(false);
    }
  };

  return { removeInvitation, error, isCanceling, success };
}
