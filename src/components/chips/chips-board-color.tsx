import styles from "./chips-board-color.module.css";
import Image from "next/image";
import {
  BOARD_COLORS,
  type BoardColor,
} from "@/constants/chips/chip-board-colors";

interface BoardColorProps {
  colorKey?: keyof typeof BOARD_COLORS;
}

export default function ColorChips({
  colorKey = BOARD_COLORS["#1458BC"],
}: BoardColorProps) {
  const chipClasses = `${styles["board_color"]}`;

  return (
    <Image
      className={chipClasses}
      src={BOARD_COLORS[colorKey]}
      alt="Board color"
    />
  );
}
