export const CARD_COLORS = {
  0: {
    color: "#D58D49",
    backgroundColor: "#F9EEE3",
  },
  1: {
    color: "#86D549",
    backgroundColor: "#E7F7DB",
  },
  2: {
    color: "#D549B6",
    backgroundColor: "#F7DBF0",
  },
  3: {
    color: "#4981D5",
    backgroundColor: "#DBE6F7",
  },
} as const;

export type CardColor = (typeof CARD_COLORS)[keyof typeof CARD_COLORS];
