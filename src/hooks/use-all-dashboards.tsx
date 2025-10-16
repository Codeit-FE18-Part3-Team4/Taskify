import { Dashboard } from "@/types/my-dashboard";
import { getDashboards } from "@/features/my-dashboard/api/";
import { useCallback, useEffect, useState } from "react";

export function useAllDashboards() {
  const [allDashboards, setAllDashboards] = useState<Dashboard[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadAllDashboards = useCallback(async () => {
    setIsLoading(true);
    try {
      const dashboardsRes = await getDashboards({ page: 1, size: 1000 });
      
      const sortedDashboards = dashboardsRes.dashboards.sort(
        (a: Dashboard, b: Dashboard) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      
      setAllDashboards(sortedDashboards);
    } catch (error) {
      console.error("Failed to load all dashboards:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAllDashboards();
  }, [loadAllDashboards]);

  const addDashboard = useCallback((dashboard: Dashboard) => {
    setAllDashboards((prev) => [dashboard, ...prev]);
  }, []);

  const refreshDashboards = useCallback(() => {
    loadAllDashboards();
  }, [loadAllDashboards]);

  return {
    allDashboards,
    isLoading,
    addDashboard,
    refreshDashboards,
  };
}