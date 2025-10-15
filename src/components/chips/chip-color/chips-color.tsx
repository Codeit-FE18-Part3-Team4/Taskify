import { CHIP_COLORS } from "@/components/chips/chip-color/chip-colors";
import { CommonSize } from "@/constants/common/common-size";

interface ChipColorProps {
  color?: string;
  size?: CommonSize;
}

export default function ColorChip({
  color = CHIP_COLORS[0],
  size = CommonSize.Small,
}: ChipColorProps) {
  const sizeName = CommonSize[size].toLowerCase();
  const chipClasses = `${styles[`color_chip_${sizeName}`]} color-chip`;

  return <ColorChipSvg className={chipClasses} color={color} />;
}
