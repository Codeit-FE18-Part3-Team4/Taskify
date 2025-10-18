import { Dashboard } from "./my-dashboard";

export interface DashboardSideBarProps {
  onClick: () => void;
}

export interface MainProps {
  dashboards: Dashboard[];
  onClick: () => void;
  currentPage: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export interface UserProfileProps {
  name?: string;
  profileImageUrl?: string;
  onClick: () => void;
}

export interface SidebarPageControlProps {
  onPrev: () => void;
  onNext: () => void;
  currentPage: number;
  totalPages: number;
}
