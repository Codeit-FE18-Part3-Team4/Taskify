import styles from "./chips-badge.module.css";
import { BADGE_COLORS } from "@/constants/chips/chip-badge-colors";
import { ProfileColor } from "@/constants/chips/profile-colors.enum";
import {
  COMMONSIZE,
  type CommonSize,
} from "../../constants/common/common-size";

interface BadgeChipProps {
  size?: CommonSize;
  colorIndex?: ProfileColor;
  tagName: string;
}

export default function BadgeChip({
  size = COMMONSIZE.Small,
  colorIndex = 0,
  tagName = "",
}: BadgeChipProps) {
  const chipClasses = `${styles["badge"]} ${styles[`badge_${size}`]}`;
  const calculateColor = (colorIndex % 7) as ProfileColor;

  return (
    <span className={chipClasses} style={BADGE_COLORS[calculateColor]}>
      {tagName}
    </span>
  );
}
