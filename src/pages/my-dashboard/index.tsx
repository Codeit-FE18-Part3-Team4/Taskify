import { getDashboards } from "@/components/dashboard-side-bar/api/dashboard";
import DashboardSideBar from "@/components/dashboard-side-bar/dashboard-side-bar";
import { useSsrResponsive } from "@/hooks/use-ssr-responsive";
import { useEffect, useState } from "react";
import MyDashboardMain from "./my-dashboard-main";
import styles from "./my-dashboard.module.css";

export default function MyDashboard() {
  const [dashboards, setDashboards] = useState<any[]>([]);
  useEffect(() => {
    const loadData = async () => {
      try {
        const { dashboards } = await getDashboards();
        setDashboards(dashboards);
      } catch (e) {
        console.error(e);
      }
    };
    loadData();
  }, []);
  const { isMobile } = useSsrResponsive();

  return (
    <div className={styles.myDashboardWrap}>
      {!isMobile && <DashboardSideBar dashboards={dashboards} />}
      <MyDashboardMain />
    </div>
  );
}
