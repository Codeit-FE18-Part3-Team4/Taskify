import { CHIP_COLORS } from "@/components/chips/chip-color/chip-colors";
import ColorFrame from "@/components/chips/color-frame/color-frame";
import { ColorFrameSize } from "@/components/chips/color-frame/color-frame-size";
import styles from "./color-palette.module.css";

interface ColorPaletteProps {
  selectedColor?: string | null;
  onSelect: (color: string) => void;
  size?: ColorFrameSize;
}

export default function ColorPalette({
  selectedColor,
  onSelect,
  size = ColorFrameSize.XSmall,
}: ColorPaletteProps) {
  const colorFrameClasses = `${styles.palleteContainer} ${styles[size]}`;

  const handleClick = (color: string) => {
    if (selectedColor === color) return;
    onSelect(color);
  };

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
