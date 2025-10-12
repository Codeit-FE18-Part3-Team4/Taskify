export const CHIP_COLORS = [
  "#206E4E",
  "#593EA5",
  "#1F6A83",
  "#AE2E24",
  "#1458BC",
  "#BD8C00",
  "#9F4B00",
] as const;

export type ChipColor = (typeof CHIP_COLORS)[number];
