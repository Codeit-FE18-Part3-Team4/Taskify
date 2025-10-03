import homeIcon from "@/assets/images/ic-home.svg";
import plusIcon from "@/assets/images/ic-plus.svg";
import Typography from "@/components/typography/typography";
import Image from "next/image";
import { MouseEventHandler, useEffect, useState } from "react";
import { getDashboards } from "./api/dashboard";
import DashboardButton from "./dashboard-button";
import styles from "./dashboard-side-bar.module.css";
import SidebarPageControl from "./sidebar-page-control";

interface DashboardSideBarMainProps {
  dashboardAdd: MouseEventHandler<HTMLButtonElement>;
}

export default function Main({ dashboardAdd }: DashboardSideBarMainProps) {
  const [dashboards, setDashboards] = useState<any[]>([]);
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const { dashboards } = await getDashboards();
        setDashboards(dashboards);
      } catch (e) {
        console.error(e);
      }
    };
    loadData();
  }, []);

  const handleClickActive = (id: number) => {
    setActiveId(id);
  };

  return (
    <div className={styles.main}>
      <button
        className={`${styles.dashboardAdd} ${styles.button}`}
        onClick={dashboardAdd}
      >
        <span>대시보드 추가</span>
        <Image
          src={plusIcon}
          width={16}
          height={16}
          alt="대시보드 추가 아이콘"
        />
      </button>
      <button className={`${styles.homeButton} ${styles.button}`}>
        <Image src={homeIcon} width={24} height={24} alt="홈 아이콘" />
        <span className={Typography.lg2Bold}>홈</span>
      </button>
      {dashboards.map((dashboard) => {
        const randomChip = Math.floor(Math.random() * 7);
        return (
          <DashboardButton
            onClick={() => handleClickActive(dashboard.id)}
            key={dashboard.id}
            active={activeId === dashboard.id}
            createdByMe={dashboard.createdByMe}
            chip={randomChip}
          >
            {dashboard.title}
          </DashboardButton>
        );
      })}
      <SidebarPageControl
        currentPage={1}
        totalPages={5}
        onPrev={() => {}}
        onNext={() => {}}
      />
    </div>
  );
}
