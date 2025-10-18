import { useAuth } from "@/features/auth/components/auth-provider";
import { getDashboardById, getDashboards } from "@/features/my-dashboard/api/";
import { Dashboard } from "@/types/dashboard";
import { useEffect, useState } from "react";

export function useDashboard() {
  const [dashboards, setDashboards] = useState<Dashboard[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { isLoadingToken } = useAuth();

  useEffect(() => {
    if (isLoadingToken) return;

    const loadDashboards = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const res = await getDashboards();
        const sortedDashboards = (res?.dashboards ?? []).sort(
          (a: Dashboard, b: Dashboard) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        setDashboards(sortedDashboards);
      } catch (e) {
        console.error(e);
        setError(e as Error);
        setDashboards(null);
      } finally {
        setIsLoading(false);
      }
    };
    loadDashboards();
  }, [isLoadingToken]);

  return { dashboards, isLoading, error };
}

export function useDashboardById(dashboardId: number | null) {
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { isLoadingToken } = useAuth();

  const loadDashboard = async (dashboardId: number | null = null) => {
    if (!dashboardId) {
      setDashboard(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await getDashboardById({ dashboardId });
      setDashboard(res);
    } catch (e) {
      console.error(e);
      setError(e as Error);
      setDashboard(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoadingToken) return;
    loadDashboard(dashboardId);
  }, [dashboardId, isLoadingToken]);

  const refetch = () => {
    return loadDashboard(dashboardId);
  };

  return { dashboard, isLoading, error, refetch };
}
