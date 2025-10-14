import { getDashboards } from "@/components/dashboard-side-bar/api/dashboard";
import DashboardSideBar from "@/components/dashboard-side-bar/dashboard-side-bar";
import { useSsrResponsive } from "@/hooks/use-ssr-responsive";
import { useEffect, useState } from "react";
import { getInvitations } from "./api/invitations";
import MyDashboardMain from "./my-dashboard-main";
import styles from "./my-dashboard.module.css";

export default function MyDashboard() {
  const [dashboards, setDashboards] = useState<any[]>([]);
  const [invitations, setInvitations] = useState<any[]>([]);
  useEffect(() => {
    const loadData = async () => {
      try {
        const { dashboards } = await getDashboards();
        setDashboards(dashboards);
      } catch (e) {
        console.error(e);
      }
    };

    const loadInvitations = async () => {
      try {
        const { invitations } = await getInvitations();
        setInvitations(invitations);
      } catch (e) {
        console.error(e);
      }
    }
    loadData();
    loadInvitations();
  }, []);
  const { isMobile } = useSsrResponsive();

  return (
    <div className={styles.myDashboardWrap}>
      {!isMobile && <DashboardSideBar dashboards={dashboards} />}
      <MyDashboardMain dashboards={dashboards} invitations={invitations}/>
    </div>
  );
}
