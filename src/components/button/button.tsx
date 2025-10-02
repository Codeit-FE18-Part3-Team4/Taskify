import { MouseEventHandler, ReactNode } from "react";
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

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function Button({
  children,
  variant = ButtonVariant.Primary,
  size = ButtonSize.Auto,
  disabled,
  onClick,
}: ButtonProps) {
  const disabledStyle = disabled === true ? styles.disabled : "";
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${disabledStyle}`}
      disabled={disabled}
      onClick={onClick}
    >
      <span>{children}</span>
    </button>
  );
}
