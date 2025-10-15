import { getColumn } from "@/components/dashboard/column/api/column";
import { Column } from "@/types/column";
import { useEffect, useState } from "react";

export function useColumn(dashboardId: number | null) {
  const [columns, setColumns] = useState<Column[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (dashboardId === null) {
      setColumns([]);
      return;
    }

    const loadColumns = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { data } = await getColumn({ dashboardId });
        setColumns(data || []);
      } catch (e) {
        console.error(e);
        setError(e as Error);
      } finally {
        setIsLoading(false);
      }
    };
    loadColumns();
  }, [dashboardId]);

  return { columns, isLoading, error };
}
