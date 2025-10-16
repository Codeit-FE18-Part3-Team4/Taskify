import { getColumn } from "@/components/dashboard/column/api/column";
import { Column } from "@/types/column";
import { useEffect, useState } from "react";

export function useColumn(dashboardId: number | null) {
  const [columns, setColumns] = useState<Column[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
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
