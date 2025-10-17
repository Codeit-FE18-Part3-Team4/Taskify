import { useAllDashboards } from "@/hooks/use-all-dashboards";
import { useDashboardSidebar } from "@/hooks/use-dashboard-side-bar";
import { useSheet } from "@/hooks/use-sheet";
import { useDashboardContext } from "@/pages/my-dashboard/dashboard-provider";
import { useEffect } from "react";
import DashoardCreate from "../dashboard-create/dashoard-create";
import styles from "./dashboard-side-bar.module.css";
import Header from "./header";
import Main from "./main";
import UserProfile from "./user-profile";

const SHEET_KEY = "SHEET_DASHBOARD_ADD";

export default function DashboardSideBar() {
  const {
    dashboards,
    userInfo,
    currentPage,
    totalCount,
    isLoading,
    handlePageChange,
    refreshDashboards,
  } = useDashboardSidebar();
  const { registerRefresh } = useDashboardContext();

  useEffect(() => {
    registerRefresh(refreshDashboards);
  }, [registerRefresh, refreshDashboards]);

  const { openSheet } = useSheet({
    key: SHEET_KEY,
  });

  const handleMyPageUrlClick = () => {
    window.history.pushState(null, "", "/mypage");
  };

  return (
    <div className={styles.sideBar}>
      <Header />
      <Main
        dashboards={dashboards}
        onClick={() => openSheet(true)}
        currentPage={currentPage}
        totalCount={totalCount}
        onPageChange={handlePageChange}
        isLoading={isLoading}
      />
      <UserProfile
        name={userInfo?.nickname}
        profileImageUrl={userInfo?.profileImageUrl}
        onClick={handleMyPageUrlClick}
      />
      <DashoardCreate />
    </div>
  );
}
