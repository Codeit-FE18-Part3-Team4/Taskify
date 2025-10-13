import styles from "./badge.module.css";
import { BADGE_COLORS } from "@/components/chips/badge/badge-colors";
import typographyStyles from "@/components/typography/typography.module.css";
import { getColorIndex } from "@/utils/string-converter";
import { useMemo } from "react";

interface BadgeProps {
  title: string;
}

export default function Badge({ title }: BadgeProps) {
  const badgeClasses = `${styles.badge} ${typographyStyles["sm-semibold"]}`;

  const trimmedTitle = title.trim();
  if (!trimmedTitle) return null;

  const calculateColorIndex = useMemo(() => {
    return getColorIndex(title, BADGE_COLORS.length);
  }, [title]);

  return (
    <span className={badgeClasses} style={BADGE_COLORS[calculateColorIndex]}>
      {title}
    </span>
  );
}
