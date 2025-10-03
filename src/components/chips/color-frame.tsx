import styles from "./color-frame.module.css";
import { CHIP_COLORS, type ChipColor } from "@/constants/chips/chip-colors";
import { ColorFrameSize } from "@/constants/common/common-size";
import { ButtonHTMLAttributes } from "react";

interface ColorFrameProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: ChipColor;
  size?: ColorFrameSize;
  isSelected?: boolean;
}

export default function ColorFrame({
  color = CHIP_COLORS[0],
  size = ColorFrameSize.XSmall,
  isSelected = false,
  ...props
}: ColorFrameProps) {
  const ColorFrameClasses = `${styles.colorFrame} ${styles[size]} ${isSelected ? styles.selected : ""}`;

  return (
    <button
      className={ColorFrameClasses}
      style={{ backgroundColor: color }}
      {...props}
    />
  );
}
