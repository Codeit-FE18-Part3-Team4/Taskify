import { useAuthEffect } from "@/features/auth/components/auth-provider";
import { getMembers } from "@/features/navigation-bar/api/members";
import { MemberInfo } from "@/types/member-info";
import { useState } from "react";

interface MembersProps {
  dashboardId: number | null;
  page: number;
  size: number;
}

export function useMembers({ dashboardId, page, size }: MembersProps) {
  const [members, setMembers] = useState<MemberInfo[] | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useAuthEffect(() => {
    if (!dashboardId) {
      setMembers(null);
      setTotalCount(0);
      return;
    }

    setIsLoading(true);
    setError(null);

      try {
        const res = await getMembers({ dashboardId });
        setMembers(res?.members ?? []);
      } catch (e) {
        console.error(e);
        setError(e as Error);
        setMembers(null);
      } finally {
        setIsLoading(false);
      }
    };
    loadDashboards();
  }, [dashboardId]);

  useEffect(() => {
    loadMembers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dashboardId, page, size, isLoadingToken]);

  const refetch = () => {
    return loadMembers();
  };

  return { members, totalCount, isLoading, error, refetch };
}
