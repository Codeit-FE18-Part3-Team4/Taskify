import colorBlue from "@/assets/chips/color-blue.svg";
import colorGreen from "@/assets/chips/color-green.svg";
import colorOrange from "@/assets/chips/color-orange.svg";
import colorRed from "@/assets/chips/color-red.svg";
import colorYellow from "@/assets/chips/color-yellow.svg";

export const BOARD_COLORS = {
  "#AE2E24": colorRed,
  "#9F4B00": colorOrange,
  "#BD8C00": colorYellow,
  "#206E4E": colorGreen,
  "#1458BC": colorBlue,
} as const;

export type BoardColor = (typeof BOARD_COLORS)[keyof typeof BOARD_COLORS];
