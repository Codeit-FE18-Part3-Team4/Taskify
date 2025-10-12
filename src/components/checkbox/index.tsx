import { InputHTMLAttributes } from "react";
import styles from "./checkbox.module.css";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {}

export default function Checkbox({ className, ...props }: CheckboxProps) {
  return (
    <input
      {...props}
      type="checkbox"
      className={`${styles.checkbox}  ${className ?? ""}`}
    />
  );
}
