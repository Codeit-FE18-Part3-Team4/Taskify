import { Dashboard, UserInfo } from "@/pages/my-dashboard";
import styles from "./dashboard-side-bar.module.css";
import Header from "./header";
import Main from "./main";
import UserProfile from "./user-profile";

interface DashboardSideBarProps {
  dashboards: Dashboard[];
  onClick: () => void;
  user: UserInfo;
}

export default function DashboardSideBar({
  user,
  dashboards,
  onClick,
}: DashboardSideBarProps) {
  return (
    <div className={styles.sideBar}>
      <Header />
      <Main dashboards={dashboards} onClick={onClick} />
      <UserProfile name={user.nickname} profileImageUrl={user.profileImageUrl} />
    </div>
  );
}
