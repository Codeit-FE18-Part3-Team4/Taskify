import CrownIcon from "@/assets/images/ic-crown.svg";
import ColorChip from "@/components/chips/chip-color/chips-color";
import Typography from "@/components/typography";
import { CommonSize } from "@/constants/common/common-size";
import { useResponsiveValue } from "@/hooks/use-responsive-value";
import Image from "next/image";
import { MouseEventHandler, ReactNode } from "react";
import styles from "./dashboard-side-bar.module.css";
import { classnames } from "@/utils/classnames";

interface DashboardButtonProps {
  children: ReactNode;
  createdByMe: boolean;
  active: boolean;
  color: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function DashboardButton({
  children,
  createdByMe,
  active,
  color,
  onClick,
}: DashboardButtonProps) {
  const activeButton = active === true ? styles.active : "";

  const buttonText = useResponsiveValue({
    desktop: Typography.lg2Bold,
    tablet: Typography.lgBold,
    mobile: Typography.lgBold,
  })

  const colorChipSize = useResponsiveValue({
    desktop: CommonSize.Medium,
    tablet: CommonSize.Small,
    mobile: CommonSize.Small,
  })

  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${styles.dashboardButton} ${activeButton}`}
    >
      <ColorChip size={colorChipSize} color={color} />
      <span
        className={classnames(buttonText, styles.buttonText)}
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
