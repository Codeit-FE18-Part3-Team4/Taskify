import { useResponsiveValue } from "@/hooks/use-responsive-value";
import { useDashboardContext } from "@/pages/my-dashboard/dashboard-provider";
import { Dashboard } from "@/types/my-dashboard";
import { useEffect, useMemo } from "react";

export function useDashboardPagination(dashboards: Dashboard[]) {
  const { currentDashboardPage, setCurrentDashboardPage } = useDashboardContext();

  const responsivePageSize = useResponsiveValue({
    desktop: 3,
    tablet: 1,
    mobile: 1,
  });

  const PAGE_SIZE = responsivePageSize;

  useEffect(() => {
    setCurrentDashboardPage(0);
  }, [PAGE_SIZE, setCurrentDashboardPage]);

  const totalPages = useMemo(() => {
    return Math.ceil(dashboards.length / PAGE_SIZE);
  }, [dashboards, PAGE_SIZE]);

  const currentDashboards = useMemo(() => {
    const start = currentDashboardPage * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return dashboards.slice(start, end);
  }, [dashboards, currentDashboardPage, PAGE_SIZE]);

  const handlePrevPage = () => {
    if (currentDashboardPage > 0) {
      setCurrentDashboardPage(currentDashboardPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentDashboardPage < totalPages - 1) {
      setCurrentDashboardPage(currentDashboardPage + 1);
    }
  };

  useEffect(() => {
    if (totalPages > 0 && currentDashboardPage >= totalPages) {
      setCurrentDashboardPage(Math.max(0, totalPages - 1));
    }
  }, [totalPages, currentDashboardPage, setCurrentDashboardPage]);

  const isFirstPage = currentDashboardPage === 0;
  const isLastPage = currentDashboardPage === totalPages - 1;

  return {
    currentPage: currentDashboardPage,
    totalPages,
    currentDashboards,
    handlePrevPage,
    handleNextPage,
    isFirstPage,
    isLastPage,
    PAGE_SIZE,
  };
}