import { MouseEventHandler, ReactNode } from "react";
import Typography from "../typography";
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
}

const FONT_SIZE: Record<ButtonSize, string> = {
  [ButtonSize.Large]: Typography.lg2SemiBold,
  [ButtonSize.Medium]: Typography.lgSemiBold,
  [ButtonSize.Small]: Typography.lgSemiBold,
  [ButtonSize.XSmall]: Typography.mdSemiBold,
};

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  isWidthFull?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function Button({
  children,
  variant = ButtonVariant.Primary,
  size = ButtonSize.Large,
  disabled,
  isWidthFull,
  onClick,
}: ButtonProps) {
  const disabledStyle = disabled === true ? styles.disabled : "";
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${isWidthFull ? styles.widthFull : ""} ${disabledStyle}`}
      disabled={disabled}
      onClick={onClick}
    >
      <span className={FONT_SIZE[size]}>{children}</span>
    </button>
  );
}
