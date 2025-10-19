import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./edit.module.css";
import NavigationBar from "@/components/navigationBar/navigation-bar";
import Typography from "@/components/typography";
import EditSidebar, { TabType } from "@/features/dashboard/edit/edit-sidebar";
import Edit from "@/features/dashboard/edit/edit";
import { useDashboardById } from "@/hooks/use-dashboard";
import Link from "next/link";
import XIcon from "@/components/icon/x-gray-icon";
import { classnames } from "@/utils/classnames";
import ModifyMembers from "@/features/dashboard/edit/modify-members";
import Dialog from "@/components/dialog";
import { useDialog } from "@/hooks/use-dialog";

export default function DashboardEditPage() {
  const router = useRouter();
  const { id, tab } = router.query;
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

  const tabValue = Array.isArray(tab) ? tab[0] : tab;
  const activeTab = (tabValue as TabType) ?? TabType.Edit;

  const [dialogMessage, setDialogMessage] = useState("");
  const EDIT_EIALOG = "EDIT_EIALOG";
  const { isShowDialog, openDialog } = useDialog({
    key: EDIT_EIALOG,
  });

  useEffect(() => {
    if (router.isReady) {
      console.log("현재 탭:", tab);
    }
  }, [router.isReady, tab]);

  const deleteDashboard = () => {
    console.log("delete할꺼야");
  };

  const handleTabChange = (newTab: TabType) => {
    if (newTab === TabType.Delete) {
      deleteDashboard();
      return;
    }

    router.push(
      {
        pathname: router.pathname,
        query: { id, tab: newTab },
      },
      undefined,
      { shallow: true },
    );
  };

  const handleUpdatePage = (message: string, status: boolean) => {
    setDialogMessage(message);
    openDialog(true);

    if (status) {
      refetch();
    }
  };

  return (
    <div className={styles.page}>
      <NavigationBar />
      <main className={styles.main}>
        <EditSidebar onTabChange={handleTabChange} activeTab={activeTab} />
        <section className={styles.contents}>
          {dashboardIsLoading ? (
            <span className={styles.exception}>로딩중...</span>
          ) : dashboard ? (
            <>
              {tab === TabType.Edit && (
                <Edit
                  dashboard={dashboard}
                  onUpdate={(message, status) =>
                    handleUpdatePage(message, status)
                  }
                />
              )}
              {tab === TabType.ModifyMembers && (
                <ModifyMembers
                  createdByMe={dashboard.createdByMe}
                  dashboardId={dashboard.id}
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
            <div>
              <Link
                href={`/dashboard/${dashboard.id}`}
                className={styles.backButton}
              >
                <XIcon className={styles.xIcon} />
                <span className={classnames(Typography.mdSemiBold)}>
                  돌아가기
                </span>
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
    </div>
  );
}
