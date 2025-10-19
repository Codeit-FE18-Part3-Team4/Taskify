// pages/my-dashboard.tsx (또는 해당 페이지 경로)
import DashboardLayout from "@/components/dashboard-layout";
import { useDashboardContext } from "@/features/my-dashboard/dashboard-provider";
import MyDashboardMain from "@/features/my-dashboard/my-dashboard-main";
import { useAllDashboards } from "@/hooks/use-all-dashboards";
import { useSheet } from "@/hooks/use-sheet";
import styles from "@/styles/my-dashboard.module.css";
import { ReactNode, useEffect } from "react";

const SHEET_KEY = "SHEET_DASHBOARD_ADD";

export default function MyDashboard() {
  const { allDashboards, refreshAllDashboards } = useAllDashboards();
  const { registerMainRefresh } = useDashboardContext();

  useEffect(() => {
    registerMainRefresh(refreshAllDashboards);
  }, [registerMainRefresh, refreshAllDashboards]);

  const { openSheet } = useSheet({
    key: SHEET_KEY,
  });

  return (
    <div className={styles.myDashboardWrap}>
      <MyDashboardMain
        onClick={() => {
          openSheet(true);
        }}
        dashboards={allDashboards}
      />
    </div>
  );
}

MyDashboard.getLayout = function getLayout(page: ReactNode) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
