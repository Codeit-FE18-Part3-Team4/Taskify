import DashboardSideBar from "@/components/dashboard-side-bar/dashboard-side-bar";
import { useSsrResponsive } from "@/hooks/use-ssr-responsive";
import { ReactNode } from "react";
import CreateDashboardSheet from "../dashboard-create/create-dashboard-sheet";
import AccountSettingModal from "../profile-setting-modal";
import styles from "./dashboard-layout.module.css";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { isMobile } = useSsrResponsive();

  return (
    <div className={styles.dashboardLayout}>
      {!isMobile && <DashboardSideBar />}
      <div className={styles.dashboardContent}>{children}</div>
      <CreateDashboardSheet />
      <AccountSettingModal />
    </div>
  );
}
