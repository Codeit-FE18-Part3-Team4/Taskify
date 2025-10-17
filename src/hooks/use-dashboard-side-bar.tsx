import { useAuth } from "@/features/auth/components/auth-provider";
import { getDashboards, getUserInfo } from "@/features/my-dashboard/api/";
import { useDashboardContext } from "@/features/my-dashboard/dashboard-provider";
import { Dashboard, UserInfo } from "@/types/my-dashboard";
import { useCallback, useEffect, useState } from "react";

const PAGE_SIZE = 10;

export function useDashboardSidebar() {
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isLoadingToken } = useAuth();

  const { currentSidebarPage, setCurrentSidebarPage } = useDashboardContext();

  const loadDashboards = useCallback(async (page: number) => {
    setIsLoading(true);
    try {
      const [dashboardsRes, userRes] = await Promise.all([
        getDashboards({
          page,
          size: PAGE_SIZE,
        }),
        getUserInfo(),
      ]);

      setDashboards(dashboardsRes.dashboards);
      setTotalCount(dashboardsRes.totalCount);
      setUserInfo(userRes);
    } catch (error) {
      console.error("Failed to load dashboards:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isLoadingToken) return;
    loadDashboards(currentSidebarPage);
  }, [loadDashboards, currentSidebarPage, isLoadingToken]);

  const handlePageChange = useCallback(
    (newPage: number) => {
      setCurrentSidebarPage(newPage);
    },
    [setCurrentSidebarPage]
  );

  const refreshDashboards = useCallback(() => {
    loadDashboards(currentSidebarPage);
  }, [loadDashboards, currentSidebarPage]);

  return {
    dashboards,
    userInfo,
    currentPage: currentSidebarPage,
    totalCount,
    isLoading,
    handlePageChange,
    refreshDashboards,
  };
}
