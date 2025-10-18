import { getColumn } from "@/components/dashboard/column/api/column";
import { useAuth } from "@/features/auth/components/auth-provider";
import { Column } from "@/types/column";
import { useCallback, useEffect, useState } from "react";

export function useColumn(dashboardId: number | null) {
  const [columns, setColumns] = useState<Column[] | null>(null);
  const [isLoadingColumns, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { isLoadingToken } = useAuth();

  const loadColumns = useCallback(
    async ({ loading }: { loading: boolean } = { loading: true }) => {
      setIsLoading(loading);
      setError(null);

      try {
        if (!dashboardId) {
          setColumns(null);
          return;
        }

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
    },
    [dashboardId]
  );

  useEffect(() => {
    if (isLoadingToken) return;
    loadColumns();
  }, [isLoadingToken, loadColumns]);

  return {
    columns,
    isLoadingColumns,
    error,
    reloadColumns: loadColumns,
  };
}
