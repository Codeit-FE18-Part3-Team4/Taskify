export const COLOR_PICKER_COLORS = [
  "#7AC555",
  "#760DDE",
  "#FFA500",
  "#76A5EA",
  "#E876EA",
] as const;

export type ColorPickerColor = (typeof COLOR_PICKER_COLORS)[number];
