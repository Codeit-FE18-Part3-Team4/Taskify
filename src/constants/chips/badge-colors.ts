import { ProfileColor } from "../profile/profile-colors";

export const BADGE_COLORS = {
  [ProfileColor.Green]: {
    color: "#BAF3DB",
    backgroundColor: "#206E4E",
  },
  [ProfileColor.Violet]: {
    color: "#EED7FC",
    backgroundColor: "#593EA5",
  },
  [ProfileColor.Cyan]: {
    color: "#CFE1FD",
    backgroundColor: "#1F6A83",
  },
  [ProfileColor.Rose]: {
    color: "#FFD7D1",
    backgroundColor: "#AE2E24",
  },
  [ProfileColor.CobaltBlue]: {
    color: "#CFE1FD",
    backgroundColor: "#1458BC",
  },
  [ProfileColor.Yellow]: {
    color: "#FFF2C0",
    backgroundColor: "#BD8C00",
  },
  [ProfileColor.Orange]: {
    color: "#FFE4C0",
    backgroundColor: "#9F4B00",
  },
} as const;

export type BadgeColor = (typeof BADGE_COLORS)[keyof typeof BADGE_COLORS];
