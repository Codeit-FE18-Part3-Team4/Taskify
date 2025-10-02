import styles from "./chips-color.module.css";
import ColorChipSvg from "./chip-color-svg";
import { CHIP_COLORS, type ChipColor } from "@/constants/chips/chip-colors";
import { CommonSize } from "@/constants/common/common-size.enum";

interface ChipColorProps {
  color?: ChipColor;
  size?: CommonSize;
}

export default function ColorChip({
  color = CHIP_COLORS[0],
  size = CommonSize.small,
}: ChipColorProps) {
  const sizeName = CommonSize[size];
  const chipClasses = `${styles[`color_chip_${sizeName}`]} color-chip`;

  return <ColorChipSvg className={chipClasses} color={color} />;
}
