import DashboardSideBar from "@/components/dashboard-side-bar/dashboard-side-bar";
import { useAllDashboards } from "@/hooks/use-all-dashboards";
import { useSheet } from "@/hooks/use-sheet";
import { useSsrResponsive } from "@/hooks/use-ssr-responsive";
import { useEffect } from "react";
import { useDashboardContext } from "../../features/my-dashboard/dashboard-provider";
import MyDashboardMain from "../../features/my-dashboard/my-dashboard-main";
import styles from "./my-dashboard.module.css";

const SHEET_KEY = "SHEET_DASHBOARD_ADD";

export default function MyDashboard() {
  const { allDashboards, refreshAllDashboards } = useAllDashboards();
  const { registerMainRefresh } = useDashboardContext();

  useEffect(() => {
    registerMainRefresh(refreshAllDashboards);
  }, [registerMainRefresh, refreshAllDashboards]);

  useEffect(() => {
    registerMainRefresh(refreshAllDashboards);
  }, [registerMainRefresh, refreshAllDashboards]);

  const { openSheet } = useSheet({
    key: SHEET_KEY,
  });

  const { isMobile } = useSsrResponsive();

  return (
    <div className={styles.myDashboardWrap}>
      {!isMobile && <DashboardSideBar />}
      <MyDashboardMain
        onClick={() => {
          openSheet(true);
        }}
        dashboards={allDashboards}
      />
    </div>
  );
}
