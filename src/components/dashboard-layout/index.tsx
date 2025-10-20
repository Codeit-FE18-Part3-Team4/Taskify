import DashboardSideBar from "@/components/dashboard-side-bar/dashboard-side-bar";
import { useSsrResponsive } from "@/hooks/use-ssr-responsive";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import CreateDashboardSheet from "../dashboard-create/create-dashboard-sheet";
import NavigationBar from "../navigationBar/navigation-bar";
import AccountSettingModal from "../profile-setting-modal";
import styles from "./dashboard-layout.module.css";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { isMobile } = useSsrResponsive();
  const router = useRouter();
  const { id } = router.query;
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] =
    useState<boolean>(false);

  const dashboardId = Array.isArray(id)
    ? Number(id[0])
    : id
      ? Number(id)
      : null;

  const handleToggleMobileSidebar = () => {
    setIsMobileSidebarOpen((prev) => !prev);
  };

  const handleCloseMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  useEffect(() => {
    if (isMobileSidebarOpen) {
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.position = "";
    }
    return () => {
      document.body.style.position = "";
    };
  }, [isMobileSidebarOpen]);

  return (
    <div className={styles.dashboardLayout}>
      {!isMobile && <DashboardSideBar />}
      {isMobile && isMobileSidebarOpen && (
        <DashboardSideBar handleCloseMobileSidebar={handleCloseMobileSidebar} />
      )}
      <div className={styles.dashboardContent}>
        <NavigationBar
          dashboardId={dashboardId ?? null}
          onMobileSidebarToggle={handleToggleMobileSidebar}
        />
        <main className={styles.main}>{children}</main>
      </div>
      <CreateDashboardSheet />
      <AccountSettingModal />
    </div>
  );
}
