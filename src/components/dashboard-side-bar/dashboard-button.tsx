import CrownIcon from "@/assets/images/ic-crown.svg";
import Typography from "@/components/typography";
import { CHIP_COLORS } from "@/components/chips/chip-color/chip-colors";
import { CommonSize } from "@/constants/common/common-size";
import Image from "next/image";
import { MouseEventHandler, ReactNode } from "react";
import ColorChip from "@/components/chips/chip-color/chips-color";
import styles from "./dashboard-side-bar.module.css";
import { useResponsiveValue } from "@/hooks/use-responsive-value";

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

  const buttonText = useResponsiveValue({
    desktop: Typography.lg2Bold,
    tablet: Typography.lgBold,
    mobile: Typography.lgBold,
  })

  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${styles.dashboardButton} ${activeButton}`}
    >
      <ColorChip size={CommonSize.Small} color={CHIP_COLORS[randomChip]} />
      <span
        className={buttonText}
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
