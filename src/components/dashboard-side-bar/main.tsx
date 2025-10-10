import homeIcon from "@/assets/images/ic-home.svg";
import plusIcon from "@/assets/images/ic-plus.svg";
import Typography from "@/components/typography";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getDashboards } from "./api/dashboard";
import DashboardButton from "./dashboard-button";
import styles from "./dashboard-side-bar.module.css";
import SidebarPageControl from "./sidebar-page-control";

export default function Main() {
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
      <button className={`${styles.dashboardAdd} ${styles.button}`}>
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
