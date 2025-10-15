import styles from "./dashboard-side-bar.module.css";
import Header from "./header";
import Main from "./main";
import UserProfile from "./user-profile";

interface DashboardSideBarProps {
  dashboards: any[];
  onClick: () => void;
};

export default function DashboardSideBar({
  dashboards,
  onClick,
}: DashboardSideBarProps) {
  return (
    <div className={styles.sideBar}>
      <Header />
      <Main dashboards={dashboards} onClick={onClick} />
      <UserProfile name={"박민영"} profileImageUrl="" />
    </div>
  );
}
