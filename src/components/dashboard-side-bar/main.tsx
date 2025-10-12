import homeIcon from "@/assets/images/ic-home.svg";
import plusIcon from "@/assets/images/ic-plus.svg";
import Typography from "@/components/typography";
import { useResponsiveValue } from "@/hooks/use-responsive-value";
import { classnames } from "@/utils/classnames";
import Image from "next/image";
import { useState } from "react";
import DashboardButton from "./dashboard-button";
import styles from "./dashboard-side-bar.module.css";
import SidebarPageControl from "./sidebar-page-control";

type MainProps = {
  dashboards: any[];
};

export default function Main({ dashboards }: MainProps) {
  const [activeId, setActiveId] = useState<number | null>(null);

  const handleClickActive = (id: number) => {
    setActiveId(id);
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
  })

  return (
    <div className={styles.main}>
      <button className={classnames(styles.dashboardAdd, styles.button)}>
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
      {dashboards.map((dashboard) => {
        return (
          <DashboardButton
            onClick={() => handleClickActive(dashboard.id)}
            key={dashboard.id}
            active={activeId === dashboard.id}
            createdByMe={dashboard.createdByMe}
          >
            {dashboard.title}
          </DashboardButton>
        );
      })}
      <SidebarPageControl
        currentPage={0}
        totalPages={2}
        onPrev={() => {}}
        onNext={() => {}}
      />
    </div>
  );
}
