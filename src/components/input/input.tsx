import styles from "./input.module.css";
import { ReactNode, ChangeEvent, FocusEvent, useState } from "react";
import Typography from "@/components/typography/typography";
import SearchIcon from "@/components/input/search-icon-svg";

export enum InputVariant {
  Default = "default",
  Search = "searchInput",
}

export enum InputSize {
  Large = "lg",
  Medium = "md",
  Auto = "auto",
}

interface InputProps {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  className?: string;
  errorMessage?: string;
  size?: InputSize;
  icon?: ReactNode;
  variant?: InputVariant;
}

export default function Input({
  value,
  onChange,
  onBlur,
  placeholder,
  type = "text",
  className,
  errorMessage,
  size = InputSize.Large,
  icon,
  disabled,
  variant = InputVariant.Default,
}: InputProps) {
  const iconSize = `${size}Icon`;
  const hasError = !disabled && Boolean(errorMessage);
  icon = variant === InputVariant.Search ? <SearchIcon /> : null;
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.field} ${isFocused ? styles.focused : ""}`}>
        {icon && (
          <span className={`${styles.icon} ${styles[iconSize]}`}>{icon}</span>
        )}
        <input
          value={value}
          onChange={onChange}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          onFocus={() => setIsFocused(true)}
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
