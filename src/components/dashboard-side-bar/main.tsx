import { HomeIcon, PlusIconNomal } from "@/assets/images";
import Typography from "@/components/typography";
import { useResponsiveValue } from "@/hooks/use-responsive-value";
import { MainProps } from "@/types/dashboard-side-bar";
import { classnames } from "@/utils/classnames";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";
import DashboardButton from "./dashboard-button";
import styles from "./dashboard-side-bar.module.css";
import SidebarPageControl from "./sidebar-page-control";

const PAGE_SIZE = 10;

export default function Main({
  dashboards,
  onClick,
  currentPage,
  totalCount,
  onPageChange,
}: MainProps) {
  const router = useRouter();

  const totalPages = useMemo(() => {
    return Math.ceil(totalCount / PAGE_SIZE);
  }, [totalCount]);

  const currentDashboardId = router.query.id ? Number(router.query.id) : null;

  const handleDashboardNavigate = (id: number) => {
    router.push(`/dashboard/${id}`);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const dashboardAddText = useResponsiveValue({
    desktop: Typography.lg2Bold,
    tablet: Typography.lgBold,
    mobile: Typography.mdBold,
  });

  const homeText = useResponsiveValue({
    desktop: Typography.lg2Bold,
    tablet: Typography.lgBold,
    mobile: Typography.lgBold,
  });

  return (
    <div className={styles.main}>
      <button
        onClick={onClick}
        className={classnames(styles.dashboardAdd, styles.button)}
      >
        <span className={dashboardAddText}>대시보드 추가</span>
        <Image
          src={PlusIconNomal}
          width={16}
          height={16}
          alt="대시보드 추가 아이콘"
        />
      </button>
      <Link
        href={"/my-dashboard"}
        className={`${styles.homeButton} ${styles.button}`}
      >
        <Image src={HomeIcon} width={24} height={24} alt="홈 아이콘" />
        <span className={homeText}>홈</span>
      </Link>
      {dashboards && dashboards.length > 0 ? (
        dashboards.map((dashboard) => (
          <DashboardButton
            onClick={() => handleDashboardNavigate(dashboard.id)}
            key={dashboard.id}
            active={currentDashboardId === dashboard.id}
            createdByMe={dashboard.createdByMe}
            color={dashboard.color}
          >
            {dashboard.title}
          </DashboardButton>
        ))
      ) : (
        <div>대시보드가 없습니다.</div>
      )}
      {dashboards.length < 10 ? (
        ""
      ) : (
        <SidebarPageControl
          currentPage={currentPage}
          totalPages={totalPages}
          onPrev={handlePrevPage}
          onNext={handleNextPage}
        />
      )}
    </div>
  );
}
