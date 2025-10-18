import {
  getColumn,
  postColumn,
  putColumnTitle,
} from "@/components/dashboard/column/api/column";
import { Column } from "@/types/column";
import { useState, useCallback, useEffect } from "react";
import { useMutation } from "./use-mutation";
import { OperationStatus } from "@/types/operation-status";

export function useColumn(dashboardId: number | null) {
  const [columns, setColumns] = useState<Column[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<OperationStatus>({
    type: "idle",
    message: "",
  });

  const loadColumns = useCallback(async () => {
    if (!dashboardId) {
      setColumns(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await getColumn({ dashboardId });
      setColumns(res?.data ?? []);
    } catch (e) {
      setError(e as Error);
      setColumns(null);
    } finally {
      setIsLoading(false);
    }
  }, [dashboardId]);

  useEffect(() => {
    loadColumns();
  }, [dashboardId, loadColumns]);

  const { mutate: mutCreateColumn, isLoading: isCreating } = useMutation(
    postColumn,
    {
      onSuccess: () => {
        setStatus({
          type: "success",
          message: "컬럼이 생성되었습니다.",
        });
        loadColumns();
      },
      onError: (err) => {
        console.error("컬럼 생성 실패:", err);
        setStatus({
          type: "error",
          message: "컬럼 생성에 실패했습니다.",
        });
      },
    },
  );

  const { mutate: rawUpdateColumn, isLoading: isUpdating } = useMutation(
    putColumnTitle,
    {
      onSuccess: () => {
        setStatus({
          type: "success",
          message: "컬럼이 수정되었습니다.",
        });
        loadColumns();
      },
      onError: (err) => {
        console.error("컬럼 수정 실패:", err);
        setStatus({
          type: "error",
          message: "컬럼 수정에 실패했습니다.",
        });
      },
    },
  );

  const createColumn = async (payload: Parameters<typeof postColumn>[0]) => {
    try {
      const result = await mutCreateColumn(payload);
      return { success: true as const, result };
    } catch (err) {
      return { success: false as const, error: err };
    }
  };

  const updateColumn = async (
    payload: Parameters<typeof putColumnTitle>[0],
  ) => {
    try {
      const result = await rawUpdateColumn(payload);
      return { success: true as const, result };
    } catch (err) {
      return { success: false as const, error: err };
    }
  };

  const clearStatus = useCallback(() => {
    setStatus({ type: "idle", message: "" });
  }, []);

  return {
    columns,
    isLoading,
    error,
    isCreating,
    isUpdating,
    status,
    clearStatus,
    refetch: loadColumns,
    createColumn,
    updateColumn,
  };
}
