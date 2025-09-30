import styles from "./chips.module.css";
import {
  COLOR_PICKER_COLORS,
  ColorPickerColor,
} from "../../constants/chips/chip-color-picker";

interface ColorPickerProps {
  size?: "small" | "large";
  color?: ColorPickerColor;
}

export default function ColorChips({
  size = "small",
  color = COLOR_PICKER_COLORS[0],
}: ColorPickerProps) {
  const chipClasses = `${styles["colorPicker"]} ${styles[`cp_${size}`]}`;

  return <span className={chipClasses} style={{ backgroundColor: color }} />;
}
