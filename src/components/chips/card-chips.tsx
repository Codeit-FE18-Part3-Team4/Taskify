import styles from "./chips.module.css";
import { CARD_COLORS, CardColor } from "../../constants/chips/chip-card-color";

interface CardChipsProps {
  size?: "small" | "large";
  color?: keyof typeof CARD_COLORS;
  tagName: string;
}

export default function CardChips({
  size = "small",
  color = 0,
  tagName = "",
}: CardChipsProps) {
  const chipClasses = `${styles["card"]} ${styles[`cd_${size}`]}`;

  return (
    <span className={chipClasses} style={CARD_COLORS[color]}>
      {tagName}
    </span>
  );
}
