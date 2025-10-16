import { Dashboard, UserInfo } from "./my-dashboard";

export interface DashboardSideBarProps {
  dashboards: Dashboard[];
  onClick: () => void;
  user: UserInfo;
}

export interface MainProps {
  dashboards: Dashboard[];
  onClick: () => void;
}

export interface UserProfileProps {
  name?: string;
  profileImageUrl: string | undefined;
}