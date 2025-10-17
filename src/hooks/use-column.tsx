import { getColumn } from "@/components/dashboard/column/api/column";
import { useEffectAuth } from "@/features/auth/components/auth-provider";
import { Column } from "@/types/column";
import { useState } from "react";

export function useColumn(dashboardId: number | null) {
  const [columns, setColumns] = useState<Column[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffectAuth(() => {
    if (!dashboardId) {
      setColumns(null);
      return;
    }

    const loadColumns = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const res = await getColumn({ dashboardId });
        setColumns(res?.data ?? []);
      } catch (e) {
        console.error(e);
        setError(e as Error);
        setColumns(null);
        throw e;
      } finally {
        setIsLoading(false);
      }
    };
    loadColumns();
  }, [dashboardId]);

  return { columns, isLoading, error };
}
