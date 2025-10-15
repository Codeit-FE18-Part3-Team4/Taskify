import { ProfileRandomColor } from "@/constants/profile-random-color";
import { CSSProperties } from "react";

export const BADGE_COLORS: CSSProperties[] = Object.values(
  ProfileRandomColor,
).map((color) => ({
  color: color.light,
  backgroundColor: color.normal,
}));

export type BadgeColorKey = keyof typeof BADGE_COLORS;
export type BadgeColor = CSSProperties;
