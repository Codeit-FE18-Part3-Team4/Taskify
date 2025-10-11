import styles from "./badge.module.css";
import { BADGE_COLORS } from "@/components/chips/badge/badge-colors";
import typographyStyles from "@/components/typography/typography.module.css";
import { useMemo } from "react";

interface BadgeProps {
  colorIndex?: number;
  title: string;
}

export default function Badge({ colorIndex = 0, title }: BadgeProps) {
  const badgeClasses = `${styles.badge} ${typographyStyles["sm-semibold"]}`;

  const trimmedTitle = title.trim();
  if (!trimmedTitle) return null;

  const calculateColorIndex = useMemo(() => {
    if (colorIndex !== undefined) {
      return colorIndex % BADGE_COLORS.length;
    }

    const hash = title.split("").reduce((acc, char, index) => {
      return acc + char.charCodeAt(0) * (index + 1);
    }, 0);
    return hash % BADGE_COLORS.length;
  }, [colorIndex, title]);

  return (
    <span className={badgeClasses} style={BADGE_COLORS[calculateColorIndex]}>
      {title}
    </span>
  );
}
