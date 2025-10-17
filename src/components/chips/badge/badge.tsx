import { BADGE_COLORS } from "@/components/chips/badge/badge-colors";
import Typography from "@/components/typography";
import { colorFromString } from "@/utils/string-hashing";
import { CSSProperties, useMemo } from "react";
import styles from "./badge.module.css";

interface BadgeProps {
  title: string;
}

export default function Badge({ title }: BadgeProps) {
  const badgeClasses = `${styles.badge} ${Typography.smSemiBold}`;

  const colorStyle = useMemo(() => {
    return colorFromString(title, BADGE_COLORS) as CSSProperties;
  }, [title]);

  const trimmedTitle = title.trim();
  if (!trimmedTitle) return null;

  return (
    <span className={badgeClasses} style={colorStyle}>
      {trimmedTitle}
    </span>
  );
}
