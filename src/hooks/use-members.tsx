import { useAuthEffect } from "@/features/auth/components/auth-provider";
import {
  getMembers,
  getDashboardInvitees,
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

  const refetch = () => {
    setRefetchTrigger((prev) => prev + 1);
  };

  return { members, totalCount, isLoading, error, refetch };
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
