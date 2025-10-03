import styles from "./input.module.css";
import { ReactNode, ChangeEvent, CSSProperties } from "react";
import Typography from "@/components/typography/typography";

export enum InputSize {
  Large = "lg",
  Medium = "md",
  Auto = "auto",
}

export type InputProps = {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  className?: string;
  errorMessage?: string;
  size?: InputSize;
  icon?: ReactNode;
};

export default function Input({
  value,
  onChange,
  placeholder,
  type = "text",
  className,
  errorMessage,
  size = InputSize.Large,
  icon,
  disabled,
}: InputProps) {
  const iconSize = size === InputSize.Large ? 20 : 18;
  const iconStyle = { "--icon-size": `${iconSize}px` } as CSSProperties;

  const hasError = !disabled && Boolean(errorMessage);

  return (
    <div className={styles.wrapper}>
      <div className={styles.field}>
        {icon && (
          <span className={`${styles.icon}`} style={iconStyle}>
            {icon}
          </span>
        )}
        <input
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
          disabled={disabled}
          className={`
        ${styles.input}
        ${hasError ? styles.error : ""}
        ${styles[size]}
        ${icon ? styles.withIcon : styles.withoutIcon}
        ${Typography.lgMedium}
        ${className ?? ""}`}
        />
      </div>
      {hasError && <p className={styles.errorMessage}>{errorMessage}</p>}
    </div>
  );
}
