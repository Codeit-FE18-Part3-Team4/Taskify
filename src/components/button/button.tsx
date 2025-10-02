import { MouseEventHandler, ReactNode } from "react";
import Typography from "../typography/typography";
import styles from "./button.module.css";

export enum ButtonVariant {
  Primary = "primary",
  Secondary = "secondary",
  Delete = "delete",
}

export enum ButtonSize {
  Large = "lg",
  Medium = "md",
  Small = "sm",
  XSmall = "xs",
  Auto = "auto",
}

export const ButtonFontSize = {
  lg2SemiBold: Typography.lg2SemiBold,
  lgSemiBold: Typography.lgSemiBold,
  mdSemiBold: Typography.mdSemiBold
} as const;

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fontSize?: typeof ButtonFontSize[keyof typeof ButtonFontSize];
  disabled?: boolean;
  isWidthFull?: boolean;
  isHeightFull?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function Button({
  children,
  variant = ButtonVariant.Primary,
  size = ButtonSize.Auto,
  fontSize = ButtonFontSize.lg2SemiBold,
  disabled,
  isWidthFull,
  isHeightFull,
  onClick,
}: ButtonProps) {
  const disabledStyle = disabled === true ? styles.disabled : "";
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${fontSize} ${isWidthFull ? styles.widthFull : ""} ${isHeightFull ? styles.heightFull : ""} ${disabledStyle}`}
      disabled={disabled}
      onClick={onClick}
    >
      <span>{children}</span>
    </button>
  );
}
