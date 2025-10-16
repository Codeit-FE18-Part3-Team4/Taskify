import { Dashboard, UserInfo } from "./my-dashboard";

export interface DashboardSideBarProps {
  dashboards: Dashboard[];
  onClick: () => void;
  user: UserInfo;
  currentPage: number;
  totalCount: number;
  onPageChange: (page: number) => void;
}

export interface MainProps {
  dashboards: Dashboard[];
  onClick: () => void;
  currentPage: number;
  totalCount: number;
  onPageChange: (page: number) => void;
}

export interface UserProfileProps {
  name?: string;
  profileImageUrl: string | undefined;
}

export interface SidebarPageControlProps {
  onPrev: () => void;
  onNext: () => void;
  currentPage: number;
  totalPages: number;
}
