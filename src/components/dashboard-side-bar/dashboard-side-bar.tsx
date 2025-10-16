import { DashboardSideBarProps } from "@/types/dashboard-side-bar";
import styles from "./dashboard-side-bar.module.css";
import Header from "./header";
import Main from "./main";
import UserProfile from "./user-profile";

export default function DashboardSideBar({
  user,
  dashboards,
  onClick,
  currentPage,
  totalCount,
  onPageChange,
}: DashboardSideBarProps) {
  return (
    <div className={styles.sideBar}>
      <Header />
      <Main
        dashboards={dashboards}
        onClick={onClick}
        currentPage={currentPage}
        totalCount={totalCount}
        onPageChange={onPageChange}
      />
      <UserProfile
        name={user.nickname}
        profileImageUrl={user.profileImageUrl}
      />
    </div>
  );
}
