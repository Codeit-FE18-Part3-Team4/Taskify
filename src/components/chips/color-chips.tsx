import styles from "./chips.module.css";
import {
  COLOR_PICKER_COLORS,
  ColorPickerColor,
} from "../../constants/chips/chip-color-picker";
import Image from "next/image";
import checkImage from "../../assets/color_check.svg";

interface ColorPickerProps {
  size?: "small" | "large";
  color?: ColorPickerColor;
  colorIndex?: number;
  isSelected?: boolean;
  onClick?: (color: ColorPickerColor) => void;
}

export default function ColorChips({
  size = "small",
  color,
  colorIndex = 0,
  isSelected = false,
  onClick,
}: ColorPickerProps) {
  const chipClasses = `${styles["colorPicker"]} ${styles[`cp_${size}`]}`;
  const backgroundColor = color || COLOR_PICKER_COLORS[colorIndex];

  return (
    <span
      className={chipClasses}
      style={{ backgroundColor }}
      onClick={() => onClick?.(backgroundColor)}
    >
      {isSelected && (
        <Image
          src={checkImage}
          alt="selected"
          className={styles[`checkIcon_${size}`]}
        />
      )}
    </span>
  );
}
