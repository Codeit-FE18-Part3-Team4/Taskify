import { useResponsiveValue } from "@/hooks/use-responsive-value";
import { Dashboard } from "@/types/my-dashboard";
import { useEffect, useMemo, useState } from "react";

export function useDashboardPagination(dashboards: Dashboard[]) {
  const [currentPage, setCurrentPage] = useState<number>(0);

  const responsivePageSize = useResponsiveValue({
    desktop: 3,
    tablet: 1,
    mobile: 1,
  });

  const PAGE_SIZE = responsivePageSize;

  useEffect(() => {
    setCurrentPage(0);
  }, [PAGE_SIZE]);

  const totalPages = useMemo(() => {
    return Math.ceil(dashboards.length / PAGE_SIZE);
  }, [dashboards.length, PAGE_SIZE]);

  const currentDashboards = useMemo(() => {
    const start = currentPage * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return dashboards.slice(start, end);
  }, [dashboards, currentPage, PAGE_SIZE]);

  const handlePrevPage = () => {
    if (currentPage > 0) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage((prev) => prev + 1);
  };

  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === totalPages - 1;

  return {
    currentPage,
    totalPages,
    currentDashboards,
    handlePrevPage,
    handleNextPage,
    isFirstPage,
    isLastPage,
    PAGE_SIZE,
  };
}
