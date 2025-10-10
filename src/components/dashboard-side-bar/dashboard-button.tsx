import CrownIcon from "@/assets/images/ic-crown.svg";
import Typography from "@/components/typography/typography";
import { CHIP_COLORS } from "@/components/chips/chip-color/chip-colors";
import { CommonSize } from "@/constants/common/common-size";
import Image from "next/image";
import { MouseEventHandler, ReactNode } from "react";
import ColorChip from "@/components/chips/chip-color/chips-color";
import styles from "./dashboard-side-bar.module.css";

interface DashboardButtonProps {
  children: ReactNode;
  createdByMe: boolean;
  active: boolean;
  chip?: number;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function DashboardButton({
  children,
  createdByMe,
  active,
  chip,
  onClick,
}: DashboardButtonProps) {
  const activeButton = active === true ? styles.active : "";
  const randomChip = Math.floor(Math.random() * 7);

  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${styles.dashboardButton} ${activeButton}`}
    >
      <ColorChip size={CommonSize.Small} color={CHIP_COLORS[randomChip]} />
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
