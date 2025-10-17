import { useEffectAuth } from "@/features/auth/components/auth-provider";
import { getDashboards } from "@/features/my-dashboard/api/";
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
