import { useAuth } from "@/features/auth/components/auth-provider";
import { getMembers } from "@/features/navigation-bar/api/members";
import { MemberInfo } from "@/types/member-info";
import { useEffect, useState } from "react";

export function useMembers(dashboardId: number | null) {
  const [members, setMembers] = useState<MemberInfo[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { isLoadingToken } = useAuth();

  useEffect(() => {
    if (isLoadingToken) return;

    if (!dashboardId) {
      setMembers(null);
      return;
    }

    const loadDashboards = async () => {
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
  }, [dashboardId, isLoadingToken]);

  return { members, isLoading, error };
}
