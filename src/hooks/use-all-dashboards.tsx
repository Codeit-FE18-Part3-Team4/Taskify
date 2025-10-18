import { useAuth } from "@/features/auth/components/auth-provider";
import { getDashboards } from "@/features/my-dashboard/api/";
import { Dashboard } from "@/types/my-dashboard";
import { useCallback, useEffect, useState } from "react";

export function useAllDashboards() {
  const [allDashboards, setAllDashboards] = useState<Dashboard[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isLoadingToken } = useAuth();

  const loadAllDashboards = useCallback(async () => {
    setIsLoading(true);
    try {
      const dashboardsRes = await getDashboards({ page: 1, size: 1000 });

      setAllDashboards(dashboardsRes.dashboards);
    } catch (error) {
      console.error("Failed to load all dashboards:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isLoadingToken) return;
    loadAllDashboards();
  }, [isLoadingToken, loadAllDashboards]);

  const addDashboard = useCallback((dashboard: Dashboard) => {
    setAllDashboards((prev) => [dashboard, ...prev]);
  }, []);

  const refreshAllDashboards = useCallback(() => {
    loadAllDashboards();
  }, [loadAllDashboards]);

  return {
    allDashboards,
    isLoading,
    addDashboard,
    refreshAllDashboards,
  };
}
