import styles from "./input.module.css";
import {
  ReactNode,
  useState,
  InputHTMLAttributes,
  FocusEvent as ReactFocusEvent,
  useMemo,
} from "react";
import Typography from "@/components/typography/typography";
import SearchIcon from "@/components/input/SearchIcon";
import VisibilityNowOnIcon from "./VisibilityOnIcon";
import VisibilityNowOffIcon from "./VisibilityOffIcon";
import { classnames } from "@/utils/classnames";

export enum InputVariant {
  Default = "default",
  Search = "search",
  Password = "password",
}

export enum InputSize {
  Large = "lg",
  Medium = "md",
  Auto = "auto",
}

export type IconPosition = "left" | "right";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  size?: InputSize;
  icon?: ReactNode;
  variant?: InputVariant;
  iconPosition?: IconPosition;
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
  iconPosition,
  ...props
}: InputProps) {
  const hasError = !disabled && Boolean(errorMessage);
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const iconSize = `${size}Icon`;
  const resolvedIcon = useMemo(() => {
    switch (variant) {
      case InputVariant.Search:
        return <SearchIcon />;
      case InputVariant.Password:
        return (
          <button
            type="button"
            className={styles.eyeBtn}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <VisibilityNowOnIcon /> : <VisibilityNowOffIcon />}
          </button>
        );
      default:
        return null;
    }
  }, [variant, showPassword]);

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
      <div
        className={classnames(styles.field, isFocused ? styles.focused : "")}
      >
        {variant === InputVariant.Search && (
          <span
            className={classnames(
              styles.icon,
              styles.leftIcon,
              styles[iconSize]
            )}
          >
            {resolvedIcon}
          </span>
        )}
        <input
          value={value}
          onChange={onChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholder={placeholder}
          type={
            variant === InputVariant.Password
              ? showPassword
                ? "text"
                : "password"
              : type
          }
          disabled={disabled}
          className={classnames(
            styles.input,
            styles[size],
            Typography.lgMedium,
            hasError ? styles.error : "",
            variant === InputVariant.Search ? styles.withLeftIcon : "",
            variant === InputVariant.Password ? styles.withRightIcon : "",
            variant === InputVariant.Default ? styles.withoutIcon : "",
            className ?? ""
          )}
          {...props}
        />
        {variant === InputVariant.Password && (
          <span
            className={classnames(
              styles.icon,
              styles.rightIcon,
              styles[iconSize]
            )}
          >
            {resolvedIcon}
          </span>
        )}
      </div>
      {hasError && <p className={styles.errorMessage}>{errorMessage}</p>}
    </div>
  );
}
