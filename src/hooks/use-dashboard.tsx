import { getDashboards } from "@/components/dashboard-side-bar/api/dashboard";
import { useEffect, useState } from "react";

export function useDashboard() {
  const [dashboards, setDashboards] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadDashboards = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { dashboards } = await getDashboards();
        setDashboards(dashboards);
      } catch (e) {
        console.error(e);
        setError(e as Error);
      } finally {
        setIsLoading(false);
      }
    };
    loadDashboards();
  }, []);

  return { dashboards, isLoading, error };
}
