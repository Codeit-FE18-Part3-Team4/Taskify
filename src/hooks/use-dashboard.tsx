import { useAuthEffect } from "@/features/auth/components/auth-provider";
import {
  deleteDashboard,
  getDashboardById,
  getDashboards,
} from "@/features/my-dashboard/api/";
import { Dashboard } from "@/types/dashboard";
import { useState } from "react";

export function useDashboard() {
  const [dashboards, setDashboards] = useState<Dashboard[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useAuthEffect(() => {
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
  });

  return { dashboards, isLoading, error };
}

export function useDashboardById(dashboardId: number | null) {
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

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

  useAuthEffect(() => {
    loadDashboard(dashboardId);
  }, [dashboardId]);

  const refetch = () => {
    return loadDashboard(dashboardId);
  };

  return { dashboard, isLoading, error, refetch };
}

export function useDeleteDashboard() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const removeDashboard = async (dashboardId: number) => {
    if (!dashboardId) return;

    setError(null);
    setIsDeleting(true);
    setSuccess(false);

    try {
      const res = await deleteDashboard(dashboardId);
      if (res.status === 204) {
        return { success: true, message: "대시보드 삭제에 성공하였습니다." };
      } else {
        return { success: false, message: "대시보드 삭제를 실패하였습니다." };
      }
    } catch (e) {
      console.error(e);
      return {
        success: false,
        message: (e as Error).message,
      };
    } finally {
      setIsDeleting(false);
    }
  };

  return { error, isDeleting, success, removeDashboard };
}
