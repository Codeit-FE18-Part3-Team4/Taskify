import styles from "./badge.module.css";
import { BADGE_COLORS } from "@/components/chips/badge/badge-colors";
import typographyStyles from "@/components/typography/typography.module.css";
import { colorFromString } from "@/utils/string-hashing";
import { CSSProperties, useMemo } from "react";

interface BadgeProps {
  title: string;
}

export default function Badge({ title }: BadgeProps) {
  const badgeClasses = `${styles.badge} ${typographyStyles["sm-semibold"]}`;

  const trimmedTitle = title.trim();
  if (!trimmedTitle) return null;

  const colorStyle = useMemo(() => {
    return colorFromString(title, BADGE_COLORS) as CSSProperties;
  }, [title]);

  return (
    <span className={badgeClasses} style={colorStyle}>
      {title}
    </span>
  );
}
