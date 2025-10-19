import { useDashboardContext } from "@/features/my-dashboard/dashboard-provider";
import { useDashboardSidebar } from "@/hooks/use-dashboard-side-bar";
import { useModal } from "@/hooks/use-modal";
import { useSheet } from "@/hooks/use-sheet";
import { useEffect } from "react";
import AccountSettingModal from "../account-setting-modal";
import CreateDashboardSheet from "../dashboard-create/create-dashboard-sheet";
import styles from "./dashboard-side-bar.module.css";
import Header from "./header";
import Main from "./main";
import UserProfile from "./user-profile";

const SHEET_KEY = "SHEET_DASHBOARD_ADD";
const ACCOUNT_SETTING_MODAL_KEY = "ACCOUNT_SETTING_MODAL";

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

  const {
    isShowModal: isShowAccountSettingModal,
    openModal: openAccountSettingModal,
  } = useModal({
    key: ACCOUNT_SETTING_MODAL_KEY,
  });

  const handleMyPageUrlClick = () => {
    // window.history.pushState(null, "", "/mypage");
    openAccountSettingModal(true);
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
      <CreateDashboardSheet />

      {isShowAccountSettingModal && (
        <AccountSettingModal modalKey={ACCOUNT_SETTING_MODAL_KEY} />
      )}
    </div>
  );
}
