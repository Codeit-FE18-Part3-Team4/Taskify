import styles from "./input.module.css";
import { ReactNode, ChangeEvent, CSSProperties } from "react";
import Typography from "@/components/typography/typography";

export enum InputVariant {
  Normal = "normal",
  Active = "active",
  Disabled = "disabled",
  Completed = "completed",
  Error = "error",
}

export enum InputSize {
  Large = "lg",
  Medium = "md",
  Auto = "auto",
}

type InputProps = {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  className?: string;
  errorMessage?: string;
  variant?: InputVariant;
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
  variant = InputVariant.Normal,
  size = InputSize.Large,
  icon,
}: InputProps) {
  const iconSize = size === InputSize.Large ? 20 : 18;
  const iconStyle = { "--icon-size": `${iconSize}px` } as CSSProperties;

  return (
    <div className={styles.wrapper}>
      <div className={styles.field}>
        {icon && (
          <span
            className={`${styles.icon} ${styles[`icon_${variant}`]}`}
            style={iconStyle}
          >
            {icon}
          </span>
        )}
        <input
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
          className={`
        ${styles.input}
        ${styles[variant]}
        ${styles[size]}
        ${icon ? styles.withIcon : styles.withoutIcon}
        ${Typography.lgMedium}
        ${className ?? ""}`}
        />
      </div>

      {variant === InputVariant.Error && errorMessage && (
        <p className={`${styles.errorMessage} ${Typography.mdMedium}`}>
          {errorMessage}
        </p>
      )}
    </div>
  );
}
