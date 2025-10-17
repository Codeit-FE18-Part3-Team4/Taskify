import { useEffectAuth } from "@/features/auth/components/auth-provider";
import { getDashboards, getUserInfo } from "@/features/my-dashboard/api/";
import { Dashboard, UserInfo } from "@/types/my-dashboard";
import { useCallback, useState } from "react";

export function useDashboardSidebar() {
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadDashboards = useCallback(async (page: number) => {
    setIsLoading(true);
    try {
      const dashboardsRes = await getDashboards({ page, size: 10 });
      setDashboards(dashboardsRes.dashboards);
      setTotalCount(dashboardsRes.totalCount);
    } catch (error) {
      console.error("Failed to load dashboards:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadUserInfo = useCallback(async () => {
    try {
      const userRes = await getUserInfo();
      setUserInfo(userRes);
    } catch (error) {
      console.error("Failed to load user info:", error);
    }
  }, []);

  const initialize = useCallback(async () => {
    setIsLoading(true);
    try {
      const [dashboardsRes, userRes] = await Promise.all([
        getDashboards({ page: 1, size: 10 }),
        getUserInfo(),
      ]);
      
      setDashboards(dashboardsRes.dashboards);
      setTotalCount(dashboardsRes.totalCount);
      setUserInfo(userRes);
    } catch (error) {
      console.error("Failed to initialize sidebar:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffectAuth(() => {
    initialize();
  }, []);

  useEffectAuth(() => {
    loadDashboards(currentPage);
  }, [currentPage]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const refreshDashboards = useCallback(() => {
    setCurrentPage(1);
    loadDashboards(1);
  }, [loadDashboards]);

  return {
    dashboards,
    userInfo,
    currentPage,
    totalCount,
    isLoading,
    handlePageChange,
    refreshDashboards,
    initialize,
  };
}