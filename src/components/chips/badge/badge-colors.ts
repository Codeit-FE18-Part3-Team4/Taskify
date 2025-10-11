import { ProfileRandomColor } from "@/constants/profile-random-color";

export const BADGE_COLORS = Object.values(ProfileRandomColor).map((color) => ({
  color: color.light,
  backgroundColor: color.normal,
}));

export type BadgeColorKey = keyof typeof BADGE_COLORS;
export type BadgeColor = (typeof BADGE_COLORS)[BadgeColorKey];
