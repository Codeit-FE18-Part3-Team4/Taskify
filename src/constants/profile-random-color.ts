export const ProfileRandomColor = {
  Green: {
    normal: "var(--color-green)",
    light: "#BAF3DB",
  },
  Violet: {
    normal: "var(--color-violet)",
    light: "#EED7FC",
  },
  Cyan: {
    normal: "var(--color-cyan)",
    light: "#CFE1FD",
  },
  Rose: {
    normal: "var(--color-rose)",
    light: "#FFD7D1",
  },
  CobaltBlue: {
    normal: "var(--color-cobaltBlue)",
    light: "#CFE1FD",
  },
  Yellow: {
    normal: "var(--color-yellow)",
    light: "#FFF2C0",
  },
  Orange: {
    normal: "var(--color-orange)",
    light: "#FFE4C0",
  },
};

export const ProfileColorsArray = Object.values(ProfileRandomColor).map(
  (color) => color.normal
);

export const RemainProfileColor = {
  backgroundColor: "var(--color-blue)",
};
