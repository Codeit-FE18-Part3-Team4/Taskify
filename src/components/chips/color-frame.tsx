import styles from "./color-frame.module.css";
import { CHIP_COLORS, type ChipColor } from "@/constants/chips/chip-colors";
import { colorFrameSize } from "@/constants/common/common-size.enum";
import { ButtonHTMLAttributes } from "react";

interface ColorFrameProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: ChipColor;
  size?: colorFrameSize;
  isSelected?: boolean;
}

export default function ColorFrame({
  color = CHIP_COLORS[0],
  size = colorFrameSize.XSmall,
  isSelected = false,
  ...props
}: ColorFrameProps) {
  const sizeName = colorFrameSize[size].toLowerCase();
  const ColorFrameClasses = `${styles["color_frame"]} ${styles[`${sizeName}`]} ${isSelected ? styles["selected"] : ""}`;

  return (
    <button
      className={ColorFrameClasses}
      style={{ backgroundColor: color }}
      {...props}
    />
  );
}
