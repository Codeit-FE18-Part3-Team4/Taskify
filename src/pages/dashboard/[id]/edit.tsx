import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "./edit.module.css";
import NavigationBar from "@/components/navigationBar/navigation-bar";
import Typography from "@/components/typography";
import EditSidebar, {
  TabType,
} from "@/features/dashboard/edit/components/edit-sidebar";
import Edit from "@/features/dashboard/edit/components/edit";
import { useDashboardById } from "@/hooks/use-dashboard";
import Link from "next/link";
import XIcon from "@/components/icon/x-gray-icon";
import { classnames } from "@/utils/classnames";
import ModifyMembers from "@/features/dashboard/edit/components/modify-members";

// const MEMBERS_PER_PAGE = 6;
// const INVITATIONS_PER_PAGE = 6;

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

  // useEffect(() => {
  //   console.log(router.query);
  //   console.log("Editing dashboard:", id);
  // }, [id]);

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

  return (
    <div className={styles.page}>
      <NavigationBar />
      <main className={styles.main}>
        <EditSidebar onTabChange={handleTabChange} activeTab={activeTab} />
        <section className={styles.contents}>
          {tab === TabType.Edit && (
            <>
              {dashboardIsLoading ? (
                <div>로딩중...</div>
              ) : dashboard ? (
                <Edit dashboard={dashboard} onUpdate={refetch} />
              ) : (
                <div>대시보드를 찾을 수 없습니다.</div>
              )}
            </>
          )}
          {tab === TabType.ModifyMembers && <ModifyMembers />}
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
    </div>
  );
}
