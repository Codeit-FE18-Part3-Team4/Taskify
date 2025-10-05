import styles from "./badge.module.css";
import { BADGE_COLORS } from "@/constants/chips/badge-colors";
import { ProfileColors } from "@/constants/profile/profile-colors";
import typographyStyles from "@/components/typography/typography.module.css";

interface BadgeProps {
  colorIndex?: number;
  title: string;
}

export default function Badge({ colorIndex = 0, title = "" }: BadgeProps) {
  const badgeClasses = `${styles.badge} ${typographyStyles["sm-semibold"]}`;
  const calculateColorIndex = colorIndex % 7;
  const color = ProfileColors[calculateColorIndex];

  return (
    <span className={badgeClasses} style={BADGE_COLORS[color]}>
      {title}
    </span>
  );
}
