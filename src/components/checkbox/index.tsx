import styles from "./checkbox.module.css";
import { InputHTMLAttributes } from "react";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {}

export default function Checkbox({
  className,
  checked,
  ...props
}: CheckboxProps) {
  return (
    <input
      {...props}
      type="checkbox"
      checked={checked}
      className={`${styles.checkbox}  ${className ?? ""}`}
    />
  );
}
