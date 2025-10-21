import Alert, { AlertActionType } from "@/components/alert";
import Dialog from "@/components/dialog";
import XIcon from "@/components/icon/x-gray-icon";
import NavigationBar from "@/components/navigationBar/navigation-bar";
import Typography from "@/components/typography";
import Edit from "@/features/dashboard/edit/edit";
import EditSidebar, { TabType } from "@/features/dashboard/edit/edit-sidebar";
import ModifyMembers from "@/features/dashboard/edit/modify-members";
import { useAlert } from "@/hooks/use-alert";
import { useAllDashboards } from "@/hooks/use-all-dashboards";
import { useDashboardById, useDeleteDashboard } from "@/hooks/use-dashboard";
import { useDialog } from "@/hooks/use-dialog";
import { useSsrResponsive } from "@/hooks/use-ssr-responsive";
import { classnames } from "@/utils/classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./edit.module.css";

export default function DashboardEditPage() {
  const router = useRouter();
  const { id } = router.query;
  const dashboardId = Array.isArray(id)
    ? Number(id[0])
    : id
      ? Number(id)
      : null;

  const {
    dashboard,
    isLoading: dashboardIsLoading,
    refetch,
  } = useDashboardById(dashboardId);
  const [alertMessage, setAlertMessage] = useState("");
  const [activeTab, setActiveTab] = useState<TabType | null>(null);

  useEffect(() => {
    if (dashboard && activeTab === null) {
      const initialTab = dashboard.createdByMe
        ? TabType.Edit
        : TabType.ModifyMembers;
      setActiveTab(initialTab);
    }
  }, [dashboard, activeTab]);

  const [dialogMessage, setDialogMessage] = useState("");
  const EDIT_EIALOG = "EDIT_EIALOG";
  const { isShowDialog, openDialog } = useDialog({
    key: EDIT_EIALOG,
  });

  const DASHBOARD_DELETE_KEY = "DASHBOARD_DELETE_CHEKCK";
  const { isShowAlert, openAlert } = useAlert({
    key: DASHBOARD_DELETE_KEY,
  });

  const { allDashboards } = useAllDashboards();
  const { removeDashboard } = useDeleteDashboard();

  const deleteDashboard = () => {
    setAlertMessage("대시보드를 삭제하시겠습니까?");
    openAlert(true);
  };

  const handleTabChange = (newTab: TabType) => {
    if (newTab === TabType.Delete) {
      deleteDashboard();
      return;
    }

    setActiveTab(newTab);
  };

  const hadleConfirmClick = async () => {
    if (dashboardId) {
      const result = await removeDashboard(dashboardId);
      setDialogMessage(result?.message ?? "대시보드 삭제에 실패하였습니다.");
      openDialog(true);
    }

    setTimeout(() => {
      openDialog(false);

      const remainingDashboards = allDashboards?.filter(
        (dashboard) => dashboard.id !== dashboardId
      );

      if (remainingDashboards && remainingDashboards.length > 0) {
        router.push(`/dashboard/${remainingDashboards[0].id}`);
      } else {
        router.push("/my-dashboard");
      }
    }, 1500);
  };

  const handleUpdatePage = (message: string, status: boolean) => {
    setDialogMessage(message);
    openDialog(true);

    if (status) {
      refetch();
    }
  };

  const { isMobile } = useSsrResponsive();

  return (
    <div className={styles.page}>
      <NavigationBar />
      <main className={styles.main}>
        <EditSidebar
          onTabChange={handleTabChange}
          activeTab={activeTab ?? TabType.ModifyMembers}
          createdByMe={dashboard?.createdByMe ?? false}
        />
        <section className={styles.contents}>
          {dashboardIsLoading ? (
            <span className={styles.exception}>로딩중...</span>
          ) : dashboard ? (
            <>
              {activeTab === TabType.Edit && (
                <Edit
                  dashboard={dashboard}
                  onUpdate={(message, status) =>
                    handleUpdatePage(message, status)
                  }
                />
              )}
              {activeTab === TabType.ModifyMembers && (
                <ModifyMembers
                  createdByMe={dashboard.createdByMe}
                  dashboard={dashboard}
                  onUpdate={(message, status) =>
                    handleUpdatePage(message, status)
                  }
                />
              )}
            </>
          ) : (
            <span className={styles.exception}>
              대시보드를 찾을 수 없습니다.
            </span>
          )}
          {dashboard && (
            <div className={styles.backbuttonWrapper}>
              <Link
                href={`/dashboard/${dashboard.id}`}
                className={styles.backButton}
              >
                <XIcon className={styles.xIcon} />
                {!isMobile && (
                  <span className={classnames(Typography.mdSemiBold)}>
                    돌아가기
                  </span>
                )}
              </Link>
            </div>
          )}
        </section>
      </main>

      {isShowDialog && (
        <Dialog
          dialogKey={EDIT_EIALOG}
          message={dialogMessage}
          onConfirm={() => openDialog(false)}
        />
      )}
      {isShowAlert && (
        <Alert
          alertKey={DASHBOARD_DELETE_KEY}
          title="알림"
          message={alertMessage}
          actionType={AlertActionType.Delete}
          onCancel={() => {}}
          onAction={hadleConfirmClick}
        />
      )}
    </div>
  );
}
