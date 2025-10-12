import styles from "./badge.module.css";
import { BADGE_COLORS } from "@/components/chips/badge/badge-colors";
import typographyStyles from "@/components/typography/typography.module.css";

interface BadgeProps {
  colorIndex?: number;
  title: string;
}

export default function Badge({ colorIndex = 0, title = "" }: BadgeProps) {
  const badgeClasses = `${styles.badge} ${typographyStyles["sm-semibold"]}`;
  const calculateColorIndex = colorIndex % BADGE_COLORS.length;

  return (
    <span className={badgeClasses} style={BADGE_COLORS[calculateColorIndex]}>
      {title}
    </span>
  );
}
