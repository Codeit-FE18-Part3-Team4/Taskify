import styles from "./input.module.css";
import {
  ReactNode,
  useState,
  InputHTMLAttributes,
  FocusEvent as ReactFocusEvent,
} from "react";
import Typography from "@/components/typography/typography";
import SearchIcon from "@/components/input/search-icon-svg";

export enum InputVariant {
  Default = "default",
  Search = "searchInput",
  Password = "password",
}

export enum InputSize {
  Large = "lg",
  Medium = "md",
  Auto = "auto",
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  size?: InputSize;
  icon?: ReactNode;
  variant?: InputVariant;
}

export default function Input({
  value,
  onChange,
  onBlur,
  onFocus,
  placeholder,
  type = "text",
  className,
  errorMessage,
  size = InputSize.Large,
  icon,
  disabled,
  variant = InputVariant.Default,
  ...props
}: InputProps) {
  const hasError = !disabled && Boolean(errorMessage);
  const [isFocused, setIsFocused] = useState(false);
  const iconSize = `${size}Icon`;
  icon = variant === InputVariant.Search ? <SearchIcon /> : null;

  const handleBlur = (e: ReactFocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const handleFocus = (e: ReactFocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.field} ${isFocused ? styles.focused : ""}`}>
        {icon && (
          <span className={`${styles.icon} ${styles[iconSize]}`}>{icon}</span>
        )}
        <input
          value={value}
          onChange={onChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
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
          {...props}
        />
      </div>
      {hasError && <p className={styles.errorMessage}>{errorMessage}</p>}
    </div>
  );
}
