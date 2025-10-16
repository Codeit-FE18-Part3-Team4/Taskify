import { useDashboardSidebar } from "@/hooks/use-dashboard-side-bar";
import { useDashboardContext } from "@/pages/my-dashboard/dashboard-provider";
import { DashboardSideBarProps } from "@/types/dashboard-side-bar";
import { useEffect } from "react";
import styles from "./dashboard-side-bar.module.css";
import Header from "./header";
import Main from "./main";
import UserProfile from "./user-profile";

export default function DashboardSideBar({ onClick }: DashboardSideBarProps) {
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
  }, [registerRefresh, refreshDashboards])



  return (
    <div className={styles.sideBar}>
      <Header />
      <Main
        dashboards={dashboards}
        onClick={onClick}
        currentPage={currentPage}
        totalCount={totalCount}
        onPageChange={handlePageChange}
        isLoading={isLoading}
      />
      <UserProfile
        name={userInfo?.nickname}
        profileImageUrl={userInfo?.profileImageUrl}
      />
    </div>
  );
}
