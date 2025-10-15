import homeIcon from "@/assets/images/ic-home.svg";
import plusIcon from "@/assets/images/ic-plus.svg";
import Typography from "@/components/typography";
import { useResponsiveValue } from "@/hooks/use-responsive-value";
import { classnames } from "@/utils/classnames";
import Image from "next/image";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import DashboardButton from "./dashboard-button";
import styles from "./dashboard-side-bar.module.css";
import SidebarPageControl from "./sidebar-page-control";
import { Dashboard } from "@/pages/my-dashboard";

interface MainProps {
  dashboards: Dashboard[];
  onClick: () => void;
}

const PAGE_SIZE = 10;

export default function Main({ dashboards, onClick }: MainProps) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(0);

  const totalPages = useMemo(() => {
    return Math.ceil(dashboards.length / PAGE_SIZE);
  }, [dashboards]);

  const currentDashboards = useMemo(() => {
    const start = currentPage * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return dashboards.slice(start, end);
  }, [dashboards, currentPage]);

  const currentDashboardId = router.query.id ? Number(router.query.id) : null;

  const handleDashboardNavigate = (id: number) => {
    router.push(`/dashboard/${id}`);
  };

  const handlePrevPage = () => {
    if (currentPage > 0) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage((prev) => prev + 1);
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
          src={plusIcon}
          width={16}
          height={16}
          alt="대시보드 추가 아이콘"
        />
      </button>
      <button className={`${styles.homeButton} ${styles.button}`}>
        <Image src={homeIcon} width={24} height={24} alt="홈 아이콘" />
        <span className={homeText}>홈</span>
      </button>
      {currentDashboards.map((dashboard) => {
        return (
          <DashboardButton
            onClick={() => handleDashboardNavigate(dashboard.id)}
            key={dashboard.id}
            active={currentDashboardId === dashboard.id}
            createdByMe={dashboard.createdByMe}
            color={dashboard.color}
          >
            {dashboard.title}
          </DashboardButton>
        );
      })}
      <SidebarPageControl
        currentPage={currentPage}
        totalPages={totalPages}
        onPrev={handlePrevPage}
        onNext={handleNextPage}
      />
    </div>
  );
}
