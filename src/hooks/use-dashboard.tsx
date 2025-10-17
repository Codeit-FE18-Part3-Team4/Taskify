import { useEffectAuth } from "@/features/auth/components/auth-provider";
import { getDashboards, getDashboardById } from "@/features/my-dashboard/api/";
import { Dashboard } from "@/types/dashboard";
import { useState } from "react";

export function useDashboard() {
  const [dashboards, setDashboards] = useState<Dashboard[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffectAuth(() => {
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
  }, []);

  return { dashboards, isLoading, error };
}

export function useDashboardById(dashboardId: number | null) {
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadDashboard = async () => {
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

  useEffectAuth(() => {
    loadDashboard();
  }, [dashboardId]);

  const refetch = () => {
    return loadDashboard();
  };

  return { dashboard, isLoading, error, refetch };
}
