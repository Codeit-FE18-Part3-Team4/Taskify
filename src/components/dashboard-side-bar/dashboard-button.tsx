import CrownIcon from "@/assets/images/ic-crown.svg";
import Typography from "@/components/typography/typography";
import Image from "next/image";
import { MouseEventHandler, ReactNode } from "react";
import styles from "./dashboard-side-bar.module.css";

interface DashboardButtonProps {
  children: ReactNode;
  createdByMe: boolean;
  active: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function DashboardButton({
  children,
  createdByMe,
  active,
  onClick,
}: DashboardButtonProps) {
  const activeButton = active === true ? styles.active : "";

  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${styles.dashboardButton} ${activeButton}`}
    >
      <Image src={"/"} width={24} height={24} alt="태그 아이콘" />
      <span
        className={`${active === true ? Typography.lg2Bold : Typography.lg2Medium}`}
      >
        {children}
      </span>
      {createdByMe && (
        <Image
          className={styles.crownIcon}
          src={CrownIcon}
          width={20}
          height={20}
          alt="내 대시보드 아이콘"
        />
      )}
    </button>
  );
}
