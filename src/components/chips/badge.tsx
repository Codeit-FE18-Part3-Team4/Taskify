import styles from "./badge.module.css";
import { BADGE_COLORS } from "@/constants/chips/badge-colors";
import { ProfileColor } from "@/constants/chips/profile-colors";
import typographyStyles from "@/components/typography/typography.module.css";

interface BadgeProps {
  colorIndex?: ProfileColor;
  title: string;
}

export default function Badge({ colorIndex = 0, title = "" }: BadgeProps) {
  const badgeClasses = `${styles.badge} ${typographyStyles["sm-semibold"]}`;
  const calculateColor = (colorIndex % 7) as ProfileColor;

  return (
    <span className={badgeClasses} style={BADGE_COLORS[calculateColor]}>
      {title}
    </span>
  );
}
