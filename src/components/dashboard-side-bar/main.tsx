import homeIcon from "@/assets/images/ic-home.svg";
import plusIcon from "@/assets/images/ic-plus.svg";
import Typography from "@/components/typography/typography";
import Image from "next/image";
import { MouseEventHandler, useState } from "react";
import styles from "./dashboard-side-bar.module.css";
import DashboardButton from "./dashboard-button";
import SidebarPageControl from "./sidebar-page-control";

interface DashboardSideBarMainProps {
  dashboardAdd: MouseEventHandler<HTMLButtonElement>;
}

const mockData = [
  {
    id: 0,
    title: "포트폴리오",
    color: "string",
    createdAt: "2025-10-02T07:01:00.800Z",
    updatedAt: "2025-10-02T07:01:00.800Z",
    createdByMe: true,
    userId: 0,
  },
  {
    id: 1,
    title: "코드잇",
    color: "string",
    createdAt: "2025-10-02T07:01:00.800Z",
    updatedAt: "2025-10-02T07:01:00.800Z",
    createdByMe: false,
    userId: 0,
  },
  {
    id: 2,
    title: "3분기 계획",
    color: "string",
    createdAt: "2025-10-02T07:01:00.800Z",
    updatedAt: "2025-10-02T07:01:00.800Z",
    createdByMe: false,
    userId: 0,
  },
  {
    id: 3,
    title: "회의록",
    color: "string",
    createdAt: "2025-10-02T07:01:00.800Z",
    updatedAt: "2025-10-02T07:01:00.800Z",
    createdByMe: true,
    userId: 0,
  },
  {
    id: 4,
    title: "중요 문서함",
    color: "string",
    createdAt: "2025-10-02T07:01:00.800Z",
    updatedAt: "2025-10-02T07:01:00.800Z",
    createdByMe: false,
    userId: 0,
  },
  {
    id: 5,
    title: "포트폴리오",
    color: "string",
    createdAt: "2025-10-02T07:01:00.800Z",
    updatedAt: "2025-10-02T07:01:00.800Z",
    createdByMe: false,
    userId: 0,
  },
  {
    id: 6,
    title: "3분기 계획",
    color: "string",
    createdAt: "2025-10-02T07:01:00.800Z",
    updatedAt: "2025-10-02T07:01:00.800Z",
    createdByMe: false,
    userId: 0,
  },
  {
    id: 7,
    title: "코드잇",
    color: "string",
    createdAt: "2025-10-02T07:01:00.800Z",
    updatedAt: "2025-10-02T07:01:00.800Z",
    createdByMe: false,
    userId: 0,
  },
  {
    id: 8,
    title: "호의록",
    color: "string",
    createdAt: "2025-10-02T07:01:00.800Z",
    updatedAt: "2025-10-02T07:01:00.800Z",
    createdByMe: false,
    userId: 0,
  },
  {
    id: 9,
    title: "중요 문서함",
    color: "string",
    createdAt: "2025-10-02T07:01:00.800Z",
    updatedAt: "2025-10-02T07:01:00.800Z",
    createdByMe: false,
    userId: 0,
  },
  {
    id: 10,
    title: "포트 폴리오",
    color: "string",
    createdAt: "2025-10-02T07:01:00.800Z",
    updatedAt: "2025-10-02T07:01:00.800Z",
    createdByMe: true,
    userId: 0,
  },
  {
    id: 11,
    title: "회의록",
    color: "string",
    createdAt: "2025-10-02T07:01:00.800Z",
    updatedAt: "2025-10-02T07:01:00.800Z",
    createdByMe: true,
    userId: 0,
  },
  {
    id: 12,
    title: "회의록",
    color: "string",
    createdAt: "2025-10-02T07:01:00.800Z",
    updatedAt: "2025-10-02T07:01:00.800Z",
    createdByMe: true,
    userId: 0,
  },
  {
    id: 13,
    title: "회의록",
    color: "string",
    createdAt: "2025-10-02T07:01:00.800Z",
    updatedAt: "2025-10-02T07:01:00.800Z",
    createdByMe: true,
    userId: 0,
  },
] as const;

export default function Main({ dashboardAdd }: DashboardSideBarMainProps) {
  const [activeId, setActiveId] = useState<number | null>(null);

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
      {mockData.map((button) => (
        <DashboardButton
          onClick={() => handleClickActive(button.id)}
          key={button.id}
          active={activeId === button.id}
          createdByMe={button.createdByMe}
        >
          {button.title}
        </DashboardButton>
      ))}
      <SidebarPageControl onPrev={() => { }} onNext={() => { }}/>
    </div>
  );
}
