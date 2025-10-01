export const COMMONSIZE = {
  Small: "small",
  Large: "large",
} as const;

export type CommonSize = (typeof COMMONSIZE)[keyof typeof COMMONSIZE];
