import DashboardSideBar from "@/components/dashboard-side-bar/dashboard-side-bar";
import { useMembers } from "@/hooks/use-members";
import { useSsrResponsive } from "@/hooks/use-ssr-responsive";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import CreateDashboardSheet from "../dashboard-create/create-dashboard-sheet";
import NavigationBar from "../navigationBar/navigation-bar";
import AccountSettingModal from "../profile-setting-modal";
import styles from "./dashboard-layout.module.css";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { isMobile } = useSsrResponsive();
  const router = useRouter();
  const { id } = router.query;

  const dashboardId = Array.isArray(id)
    ? Number(id[0])
    : id
      ? Number(id)
      : null;

  const { members } = useMembers(dashboardId);

  return (
    <div className={styles.dashboardLayout}>
      {!isMobile && <DashboardSideBar />}
      <div className={styles.dashboardContent}>
        <NavigationBar
          members={members ?? []}
          dashboardId={dashboardId ?? null}
        />
        <main className={styles.main}>{children}</main>
      </div>
      <CreateDashboardSheet />
      <AccountSettingModal />
    </div>
  );
}
