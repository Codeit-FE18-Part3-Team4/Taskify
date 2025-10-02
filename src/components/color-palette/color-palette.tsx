import React, { useState } from "react";
import styles from "./color-palette.module.css";
import ColorFrame from "@/components/chips/color-frame";
import { colorFrameSize } from "@/constants/common/common-size.enum";
import { CHIP_COLORS } from "@/constants/chips/chip-colors";

interface ColorPaletteProps {
  selectedColor?: string | null;
  onSelect: (color: string | null) => void;
  size?: colorFrameSize;
}

export default function ColorPalette({
  selectedColor,
  onSelect,
  size = colorFrameSize.XSmall,
}: ColorPaletteProps) {
  const handleClick = (color: string) => {
    onSelect(selectedColor === color ? null : color);
  };
  const colorFrameClasses = `${styles["pallete_container"]} ${styles[size]}`;

  return (
    <div className={colorFrameClasses}>
      {Object.values(CHIP_COLORS).map((color) => (
        <ColorFrame
          key={color}
          color={color}
          isSelected={selectedColor === color}
          onClick={() => handleClick(color)}
          size={size}
        />
      ))}
    </div>
  );
}
